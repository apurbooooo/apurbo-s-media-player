import React, { useState, useEffect, useRef } from 'react';
import { fetchUpcomingMatch } from '../services/footballService';

export default function UpcomingMatch() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ expired: false });
  const loadedNextRef = useRef(false);

  // Function to load match data from the service
  const loadMatchData = async () => {
    const data = await fetchUpcomingMatch();
    if (data) {
      setMatch(data);
    } else {
      setMatch(null);
    }
    setLoading(false);
  };

  // Poll for new match data every 5 minutes (300000 ms)
  useEffect(() => {
    loadMatchData();
    const pollInterval = setInterval(loadMatchData, 5 * 60 * 1000);
    return () => clearInterval(pollInterval);
  }, []);

  // Update countdown timer every second
  useEffect(() => {
    if (!match || !match.utcDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(match.utcDate) - +new Date();
      
      // If the match status is one of the active live states from API, or countdown expired
      const isLiveStatus = ['LIVE', 'IN_PLAY', 'PAUSED'].includes(match.status);

      if (difference <= 0 || isLiveStatus) {
        return { expired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false
      };
    };

    loadedNextRef.current = false;
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

      // If it just expired, reload to get the next match fixture from the API
      if (newTime.expired && !loadedNextRef.current) {
        loadedNextRef.current = true;
        loadMatchData();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [match]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  // Format stage to title case (e.g., GROUP_STAGE -> Group Stage)
  const formatStage = (stage) => {
    if (!stage) return '';
    return stage
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Convert and format date for Asia/Dhaka
  const getFormattedDate = (utcDateString) => {
    try {
      const date = new Date(utcDateString);
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch {
      return '';
    }
  };

  // Convert and format time for Asia/Dhaka
  const getFormattedTime = (utcDateString) => {
    try {
      const date = new Date(utcDateString);
      return new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="upcoming-match-wrapper">
        <div className="upcoming-match-card loading-state">
          <div className="upcoming-match-header">
            <span>🏆 FIFA World Cup 2026</span>
          </div>
          <div className="loading-spinner-container">
            <div className="spinner" />
            <span style={{ fontSize: '0.85rem', color: 'rgba(248, 250, 252, 0.5)' }}>Loading schedule...</span>
          </div>
        </div>
      </div>
    );
  }

  // If match schedule is unavailable, show "Schedule unavailable"
  if (!match) {
    return (
      <div className="upcoming-match-wrapper">
        <div className="upcoming-match-card error-state">
          <div className="upcoming-match-header">
            <span>🏆 FIFA World Cup 2026</span>
          </div>
          <div className="error-message-container">
            <span style={{ fontSize: '1.8rem', opacity: 0.8 }} role="img" aria-label="warning">⚠️</span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(248, 250, 252, 0.95)', margin: '4px 0 2px 0' }}>
              Schedule unavailable
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'rgba(248, 250, 252, 0.45)', margin: 0 }}>
              Could not retrieve latest fixture data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="upcoming-match-wrapper">
      <div className="upcoming-match-card">
        <div className="upcoming-match-header">
          <span>🏆 FIFA World Cup 2026</span>
        </div>
        
        <div className="upcoming-match-subheader">
          <span role="img" aria-label="soccer ball">⚽</span> Upcoming Match
        </div>

        <div className="upcoming-match-teams">
          <div className="upcoming-match-team home">
            {match.homeTeam.crest ? (
              <img 
                src={match.homeTeam.crest} 
                alt={`${match.homeTeam.name} logo`} 
                className="upcoming-match-flag"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span className="team-flag-emoji" role="img" aria-label="flag">⚽</span>
            )}
            <span className="team-name">{match.homeTeam.shortName || match.homeTeam.name}</span>
          </div>

          <span className="upcoming-match-vs">VS</span>

          <div className="upcoming-match-team away">
            <span className="team-name">{match.awayTeam.shortName || match.awayTeam.name}</span>
            {match.awayTeam.crest ? (
              <img 
                src={match.awayTeam.crest} 
                alt={`${match.awayTeam.name} logo`} 
                className="upcoming-match-flag"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span className="team-flag-emoji" role="img" aria-label="flag">⚽</span>
            )}
          </div>
        </div>

        <div className="upcoming-match-info-grid">
          <div className="upcoming-match-info-item">
            <span className="info-label">📅 Match Date</span>
            <span className="info-value">{getFormattedDate(match.utcDate)}</span>
          </div>
          
          <div className="upcoming-match-info-item">
            <span className="info-label">🕒 Kickoff (BDT)</span>
            <span className="info-value">{getFormattedTime(match.utcDate)} (BDT)</span>
          </div>

          {match.venue && (
            <div className="upcoming-match-info-item">
              <span className="info-label">📍 Venue</span>
              <span className="info-value">{match.venue}</span>
            </div>
          )}

          <div className="upcoming-match-info-item">
            <span className="info-label">Stage</span>
            <span className="info-value stage-badge">{formatStage(match.stage)}</span>
          </div>
        </div>

        {timeLeft.expired ? (
          <div className="upcoming-match-live-badge">
            <span className="live-indicator-dot" />
            <span>🔴 LIVE NOW</span>
          </div>
        ) : (
          <div className="upcoming-match-countdown-section">
            <div className="upcoming-match-countdown-label">
              <span role="img" aria-label="hourglass">⏳</span> Starts In
            </div>
            <div className="upcoming-match-countdown-grid">
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.days || 0)}
                </span>
                <span className="upcoming-match-countdown-unit">Days</span>
              </div>
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.hours || 0)}
                </span>
                <span className="upcoming-match-countdown-unit">Hours</span>
              </div>
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.minutes || 0)}
                </span>
                <span className="upcoming-match-countdown-unit">Mins</span>
              </div>
              <div className="upcoming-match-countdown-box">
                <span className="upcoming-match-countdown-number">
                  {formatNumber(timeLeft.seconds || 0)}
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
