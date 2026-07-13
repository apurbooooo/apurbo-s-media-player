import React from 'react';

const leftRound = [
  {
    id: 'l1',
    teams: [
      { code: 'GER', flag: '🇩🇪', score: 1 },
      { code: 'PAR', flag: '🇵🇾', score: 1 }
    ]
  },
  {
    id: 'l2',
    teams: [
      { code: 'FRA', flag: '🇫🇷', score: 3 },
      { code: 'SWE', flag: '🇸🇪', score: 0 }
    ]
  },
  {
    id: 'l3',
    teams: [
      { code: 'RSA', flag: '🇿🇦', score: 0 },
      { code: 'CAN', flag: '🇨🇦', score: 1 }
    ]
  },
  {
    id: 'l4',
    teams: [
      { code: 'NED', flag: '🇳🇱', score: 1 },
      { code: 'MAR', flag: '🇲🇦', score: 1 }
    ]
  },
  {
    id: 'l5',
    teams: [
      { code: 'POR', flag: '🇵🇹', score: 2 },
      { code: 'CRO', flag: '🇭🇷', score: 1 }
    ]
  },
  {
    id: 'l6',
    teams: [
      { code: 'ESP', flag: '🇪🇸', score: 3 },
      { code: 'AUT', flag: '🇦🇹', score: 0 }
    ]
  },
  {
    id: 'l7',
    teams: [
      { code: 'USA', flag: '🇺🇸', score: 2 },
      { code: 'BIH', flag: '🇧🇦', score: 0 }
    ]
  },
  {
    id: 'l8',
    teams: [
      { code: 'BEL', flag: '🇧🇪', score: 3 },
      { code: 'SEN', flag: '🇸🇳', score: 2 }
    ]
  }
];

const rightRound = [
  {
    id: 'r1',
    teams: [
      { code: 'BRA', flag: '🇧🇷', score: 2 },
      { code: 'JPN', flag: '🇯🇵', score: 1 }
    ]
  },
  {
    id: 'r2',
    teams: [
      { code: 'CIV', flag: '🇨🇮', score: 1 },
      { code: 'NOR', flag: '🇳🇴', score: 2 }
    ]
  },
  {
    id: 'r3',
    teams: [
      { code: 'MEX', flag: '🇲🇽', score: 2 },
      { code: 'ECU', flag: '🇪🇨', score: 0 }
    ]
  },
  {
    id: 'r4',
    teams: [
      { code: 'ENG', flag: '🏴', score: 2 },
      { code: 'GOD', flag: '🌍', score: 1 }
    ]
  },
  {
    id: 'r5',
    teams: [
      { code: 'ARG', flag: '🇦🇷', score: 3 },
      { code: 'EGY', flag: '🇪🇬', score: 2 }
    ]
  },
  {
    id: 'r6',
    teams: [
      { code: 'SUI', flag: '🇨🇭', score: 2 },
      { code: 'ALG', flag: '🇩🇿', score: 0 }
    ]
  },
  {
    id: 'r7',
    teams: [
      { code: 'COL', flag: '🇨🇴', score: 1 },
      { code: 'GHA', flag: '🇬🇭', score: 0 }
    ]
  },
  {
    id: 'r8',
    teams: [
      { code: 'AUS', flag: '🇦🇺', score: 1 },
      { code: 'EGY', flag: '🇪🇬', score: 1 }
    ]
  }
];

const leftWinners = [
  {
    id: 'lw1',
    teams: [
      { code: 'FRA', flag: '🇫🇷', score: 2 },
      { code: 'ESP', flag: '🇪🇸', score: 1 }
    ]
  },
  {
    id: 'lw2',
    teams: [
      { code: 'CAN', flag: '🇨🇦', score: 0 },
      { code: 'MAR', flag: '🇲🇦', score: 3 }
    ]
  },
  {
    id: 'lw3',
    teams: [
      { code: 'POR', flag: '🇵🇹', score: 0 },
      { code: 'ESP', flag: '🇪🇸', score: 1 }
    ]
  },
  {
    id: 'lw4',
    teams: [
      { code: 'USA', flag: '🇺🇸', score: 1 },
      { code: 'BEL', flag: '🇧🇪', score: 4 }
    ]
  }
];

const rightWinners = [
  {
    id: 'rw1',
    teams: [
      { code: 'ENG', flag: '🏴', score: 2 },
      { code: 'ARG', flag: '🇦🇷', score: 1 }
    ]
  },
  {
    id: 'rw2',
    teams: [
      { code: 'MEX', flag: '🇲🇽', score: 2 },
      { code: 'ENG', flag: '🇬🇧', score: 3 }
    ]
  },
  {
    id: 'rw3',
    teams: [
      { code: 'ARG', flag: '🇦🇷', score: 3 },
      { code: 'ECU', flag: '🇪🇨', score: 2 }
    ]
  },
  {
    id: 'rw4',
    teams: [
      { code: 'SUI', flag: '🇨🇭', score: 2 },
      { code: 'COL', flag: '🇨🇴', score: 0 }
    ]
  }
];

