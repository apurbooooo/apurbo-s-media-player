import React, { useState, useEffect } from 'react';

// Single JSON object for match information so it can be changed easily later
const MATCH_INFO = {
  title: "Upcoming Match",
  sportEmoji: "⚽",
  homeTeam: {
    name: "Argentina",
    flag: "🇦🇷"
  },
  awayTeam: {
    name: "Brazil",
    flag: "🇧🇷"
  },
  timeText: "11:30 PM (BDT)",
  // Target date calculated to be exactly 2 days, 5 hours, 18 minutes from current time metadata
  targetDate: "2026-07-05T02:35:55+06:00"
};

export default function UpcomingMatch() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(MATCH_INFO.targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { expired: true };
    }

    return timeLeft;
  }

  useEffect(() => {
    // Initial check
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="upcoming-match-wrapper">
      <div className="upcoming-match-card">
        <div className="upcoming-match-header">
          <span role="img" aria-label="soccer ball">{MATCH_INFO.sportEmoji}</span> {MATCH_INFO.title}
        </div>
        
        <div className="upcoming-match-teams">
          <div className="upcoming-match-team">
            <span style={{ fontSize: '1.4rem' }} role="img" aria-label={MATCH_INFO.homeTeam.name}>{MATCH_INFO.homeTeam.flag}</span>
            <span>{MATCH_INFO.homeTeam.name}</span>
          </div>
          <span className="upcoming-match-vs">vs</span>
          <div className="upcoming-match-team">
            <span>{MATCH_INFO.awayTeam.name}</span>
            <span style={{ fontSize: '1.4rem' }} role="img" aria-label={MATCH_INFO.awayTeam.name}>{MATCH_INFO.awayTeam.flag}</span>
          </div>
        </div>

        <div className="upcoming-match-time">
          <span role="img" aria-label="clock">🕒</span>
          <span>{MATCH_INFO.timeText}</span>
        </div>

        {timeLeft.expired ? (
          <div className="upcoming-match-live-badge">
            <span className="live-indicator-dot" />
            <span>🔴 LIVE NOW</span>
          </div>
        ) : (
          <div className="upcoming-match-countdown-section">
            <div className="upcoming-match-countdown-label">
              <span role="img" aria-label="hourglass">⏳</span> Starts in
            </div>
            <div className="upcoming-match-countdown-grid">
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="upcoming-match-countdown-unit">Days</span>
              </div>
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="upcoming-match-countdown-unit">Hours</span>
              </div>
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="upcoming-match-countdown-unit">Mins</span>
              </div>
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="upcoming-match-countdown-unit">Secs</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
