/**
 * Football Service — Fetches World Cup 2026 fixtures, live scores,
 * and knockout bracket from API-Football.
 * Supports localStorage caching and limits/rate-limit fallbacks.
 */

const API_BASE_URL = 'https://v3.football.api-sports.io';
const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY || 'de3744ed2d3f44848640f58ef9c4a006';

// Cache keys and durations
const CACHE_KEY_BRACKET = 'wc_bracket_data';
const CACHE_KEY_EXPIRY = 'wc_bracket_expiry';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache

// Robust Mock data representing a World Cup knockout tournament
const FALLBACK_BRACKET_MATCHES = [
  // Round of 16
  { id: 'R16_1', round: 'Round of 16', label: 'Match 1', home: 'Argentina', homeLogo: 'https://media.api-sports.io/football/teams/1504.png', away: 'Morocco', awayLogo: 'https://media.api-sports.io/football/teams/1500.png', homeScore: 3, awayScore: 1, status: 'FT', winner: 'Argentina' },
  { id: 'R16_2', round: 'Round of 16', label: 'Match 2', home: 'Netherlands', homeLogo: 'https://media.api-sports.io/football/teams/1118.png', away: 'USA', awayLogo: 'https://media.api-sports.io/football/teams/1503.png', homeScore: 2, awayScore: 1, status: 'FT', winner: 'Netherlands' },
  { id: 'R16_3', round: 'Round of 16', label: 'Match 3', home: 'Spain', homeLogo: 'https://media.api-sports.io/football/teams/1506.png', away: 'Japan', awayLogo: 'https://media.api-sports.io/football/teams/1507.png', homeScore: 1, awayScore: 2, status: 'FT', winner: 'Japan' },
  { id: 'R16_4', round: 'Round of 16', label: 'Match 4', home: 'Brazil', homeLogo: 'https://media.api-sports.io/football/teams/6.png', away: 'Belgium', awayLogo: 'https://media.api-sports.io/football/teams/1502.png', homeScore: 2, awayScore: 0, status: 'FT', winner: 'Brazil' },
  { id: 'R16_5', round: 'Round of 16', label: 'Match 5', home: 'England', homeLogo: 'https://media.api-sports.io/football/teams/10.png', away: 'Senegal', awayLogo: 'https://media.api-sports.io/football/teams/1501.png', homeScore: 3, awayScore: 0, status: 'FT', winner: 'England' },
  { id: 'R16_6', round: 'Round of 16', label: 'Match 6', home: 'France', homeLogo: 'https://media.api-sports.io/football/teams/2.png', away: 'Germany', awayLogo: 'https://media.api-sports.io/football/teams/9.png', homeScore: 2, awayScore: 1, status: 'FT', winner: 'France' },
  { id: 'R16_7', round: 'Round of 16', label: 'Match 7', home: 'Portugal', homeLogo: 'https://media.api-sports.io/football/teams/27.png', away: 'Uruguay', awayLogo: 'https://media.api-sports.io/football/teams/1505.png', homeScore: 1, awayScore: 2, status: 'FT', winner: 'Uruguay' },
  { id: 'R16_8', round: 'Round of 16', label: 'Match 8', home: 'Croatia', homeLogo: 'https://media.api-sports.io/football/teams/3.png', away: 'Italy', awayLogo: 'https://media.api-sports.io/football/teams/7.png', homeScore: 1, awayScore: 1, status: 'AET', winner: 'Croatia' }, // Won on Penalties

  // Quarter-Finals (will be populated dynamically based on R16 winners)
  { id: 'QF_1', round: 'Quarter-finals', label: 'QF 1', home: null, homeLogo: null, away: null, awayLogo: null, homeScore: null, awayScore: null, status: 'NS', winner: null },
  { id: 'QF_2', round: 'Quarter-finals', label: 'QF 2', home: null, homeLogo: null, away: null, awayLogo: null, homeScore: null, awayScore: null, status: 'NS', winner: null },
  { id: 'QF_3', round: 'Quarter-finals', label: 'QF 3', home: null, homeLogo: null, away: null, awayLogo: null, homeScore: null, awayScore: null, status: 'NS', winner: null },
  { id: 'QF_4', round: 'Quarter-finals', label: 'QF 4', home: null, homeLogo: null, away: null, awayLogo: null, homeScore: null, awayScore: null, status: 'NS', winner: null },

  // Semi-Finals
  { id: 'SF_1', round: 'Semi-finals', label: 'SF 1', home: null, homeLogo: null, away: null, awayLogo: null, homeScore: null, awayScore: null, status: 'NS', winner: null },
  { id: 'SF_2', round: 'Semi-finals', label: 'SF 2', home: null, homeLogo: null, away: null, awayLogo: null, homeScore: null, awayScore: null, status: 'NS', winner: null },

  // Final
  { id: 'F', round: 'Final', label: 'Final', home: null, homeLogo: null, away: null, awayLogo: null, homeScore: null, awayScore: null, status: 'NS', winner: null }
];

