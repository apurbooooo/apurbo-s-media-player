import React, { useEffect, useState } from 'react';
import { fetchWorldCupBracket, autoAdvanceBracket } from '../services/footballService';

export default function KnockoutBracket() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRound, setSelectedRound] = useState('Round of 16');

  const loadBracket = async () => {
    setLoading(true);
    const data = await fetchWorldCupBracket();
    if (data && data.length > 0) {
      setMatches(data);
    } else {
      setError('Unable to fetch tournament bracket data.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBracket();
  }, []);

  // Update a match locally to test instant advancement
  const handleScoreChange = (matchId, team, change) => {
    const updated = matches.map(m => {
      if (m.id === matchId) {
        let homeScore = m.homeScore || 0;
        let awayScore = m.awayScore || 0;
        if (team === 'home') homeScore = Math.max(0, homeScore + change);
        if (team === 'away') awayScore = Math.max(0, awayScore + change);
        
        // Auto determine status and winner
        const status = 'FT'; // Mark as finished
        let winner = null;
        if (homeScore > awayScore) winner = m.home;
        else if (awayScore > homeScore) winner = m.away;
        else winner = m.home; // Fallback to home team on draw

        return { ...m, homeScore, awayScore, status, winner };
      }
      return m;
    });

    // Advance winners automatically
    const advanced = autoAdvanceBracket(updated);
    setMatches(advanced);
    
    // Save to localStorage cache so it persists
    localStorage.setItem('wc_bracket_data', JSON.stringify(advanced));
  };

  const rounds = ['Round of 16', 'Quarter-finals', 'Semi-finals', 'Final'];

  // Filter matches for the current active round
  const activeMatches = matches.filter(m => m.round.toLowerCase().includes(selectedRound.toLowerCase().substring(0, 8)));

  if (loading) {
    return (
      <div className="glass" style={{ padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '1080px', margin: '20px auto' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-color)', borderRadius: '50%', animation: 'spin-loader 0.8s linear infinite', margin: '0 auto 16px' }} />
        <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Loading knockout bracket...</span>
      </div>
    );
  }

  return (
    <div className="glass" style={{
      padding: '32px',
      borderRadius: '28px',
      width: '100%',
      maxWidth: '1080px',
      margin: '0 auto',
      border: '1px solid var(--surface-border)',
      textAlign: 'center',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
    }}>
      {/* Title & Description */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          margin: '0 0 8px 0'
        }}>
          🏆 FIFA World Cup 2026 Bracket
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
          Interactive Knockout Bracket. Modify scores to test the automatic advancing algorithm!
        </p>
      </div>

      {/* Round Tab Selectors */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '28px',
        flexWrap: 'wrap'
      }}>
        {rounds.map(r => (
          <button
            key={r}
            onClick={() => setSelectedRound(r)}
            className="glass"
            style={{
              padding: '10px 20px',
              borderRadius: '16px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: '1px solid var(--surface-border)',
              backgroundColor: selectedRound === r ? 'var(--accent-color)' : 'transparent',
              color: selectedRound === r ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Match Grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        width: '100%'
      }}>
        {activeMatches.map((m) => {
          const isFinished = m.status === 'FT' || m.status === 'AET';
          return (
            <div
              key={m.id}
              className="glass"
              style={{
                flex: '1 1 280px',
                maxWidth: '340px',
                padding: '20px',
                borderRadius: '20px',
                border: '1px solid var(--surface-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: 'rgba(255, 255, 255, 0.01)',
                position: 'relative'
              }}
            >
              {/* Match Header Label */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span>{m.label}</span>
                <span style={{
                  color: isFinished ? 'var(--accent-color)' : 'var(--text-tertiary)',
                  backgroundColor: isFinished ? 'rgba(var(--accent-rgb), 0.1)' : 'rgba(255,255,255,0.05)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {m.status}
                </span>
              </div>

              {/* Home Team Details */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {m.homeLogo ? (
                    <img src={m.homeLogo} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>?</div>
                  )}
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: m.winner === m.home ? 800 : 500,
                    color: m.winner === m.home ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}>
                    {m.home || 'TBD'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {m.home && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => handleScoreChange(m.id, 'home', -1)} style={{ width: '20px', height: '20px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>-</button>
                      <button onClick={() => handleScoreChange(m.id, 'home', 1)} style={{ width: '20px', height: '20px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>+</button>
                    </div>
                  )}
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', minWidth: '16px', textAlign: 'right' }}>
                    {m.homeScore !== null ? m.homeScore : '-'}
                  </span>
                </div>
              </div>

              {/* Away Team Details */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {m.awayLogo ? (
                    <img src={m.awayLogo} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>?</div>
                  )}
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: m.winner === m.away ? 800 : 500,
                    color: m.winner === m.away ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}>
                    {m.away || 'TBD'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {m.away && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => handleScoreChange(m.id, 'away', -1)} style={{ width: '20px', height: '20px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>-</button>
                      <button onClick={() => handleScoreChange(m.id, 'away', 1)} style={{ width: '20px', height: '20px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>+</button>
                    </div>
                  )}
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', minWidth: '16px', textAlign: 'right' }}>
                    {m.awayScore !== null ? m.awayScore : '-'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
