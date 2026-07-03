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
const WORLDCUP_TV_STREAM = 'https://andro.226503.xyz/checklist/androstreamlivebs1.m3u8?ref=fifa';

const FEATURED_CHANNELS = [
  {
    name: 'tsports',
    logoText: 'TS',
    logoSrc: '/tsports.png',
    streamUrl: T_SPORTS_STREAM,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    hoverBorderColor: 'rgba(239, 68, 68, 0.6)',
    shadowColor: 'rgba(239, 68, 68, 0.18)',
    softShadowColor: 'rgba(239, 68, 68, 0.05)',
    liveColor: '#ef4444',
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
  },
  {
    name: 'worldcupTV',
    logoText: 'WCTV',
    streamUrl: WORLDCUP_TV_STREAM,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    hoverBorderColor: 'rgba(245, 158, 11, 0.6)',
    shadowColor: 'rgba(245, 158, 11, 0.18)',
    softShadowColor: 'rgba(245, 158, 11, 0.05)',
    liveColor: '#f59e0b',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)'
  },
  {
    name: 'Somoy TV',
    logoText: 'SOMOY',
    logoSrc: '/somoy-tv.svg',
    streamUrl: 'https://live.thebosstv.com:30443/dwlive/Somoy-TV/chunks.m3u8',
    borderColor: 'rgba(14, 165, 233, 0.25)',
    hoverBorderColor: 'rgba(14, 165, 233, 0.6)',
    shadowColor: 'rgba(14, 165, 233, 0.18)',
    softShadowColor: 'rgba(14, 165, 233, 0.05)',
    liveColor: '#0ea5e9',
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(34, 197, 94, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)'
  },
  {
    name: 'Fussball TV1',
    logoText: 'FTV1',
    streamUrl: 'https://edge22.776740.ir.cdn.ir/hls2/sport.m3u8',
    borderColor: 'rgba(34, 197, 94, 0.25)',
    hoverBorderColor: 'rgba(34, 197, 94, 0.6)',
    shadowColor: 'rgba(34, 197, 94, 0.18)',
    softShadowColor: 'rgba(34, 197, 94, 0.05)',
    liveColor: '#22c55e',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(20, 184, 166, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)'
  },
  {
    name: 'Fox TV',
    logoText: 'FOX',
    streamUrl: 'https://1nyaler.streamhostingcdn.top/stream/26/index.m3u8',
    borderColor: 'rgba(249, 115, 22, 0.25)',
    hoverBorderColor: 'rgba(249, 115, 22, 0.6)',
    shadowColor: 'rgba(249, 115, 22, 0.18)',
    softShadowColor: 'rgba(249, 115, 22, 0.05)',
    liveColor: '#f97316',
    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(234, 179, 8, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)'
  },
  {
    name: 'beIN Sports',
    logoText: 'beIN',
    streamUrl: 'https://andro.evrenesoglu57.click/checklist/androstreamliveexn4.m3u8',
    borderColor: 'rgba(168, 85, 247, 0.25)',
    hoverBorderColor: 'rgba(168, 85, 247, 0.6)',
    shadowColor: 'rgba(168, 85, 247, 0.18)',
    softShadowColor: 'rgba(168, 85, 247, 0.05)',
    liveColor: '#a855f7',
    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(236, 72, 153, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
  },
  {
    name: 'beIN Sports 2',
    logoText: 'beIN2',
    streamUrl: 'https://1nyaler.streamhostingcdn.top/stream/23/index.m3u8',
    borderColor: 'rgba(99, 102, 241, 0.25)',
    hoverBorderColor: 'rgba(99, 102, 241, 0.6)',
    shadowColor: 'rgba(99, 102, 241, 0.18)',
    softShadowColor: 'rgba(99, 102, 241, 0.05)',
    liveColor: '#6366f1',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(14, 165, 233, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #6366f1 0%, #3730a3 100%)'
  }
];

const BANGLA_CHANNELS = [
  {
    name: 'Channel 24',
    logoText: 'C24',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8',
    borderColor: 'rgba(14, 165, 233, 0.25)',
    hoverBorderColor: 'rgba(14, 165, 233, 0.6)',
    shadowColor: 'rgba(14, 165, 233, 0.18)',
    softShadowColor: 'rgba(14, 165, 233, 0.05)',
    liveColor: '#0ea5e9',
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
  },
  {
    name: 'Independent TV',
    logoText: 'IND',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    hoverBorderColor: 'rgba(245, 158, 11, 0.6)',
    shadowColor: 'rgba(245, 158, 11, 0.18)',
    softShadowColor: 'rgba(245, 158, 11, 0.05)',
    liveColor: '#f59e0b',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  {
    name: 'BTV',
    logoText: 'BTV',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8',
    borderColor: 'rgba(34, 197, 94, 0.25)',
    hoverBorderColor: 'rgba(34, 197, 94, 0.6)',
    shadowColor: 'rgba(34, 197, 94, 0.18)',
    softShadowColor: 'rgba(34, 197, 94, 0.05)',
    liveColor: '#22c55e',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(20, 184, 166, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
  },
  {
    name: 'ATN Bangla',
    logoText: 'ATN',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8',
    borderColor: 'rgba(217, 70, 239, 0.25)',
    hoverBorderColor: 'rgba(217, 70, 239, 0.6)',
    shadowColor: 'rgba(217, 70, 239, 0.18)',
    softShadowColor: 'rgba(217, 70, 239, 0.05)',
    liveColor: '#d946ef',
    background: 'linear-gradient(135deg, rgba(217, 70, 239, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #d946ef 0%, #c026d3 100%)'
  },
  {
    name: 'NTV',
    logoText: 'NTV',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    hoverBorderColor: 'rgba(59, 130, 246, 0.6)',
    shadowColor: 'rgba(59, 130, 246, 0.18)',
    softShadowColor: 'rgba(59, 130, 246, 0.05)',
    liveColor: '#3b82f6',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  {
    name: 'Channel I',
    logoText: 'Ch I',
    streamUrl: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    hoverBorderColor: 'rgba(16, 185, 129, 0.6)',
    shadowColor: 'rgba(16, 185, 129, 0.18)',
    softShadowColor: 'rgba(16, 185, 129, 0.05)',
    liveColor: '#10b981',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(34, 197, 94, 0.04) 100%)',
    logoBackground: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
  }
];

const ChannelCard = ({ channel, onPlayStream, logoError, onLogoError }) => (
  <div
    onClick={() => onPlayStream(channel.streamUrl)}
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
    onPlayStream(cleanUrl);
  };

  const handleQuickClick = (url) => {
    setStreamUrl(url);
    setError('');
    onPlayStream(url);
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