// Helper to auto-advance winners through rounds
export function autoAdvanceBracket(matches) {
  const map = new Map(matches.map(m => [m.id, m]));
  
  // R16 -> QF
  updateQF(map.get('R16_1'), map.get('R16_2'), map.get('QF_1'));
  updateQF(map.get('R16_3'), map.get('R16_4'), map.get('QF_2'));
  updateQF(map.get('R16_5'), map.get('R16_6'), map.get('QF_3'));
  updateQF(map.get('R16_7'), map.get('R16_8'), map.get('QF_4'));

  // QF -> SF
  updateQF(map.get('QF_1'), map.get('QF_2'), map.get('SF_1'));
  updateQF(map.get('QF_3'), map.get('QF_4'), map.get('SF_2'));

  // SF -> F
  updateQF(map.get('SF_1'), map.get('SF_2'), map.get('F'));

  return Array.from(map.values());
}

function updateQF(matchA, matchB, targetMatch) {
  if (!targetMatch) return;
  
  // Set home team from Match A winner
  if (matchA && matchA.winner) {
    targetMatch.home = matchA.winner;
    targetMatch.homeLogo = matchA.winner === matchA.home ? matchA.homeLogo : matchA.awayLogo;
  } else {
    targetMatch.home = null;
    targetMatch.homeLogo = null;
  }

  // Set away team from Match B winner
  if (matchB && matchB.winner) {
    targetMatch.away = matchB.winner;
    targetMatch.awayLogo = matchB.winner === matchB.home ? matchB.homeLogo : matchB.awayLogo;
  } else {
    targetMatch.away = null;
    targetMatch.awayLogo = null;
  }

  // If both winners are populated, QF might be playable or mockable
  // For static demo: Let's mock scores if match is already played in simulated path
  if (targetMatch.home && targetMatch.away && targetMatch.status === 'NS') {
    // Check if it's predetermined in fallback logic
    if (targetMatch.id === 'QF_1') {
      targetMatch.homeScore = 2;
      targetMatch.awayScore = 1;
      targetMatch.status = 'FT';
      targetMatch.winner = 'Argentina';
    } else if (targetMatch.id === 'QF_2') {
      targetMatch.homeScore = 1;
      targetMatch.awayScore = 3;
      targetMatch.status = 'FT';
      targetMatch.winner = 'Brazil';
    } else if (targetMatch.id === 'QF_3') {
      targetMatch.homeScore = 0;
      targetMatch.awayScore = 2;
      targetMatch.status = 'FT';
      targetMatch.winner = 'France';
    } else if (targetMatch.id === 'QF_4') {
      targetMatch.homeScore = 2;
      targetMatch.awayScore = 0;
      targetMatch.status = 'FT';
      targetMatch.winner = 'Croatia';
    }
  }

  if (targetMatch.home && targetMatch.away && targetMatch.id === 'SF_1' && targetMatch.status === 'NS') {
    targetMatch.homeScore = 3;
    targetMatch.awayScore = 2;
    targetMatch.status = 'FT';
    targetMatch.winner = 'Argentina';
  } else if (targetMatch.home && targetMatch.away && targetMatch.id === 'SF_2' && targetMatch.status === 'NS') {
    targetMatch.homeScore = 1;
    targetMatch.awayScore = 2;
    targetMatch.status = 'FT';
    targetMatch.winner = 'France';
  }

  if (targetMatch.home && targetMatch.away && targetMatch.id === 'F' && targetMatch.status === 'NS') {
    targetMatch.homeScore = 2;
    targetMatch.awayScore = 3;
    targetMatch.status = 'FT';
    targetMatch.winner = 'France';
  }
}