function TeamRow({ team, isWinner = false }) {
  return (
    <div className={`bracket-team-row ${isWinner ? 'is-winner' : ''}`}>
      <span className="bracket-flag">{team.flag}</span>
      <span className="bracket-team-name">{team.code}</span>
      <span className="bracket-score">{team.score}</span>
    </div>
  );
}

function MatchCard({ match, label, meta, className = '', compact = false }) {
  return (
    <article className={`bracket-card ${compact ? 'is-compact' : ''} ${className}`.trim()}>
      <div className="bracket-card-top">
        <span className="bracket-card-label">{label}</span>
        {meta ? <span className="bracket-card-meta">{meta}</span> : null}
      </div>
      <TeamRow team={match.teams[0]} isWinner={match.teams[0].score > match.teams[1].score} />
      <TeamRow team={match.teams[1]} isWinner={match.teams[1].score > match.teams[0].score} />
    </article>
  );
}

function FinalCard({ title, date, badge, teams, className = '' }) {
  return (
    <article className={`bracket-card bracket-card-final ${className}`.trim()}>
      <div className="bracket-card-top bracket-card-top-final">
        <span className="bracket-card-label">{title}</span>
        <span className="bracket-card-meta">{date}</span>
      </div>
      <div className="bracket-final-teams">
        <TeamRow team={teams[0]} isWinner={teams[0].score > teams[1].score} />
        <TeamRow team={teams[1]} isWinner={teams[1].score > teams[0].score} />
      </div>
      <span className={`bracket-badge ${badge.toLowerCase().replace(/\s+/g, '-')}`}>{badge}</span>
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
        <p>Reference bracket view updated to match the current knockout layout.</p>
      </div>

      <div className="bracket-scroll" role="img" aria-label="FIFA World Cup 2026 knockout bracket">
        <div className="bracket-stage">
          <div className="bracket-column bracket-column-left">
            {leftRound.map((match, index) => (
              <div className="bracket-slot" key={match.id}>
                <MatchCard match={match} label={match.teams[0].code} meta={index === 0 ? 'Jul 5' : ''} />
                <Connector variant={index % 2 === 0 ? 'down' : 'up'} />
              </div>
            ))}
          </div>

          <div className="bracket-column bracket-column-left-next">
            {leftWinners.map((match, index) => (
              <div className="bracket-slot bracket-slot-mid" key={match.id}>
                <MatchCard match={match} label={match.teams[0].code} meta={index === 0 ? 'Today' : ''} compact />
                <Connector variant={index % 2 === 0 ? 'down-long' : 'up-long'} />
              </div>
            ))}
          </div>

          <div className="bracket-column bracket-column-center">
            <div className="bracket-trophy-mark" aria-hidden="true">
              <span>🏆</span>
              <strong>CHAMPION</strong>
            </div>

            <div className="bracket-final-stack">
              <FinalCard
                className="bracket-final-card"
                title="TBD  TBD"
                date="Jul 19"
                badge="FINAL"
                teams={[
                  { code: 'TBD', flag: '◑', score: 0 },
                  { code: 'TBD', flag: '◑', score: 0 }
                ]}
              />

              <FinalCard
                className="bracket-third-card"
                title="TBD  TBD"
                date="Jul 19"
                badge="BRONZE-FINAL"
                teams={[
                  { code: 'TBD', flag: '◑', score: 0 },
                  { code: 'TBD', flag: '◑', score: 0 }
                ]}
              />
            </div>
          </div>

          <div className="bracket-column bracket-column-right-next">
            {rightWinners.map((match, index) => (
              <div className="bracket-slot bracket-slot-mid" key={match.id}>
                <MatchCard match={match} label={match.teams[0].code} meta={index === 0 ? 'Tomorrow' : ''} compact />
                <Connector variant={index % 2 === 0 ? 'down-long' : 'up-long'} />
              </div>
            ))}
          </div>

          <div className="bracket-column bracket-column-right">
            {rightRound.map((match, index) => (
              <div className="bracket-slot" key={match.id}>
                <MatchCard match={match} label={match.teams[0].code} meta={index === 0 ? 'Jul 5' : ''} />
                <Connector variant={index % 2 === 0 ? 'down' : 'up'} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bracket-mobile-note">Swipe horizontally to see the full bracket.</div>
    </section>
  );
}
