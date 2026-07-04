import React from 'react';

const roundOf32Matches = [
  {
    id: 'm57',
    matchNo: 'FRA -575',
    date: 'Jul 5 - 3:00 AM',
    network: 'FOX/Tele',
    home: { name: 'Paraguay', flag: '🇵🇾' },
    away: { name: 'France', flag: '🇫🇷' }
  },
  {
    id: 'm90',
    matchNo: 'Match 90',
    date: '',
    network: 'FOX/Tele',
    active: false,
    home: { name: 'Canada', flag: '🇨🇦', score: 0 },
    away: { name: 'Morocco', flag: '🇲🇦', score: 3 }
  },
  {
    id: 'm110',
    matchNo: 'ESP +110',
    date: 'Jul 7 - 1:00 AM',
    network: 'FOX/Tele',
    home: { name: 'Portugal', flag: '🇵🇹' },
    away: { name: 'Spain', flag: '🇪🇸' }
  },
  {
    id: 'm155',
    matchNo: 'USA +155',
    date: 'Jul 7 - 6:00 AM',
    network: 'FOX/Tele',
    home: { name: 'USA', flag: '🇺🇸' },
    away: { name: 'Belgium', flag: '🇧🇪' }
  },
  {
    id: 'm125',
    matchNo: 'BRA -125',
    date: 'Jul 6 - 2:00 AM',
    network: 'FOX/Tele',
    home: { name: 'Brazil', flag: '🇧🇷' },
    away: { name: 'Norway', flag: '🇳🇴' }
  },
  {
    id: 'm140',
    matchNo: 'ENG +140',
    date: 'Jul 6 - 6:00 AM',
    network: 'FOX/Tele',
    home: { name: 'Mexico', flag: '🇲🇽' },
    away: { name: 'England', flag: 'ENG' }
  },
  {
    id: 'm285',
    matchNo: 'ARG -285',
    date: 'Jul 7 - 10:00 PM',
    network: 'FOX/Tele',
    home: { name: 'Argentina', flag: '🇦🇷' },
    away: { name: 'Egypt', flag: '🇪🇬' }
  },
  {
    id: 'm120',
    matchNo: 'COL +120',
    date: 'Jul 8 - 2:00 AM',
    network: 'FOX/Tele',
    home: { name: 'Switzerland', flag: '🇨🇭' },
    away: { name: 'Colombia', flag: '🇨🇴' }
  }
];

const r16Matches = [
  { id: 'm97', matchNo: 'Match 97', date: 'Jul 10 - 2:00 AM', network: 'FOX/Tele', home: 'RD16 W1', away: 'RD16 W2' },
  { id: 'm98', matchNo: 'Match 98', date: 'Jul 11 - 1:00 AM', network: 'FOX/Tele', home: 'RD16 W5', away: 'RD16 W6' },
  { id: 'm99', matchNo: 'Match 99', date: 'Jul 12 - 3:00 AM', network: 'FOX/Tele', home: 'RD16 W3', away: 'RD16 W4' },
  { id: 'm100', matchNo: 'Match 100', date: 'Jul 12 - 7:00 AM', network: 'FOX/Tele', home: 'RD16 W7', away: 'RD16 W8' }
];

const qfMatches = [
  { id: 'm101', matchNo: 'Match 101', date: 'Jul 15 - 1:00 AM', network: 'FOX/Tele', home: 'QF W1', away: 'QF W2' },
  { id: 'm102', matchNo: 'Match 102', date: 'Jul 16 - 1:00 AM', network: 'FOX/Tele', home: 'QF W3', away: 'QF W4' }
];

function TeamRow({ team, placeholder = false }) {
  const score = team && Object.prototype.hasOwnProperty.call(team, 'score') ? team.score : null;

  return (
    <div className={`bracket-team-row ${placeholder ? 'placeholder' : ''}`}>
      <span className="bracket-flag">{team?.flag || '◩'}</span>
      <span className="bracket-team-name">{team?.name || team}</span>
      {score !== null && <span className="bracket-score">{score}</span>}
    </div>
  );
}

function MatchCard({ match, className = '', children }) {
  return (
    <article className={`bracket-card ${match.active ? 'is-live' : ''} ${className}`}>
      <div className="bracket-card-top">
        <span>{match.matchNo}</span>
      </div>
      {children}
      <TeamRow team={typeof match.home === 'string' ? { name: match.home } : match.home} placeholder={typeof match.home === 'string'} />
      <TeamRow team={typeof match.away === 'string' ? { name: match.away } : match.away} placeholder={typeof match.away === 'string'} />
      {match.liveMinute && <div className="bracket-live-minute">{match.liveMinute}</div>}
      <div className="bracket-card-bottom">
        <span>{match.date}</span>
        <span>{match.network}</span>
      </div>
    </article>
  );
}

function Connector({ variant = 'short' }) {
  return <span className={`bracket-connector bracket-connector-${variant}`} aria-hidden="true" />;
}

export default function KnockoutBracket() {
  return (
    <section className="knockout-shell" aria-labelledby="world-cup-bracket-title">
      <div className="knockout-heading">
        <h2 id="world-cup-bracket-title">FIFA World Cup 2026 Bracket</h2>
        <p>Live knockout path updated from the reference bracket.</p>
      </div>

      <div className="bracket-scroll" role="img" aria-label="FIFA World Cup 2026 knockout bracket">
        <div className="bracket-stage">
          <div className="bracket-column bracket-column-r32">
            {roundOf32Matches.map((match, index) => (
              <div className="bracket-slot" key={match.id}>
                <MatchCard match={match} />
                <Connector variant={index % 2 === 0 ? 'down' : 'up'} />
              </div>
            ))}
          </div>

          <div className="bracket-column bracket-column-r16">
            {r16Matches.map((match, index) => (
              <div className="bracket-slot bracket-slot-wide" key={match.id}>
                <MatchCard match={match} />
                <Connector variant={index % 2 === 0 ? 'down-long' : 'up-long'} />
              </div>
            ))}
          </div>

          <div className="bracket-column bracket-column-qf">
            {qfMatches.map((match, index) => (
              <div className="bracket-slot bracket-slot-tall" key={match.id}>
                <MatchCard match={match} />
                <Connector variant={index === 0 ? 'down-final' : 'up-final'} />
              </div>
            ))}
          </div>

          <div className="bracket-column bracket-column-finals">
            <div className="bracket-trophy-mark" aria-hidden="true">
              <span>🏆</span>
              <strong>FIFA</strong>
            </div>

            <MatchCard
              className="bracket-final-card"
              match={{
                matchNo: '2026 FIFA World Cup Final',
                date: 'Jul 20 - 1:00 AM',
                network: 'FOX/Tele',
                home: 'SF W1',
                away: 'SF W2'
              }}
            >
              <p className="bracket-venue">East Rutherford, New Jersey</p>
            </MatchCard>

            <MatchCard
              className="bracket-third-card"
              match={{
                matchNo: '3rd-Place Match',
                date: 'Jul 19 - 3:00 AM',
                network: 'FOX/Tele',
                home: 'SF L1',
                away: 'SF L2'
              }}
            >
              <p className="bracket-venue">Miami Gardens, Florida</p>
            </MatchCard>
          </div>
        </div>
      </div>
    </section>
  );
}