// Fetch Bracket Data (Primary API-Football, Fallback to localStorage / Mock data)
export async function fetchWorldCupBracket() {
  const cachedData = localStorage.getItem(CACHE_KEY_BRACKET);
  const cacheExpiry = localStorage.getItem(CACHE_KEY_EXPIRY);

  // Return cache if valid
  if (cachedData && cacheExpiry && Date.now() < parseInt(cacheExpiry, 10)) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.warn('Failed to parse cached bracket, fetching fresh data.');
    }
  }

  try {
    // API-Football Endpoint for WC 2026 fixtures: league 1 (World Cup), season 2026
    const response = await fetch(`${API_BASE_URL}/fixtures?league=1&season=2026`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const json = await response.json();

    // Check if API limits are reached
    if (json.errors && Object.keys(json.errors).length > 0) {
      console.warn('API-Football returned errors/limit warning:', json.errors);
      throw new Error('API limit reached or key invalid');
    }

    const fixtures = json.response || [];
    
    // If we have actual matches, construct bracket from them
    let bracketMatches = [];
    if (fixtures.length > 0) {
      bracketMatches = fixtures.map(f => {
        const statusShort = f.fixture.status.short;
        const homeName = f.teams.home.name;
        const awayName = f.teams.away.name;
        let winner = null;
        
        if (statusShort === 'FT' || statusShort === 'AET' || statusShort === 'PEN') {
          if (f.goals.home > f.goals.away) winner = homeName;
          else if (f.goals.away > f.goals.home) winner = awayName;
          else winner = f.teams.home.winner ? homeName : awayName;
        }

        return {
          id: f.fixture.id.toString(),
          round: f.league.round,
          label: f.league.round,
          home: homeName,
          homeLogo: f.teams.home.logo,
          away: awayName,
          awayLogo: f.teams.away.logo,
          homeScore: f.goals.home,
          awayScore: f.goals.away,
          status: statusShort,
          winner: winner
        };
      });
    } else {
      // If World Cup 2026 data is empty (not scheduled yet in the API database), fallback to WC mock data
      bracketMatches = FALLBACK_BRACKET_MATCHES;
    }

    // Process auto-advancements
    const finalBracket = autoAdvanceBracket(bracketMatches);

    // Save cache
    localStorage.setItem(CACHE_KEY_BRACKET, JSON.stringify(finalBracket));
    localStorage.setItem(CACHE_KEY_EXPIRY, (Date.now() + CACHE_DURATION).toString());

    return finalBracket;
  } catch (error) {
    console.error('API-Football request failed. Falling back to cache / default:', error);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    // Return mock data initially if cache is empty
    const finalBracket = autoAdvanceBracket(FALLBACK_BRACKET_MATCHES);
    return finalBracket;
  }
}

// Fetch general upcoming match for the widget
export async function fetchUpcomingMatch() {
  try {
    const bracket = await fetchWorldCupBracket();
    // Return first match that is scheduled or live
    const active = bracket.find(m => m.status === 'NS' || m.status === 'LIVE' || m.status === '1H' || m.status === '2H') || bracket[0];
    
    // Map to the shape expected by UpcomingMatch component
    return {
      utcDate: new Date().toISOString(), // Mock current/upcoming time
      status: active.status === 'FT' ? 'FINISHED' : 'SCHEDULED',
      stage: active.round,
      homeTeam: {
        name: active.home,
        shortName: active.home,
        crest: active.homeLogo
      },
      awayTeam: {
        name: active.away,
        shortName: active.away,
        crest: active.awayLogo
      }
    };
  } catch (error) {
    console.error('Failed to get match details:', error);
    return null;
  }
}
