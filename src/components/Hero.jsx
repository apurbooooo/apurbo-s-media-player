import React, { useState } from 'react';

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

const SportsIcon = ({ color = '#ef4444' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M6 12A6 6 0 0 1 18 12" />
    <path d="M12 6A6 6 0 0 1 12 18" />
  </svg>
);

const TEST_STREAMS = [
  {
    name: 'Mux Test Stream (Big Buck Bunny)',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    name: 'Tears of Steel (Live Demo)',
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'
  },
  {
    name: 'Oceans (Adaptive)',
    url: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8'
  }
];

const T_SPORTS_STREAM = 'http://198.195.239.50:8095/tsports/tracks-v1a1/mono.m3u8';
const D_SPORTS_STREAM = 'https://1nyaler.streamhostingcdn.top/stream/106/index.m3u8';

export default function Hero({ onPlayStream }) {
  const [streamUrl, setStreamUrl] = useState('');
  const [error, setError] = useState('');
  const [tsportsLogoError, setTsportsLogoError] = useState(false);
  const [dsportsLogoError, setDsportsLogoError] = useState(false);

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
    onPlayStream(cleanUrl);
  };

  const handleQuickClick = (url) => {
    setStreamUrl(url);
    setError('');
    onPlayStream(url);
  };

  return (
    <section className="animate-fade-in" style={{
      maxWidth: '900px',
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

      {/* Featured Channel Section - tsports & dsports (At the top & slightly larger) */}
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
          maxWidth: '720px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {/* tsports Channel Card */}
          <div
            onClick={() => onPlayStream(T_SPORTS_STREAM)}
            className="glass-glow"
            style={{
              flex: '1 1 280px',
              maxWidth: '340px',
              padding: '24px',
              borderRadius: '24px',
              cursor: 'pointer',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
              position: 'relative',
              boxShadow: 'var(--card-shadow), 0 4px 20px rgba(239, 68, 68, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(239, 68, 68, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)';
              e.currentTarget.style.boxShadow = 'var(--card-shadow), 0 4px 20px rgba(239, 68, 68, 0.05)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                width: '96px',
                height: '56px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                {/* Try loading PNG logo, fallback to SVG if error/empty */}
                {!tsportsLogoError ? (
                  <img
                    src="/tsports.png"
                    alt="tsports logo"
                    onError={() => setTsportsLogoError(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '3px', background: '#ffffff' }}
                  />
                ) : (
                  <SportsIcon color="#ffffff" />
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
                  tsports
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
                <span className="live-indicator-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LIVE</span>
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

          {/* dsports Channel Card */}
          <div
            onClick={() => onPlayStream(D_SPORTS_STREAM)}
            className="glass-glow"
            style={{
              flex: '1 1 280px',
              maxWidth: '340px',
              padding: '24px',
              borderRadius: '24px',
              cursor: 'pointer',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
              position: 'relative',
              boxShadow: 'var(--card-shadow), 0 4px 20px rgba(16, 185, 129, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.6)';
              e.currentTarget.style.boxShadow = '0 16px 36px rgba(16, 185, 129, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.25)';
              e.currentTarget.style.boxShadow = 'var(--card-shadow), 0 4px 20px rgba(16, 185, 129, 0.05)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                width: '96px',
                height: '56px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                {!dsportsLogoError ? (
                  <img
                    src="/dsports.png"
                    alt="dsports logo"
                    onError={() => setDsportsLogoError(true)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '3px', background: '#ffffff' }}
                  />
                ) : (
                  <SportsIcon color="#ffffff" />
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
                  dsports
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
                <span className="live-indicator-dot" />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LIVE</span>
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
              onClick={() => handleQuickClick(stream.url)}
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
    </section>
  );
}
