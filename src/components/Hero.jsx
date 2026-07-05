import React, { useState } from 'react';
import KnockoutBracket from './KnockoutBracket';
import {
  BANGLA_CHANNELS,
  FEATURED_CHANNELS,
  TEST_STREAMS
} from '../data/channels';

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, marginRight: '8px', flexShrink: 0 }}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginRight: '6px' }}>
    <path d="m7 4 12 8-12 8V4Z" />
  </svg>
);

const QuickLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', verticalAlign: 'middle' }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ChannelCard = ({ channel, onPlayStream, logoError, onLogoError }) => (
  <div
    onClick={() => onPlayStream(channel.streamUrl, channel.name)}
    className="glass-glow"
    style={{
      flex: '1 1 280px',
      maxWidth: '340px',
      padding: '24px',
      borderRadius: '24px',
      cursor: 'pointer',
      border: `1px solid ${channel.borderColor}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      background: channel.background,
      position: 'relative',
      boxShadow: `var(--card-shadow), 0 4px 20px ${channel.softShadowColor}`
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.borderColor = channel.hoverBorderColor;
      e.currentTarget.style.boxShadow = `0 16px 36px ${channel.shadowColor}`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = channel.borderColor;
      e.currentTarget.style.boxShadow = `var(--card-shadow), 0 4px 20px ${channel.softShadowColor}`;
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
      <div style={{
        background: channel.logoBackground,
        width: '96px',
        height: '56px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 12px ${channel.shadowColor}`,
        overflow: 'hidden',
        flexShrink: 0,
        color: '#ffffff',
        fontSize: channel.logoText.length > 4 ? '0.95rem' : '1.15rem',
        fontWeight: 900,
        letterSpacing: '0.02em'
      }}>
        {channel.logoSrc && !logoError ? (
          <img
            src={channel.logoSrc}
            alt={`${channel.name} logo`}
            onError={onLogoError}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '3px', background: '#ffffff' }}
          />
        ) : (
          channel.logoText
        )}
      </div>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          margin: 0,
          letterSpacing: '-0.02em'
        }}>
          {channel.name}
        </h3>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          margin: '2px 0 0 0',
          fontWeight: 500
        }}>
          Live Sports HD
        </p>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          className="live-indicator-dot"
          style={{ backgroundColor: channel.liveColor, boxShadow: `0 0 8px ${channel.liveColor}` }}
        />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: channel.liveColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>LIVE</span>
      </div>
      <div style={{
        background: 'var(--text-primary)',
        color: 'var(--bg-color)',
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="m7 4 12 8-12 8V4Z" />
        </svg>
      </div>
    </div>
  </div>
);

export default function Hero({ onPlayStream }) {
  const [streamUrl, setStreamUrl] = useState('');
  const [error, setError] = useState('');
  const [logoErrors, setLogoErrors] = useState({});
  const [isBanglaExpanded, setIsBanglaExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!streamUrl.trim()) {
      setError('Please enter a stream URL');
      return;
    }
    
    const cleanUrl = streamUrl.trim();
    if (!cleanUrl.toLowerCase().includes('.m3u8') && !cleanUrl.toLowerCase().startsWith('http')) {
      setError('URL should be a valid HLS stream link (typically ending in .m3u8)');
      return;
    }

    setError('');
    onPlayStream(cleanUrl, 'Custom Stream');
  };

  const handleQuickClick = (url, name) => {
    setStreamUrl(url);
    setError('');
    onPlayStream(url, name);
  };

  return (
    <section className="animate-fade-in" style={{
      maxWidth: '1120px',
      margin: '40px auto 40px',
      padding: '0 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px'
    }}>
      {/* Title & Tagline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
          lineHeight: 1.1,
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Live Sports & Channels,<br />
          Seamlessly Streaming.
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.1rem)',
          maxWidth: '580px',
          margin: '0 auto',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Select one of our featured live channels or paste any custom <code>.m3u8</code> streaming link below to play.
        </p>
      </div>

      {/* Featured Channel Section */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}>
          Featured Live Channels
        </span>

        {/* Channels Grid Layout */}
        <div style={{
          display: 'flex',
          gap: '24px',
          width: '100%',
          maxWidth: '1080px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {FEATURED_CHANNELS.map((channel) => (
            <ChannelCard
              key={channel.name}
              channel={channel}
              onPlayStream={onPlayStream}
              logoError={Boolean(logoErrors[channel.logoSrc])}
              onLogoError={() => setLogoErrors((errors) => ({ ...errors, [channel.logoSrc]: true }))}
            />
          ))}
        </div>
      </div>

      {/* Bangla Channels Live Section */}
      <div style={{
        marginTop: '28px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setIsBanglaExpanded(!isBanglaExpanded)}
          className="premium-button"
          style={{
            padding: '14px 28px',
            borderRadius: '24px',
            fontSize: '1.05rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: isBanglaExpanded 
              ? '0 0 24px rgba(var(--accent-rgb), 0.4)' 
              : '0 4px 14px rgba(var(--accent-rgb), 0.25)',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isBanglaExpanded ? 'scale(1.02)' : 'scale(1)',
            outline: 'none'
          }}
        >
          {/* Custom Television/Channel Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.4s ease', transform: isBanglaExpanded ? 'rotate(180deg)' : 'none' }}>
            <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
            <polyline points="17 2 12 7 7 2" />
          </svg>
          Bangla Channels Live
          <span style={{ 
            fontSize: '0.8rem',
            opacity: 0.8,
            background: 'rgba(255,255,255,0.2)',
            padding: '2px 8px',
            borderRadius: '10px',
            fontWeight: 800
          }}>6</span>
        </button>

        {/* Collapsible Container */}
        <div className={`bangla-channels-collapsible ${isBanglaExpanded ? 'expanded' : ''}`}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            width: '100%',
            padding: '10px 0 20px 0'
          }}>
            <h4 className="bangla-channels-title">Select a Live Bangla Channel</h4>
            <div style={{
              display: 'flex',
              gap: '20px',
              width: '100%',
              maxWidth: '1080px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {BANGLA_CHANNELS.map((channel) => (
                <ChannelCard
                  key={channel.name}
                  channel={channel}
                  onPlayStream={onPlayStream}
                  logoError={Boolean(logoErrors[channel.logoSrc])}
                  onLogoError={() => setLogoErrors((errors) => ({ ...errors, [channel.logoSrc]: true }))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* URL Input Form Container (Now positioned below the channels) */}
      <div style={{
        width: '100%',
        maxWidth: '640px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Or Paste Any Custom HLS Link
        </span>
        <div style={{ width: '100%', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(90deg, var(--accent-color), var(--accent-hover))',
            borderRadius: '18px',
            opacity: 0.12,
            filter: 'blur(8px)',
            zIndex: -1
          }} />

          <form onSubmit={handleSubmit} className="glass" style={{
            borderRadius: '16px',
            padding: '8px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            border: '1px solid var(--surface-border)',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              minWidth: '280px',
              paddingLeft: '12px',
              height: '48px'
            }}>
              <LinkIcon />
              <input
                type="text"
                value={streamUrl}
                onChange={(e) => {
                  setStreamUrl(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Paste HLS .m3u8 stream URL here..."
                className="premium-input"
                style={{
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <button
              type="submit"
              className="premium-button"
              style={{
                height: '48px',
                borderRadius: '12px',
                padding: '0 24px',
                fontSize: '0.95rem',
                width: '100%',
                maxWidth: '100%',
                flex: 'none',
                '@media (minWidth: 480px)': {
                  width: 'auto'
                }
              }}
            >
              <PlayIcon />
              Play Stream
            </button>
          </form>

          {error && (
            <div style={{
              color: '#ef4444',
              fontSize: '0.85rem',
              textAlign: 'left',
              marginTop: '8px',
              paddingLeft: '12px',
              fontWeight: 500
            }}>
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Quick Test Links */}
      <div style={{
        marginTop: '8px',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Sample Streams
        </span>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center'
        }}>
          {TEST_STREAMS.map((stream, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickClick(stream.url, stream.name)}
              className="glass"
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                border: '1px solid var(--surface-border)',
                transition: 'all 0.2s ease',
                outline: 'none',
                background: 'var(--accent-light)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.color = 'var(--accent-color)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(var(--accent-rgb), 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--surface-border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {stream.name}
              <QuickLinkIcon />
            </button>
          ))}
        </div>
      </div>

      <KnockoutBracket />

    </section>
  );
}
