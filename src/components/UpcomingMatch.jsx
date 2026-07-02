import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchUpcomingMatch } from '../services/footballService';

export default function UpcomingMatch() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const reloadedRef = useRef(false);

  const loadMatch = useCallback(async () => {
    const data = await fetchUpcomingMatch();
    setMatch(data);
    setLoading(false);
    reloadedRef.current = false;
  }, []);

  // Initial load + 5-minute poll
  useEffect(() => {
    loadMatch();
    const id = setInterval(loadMatch, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [loadMatch]);

  // 1-second countdown tick
  useEffect(() => {
    if (!match?.utcDate) return;

    const calc = () => {
      const isLive = ['LIVE', 'IN_PLAY', 'PAUSED'].includes(match.status);
      const diff = new Date(match.utcDate) - Date.now();
      if (diff <= 0 || isLive) return { expired: true };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      };
    };

    setTimeLeft(calc());
    const id = setInterval(() => {
      const t = calc();
      setTimeLeft(t);
      if (t.expired && !reloadedRef.current) {
        reloadedRef.current = true;
        loadMatch();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [match, loadMatch]);

  // Helpers
  const pad = (n) => String(n ?? 0).padStart(2, '0');

  const formatStage = (s) =>
    s ? s.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '';

  const bdtDate = (iso) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka', year: 'numeric', month: 'long', day: 'numeric',
      }).format(new Date(iso));
    } catch { return ''; }
  };

  const bdtTime = (iso) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka', hour: 'numeric', minute: '2-digit', hour12: true,
      }).format(new Date(iso));
    } catch { return ''; }
  };

  // --- Loading state ---
  if (loading) {
    return (
      <div className="upcoming-match-wrapper" id="upcoming-match-widget">
        <div className="upcoming-match-card um-loading">
          <div className="um-header">🏆 FIFA World Cup 2026</div>
          <div className="um-center">
            <div className="um-spinner" />
            <span className="um-muted">Loading schedule…</span>
          </div>
        </div>
      </div>
    );
  }

  // --- No data — show "Schedule unavailable" ---
  if (!match) {
    return (
      <div className="upcoming-match-wrapper" id="upcoming-match-widget">
        <div className="upcoming-match-card um-loading">
          <div className="um-header">🏆 FIFA World Cup 2026</div>
          <div className="um-center">
            <span style={{ fontSize: '1.6rem' }}>⚠️</span>
            <span className="um-muted">Schedule unavailable</span>
          </div>
        </div>
      </div>
    );
  }

  // --- Main card ---
  return (
    <div className="upcoming-match-wrapper" id="upcoming-match-widget">
      <div className="upcoming-match-card">
        {/* Header */}
        <div className="um-header">🏆 FIFA World Cup 2026</div>
        <div className="um-subheader">⚽ Upcoming Match</div>

        {/* Teams */}
        <div className="um-teams">
          <div className="um-team">
            {match.homeTeam?.crest && (
              <img src={match.homeTeam.crest} alt="" className="um-flag"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            )}
            <span className="um-team-name">{match.homeTeam?.shortName || match.homeTeam?.name || 'TBD'}</span>
          </div>
          <span className="um-vs">VS</span>
          <div className="um-team um-away">
            <span className="um-team-name">{match.awayTeam?.shortName || match.awayTeam?.name || 'TBD'}</span>
            {match.awayTeam?.crest && (
              <img src={match.awayTeam.crest} alt="" className="um-flag"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            )}
          </div>
        </div>

        {/* Info grid */}
        <div className="um-info">
          <div className="um-info-item">
            <span className="um-label">📅 Date</span>
            <span className="um-value">{bdtDate(match.utcDate)}</span>
          </div>
          <div className="um-info-item">
            <span className="um-label">🕒 Kickoff</span>
            <span className="um-value">{bdtTime(match.utcDate)} BDT</span>
          </div>
          <div className="um-info-item" style={{ gridColumn: '1 / -1' }}>
            <span className="um-label">🏟️ Stage</span>
            <span className="um-value um-stage">{formatStage(match.stage)}</span>
          </div>
        </div>

        {/* Countdown or LIVE */}
        {timeLeft?.expired ? (
          <div className="um-live">
            <span className="live-indicator-dot" />
            🔴 LIVE NOW
          </div>
        ) : (
          <div className="um-countdown-section">
            <div className="um-countdown-label">⏳ Starts In</div>
            <div className="um-countdown-grid">
              {[
                [timeLeft?.days, 'Days'],
                [timeLeft?.hours, 'Hours'],
                [timeLeft?.minutes, 'Mins'],
                [timeLeft?.seconds, 'Secs'],
              ].map(([val, label]) => (
                <div className="um-cd-box" key={label}>
                  <span className="um-cd-num">{pad(val)}</span>
                  <span className="um-cd-unit">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
