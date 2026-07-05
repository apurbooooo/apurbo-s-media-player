import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { supabase, isSupabaseConfigured } from '../services/supabaseService';
import { BANGLA_CHANNELS, FEATURED_CHANNELS } from '../data/channels';

// SVG Icons
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="m7 4 12 8-12 8V4Z" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14Zm8-14v14h4V5h-4Z" />
  </svg>
);

const SkipBackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </svg>
);

const SkipForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19 12 9 4 9 20 19 12" />
    <line x1="5" y1="5" x2="5" y2="19" />
  </svg>
);

const VolumeHighIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeMediumIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const VolumeMutedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </svg>
);

const FullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4" />
  </svg>
);

const PipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" />
    <rect x="14" y="12" width="8" height="6" rx="1" />
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
    <path d="M21 12a9 9 0 0 1-15.5 6.25" />
    <path d="M3 12A9 9 0 0 1 18.5 5.75" />
    <path d="M18 2v4h4" />
    <path d="M6 22v-4H2" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const AspectRatioIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <path d="M12 2v20" />
  </svg>
);

export default function MediaPlayer({ url, name = 'Live Stream', onBack, onSwitchChannel }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Premium Controls States
  const [aspectRatio, setAspectRatio] = useState('contain'); // contain, cover, fill
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [qualityLevels, setQualityLevels] = useState([]);
  const [currentQualityIndex, setCurrentQualityIndex] = useState(-1); // -1 is Auto
  const [showQualityDropdown, setShowQualityDropdown] = useState(false);
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);
  const [viewerCount, setViewerCount] = useState(1);
  const [bdTime, setBdTime] = useState('');
  const [showChannelSwitcher, setShowChannelSwitcher] = useState(false);

  // Realtime Presence viewer counter
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // Mock fallback: simulate counter if Supabase credentials are not set
      const interval = setInterval(() => {
        setViewerCount(Math.floor(Math.random() * 5) + 12);
      }, 5000);
      return () => clearInterval(interval);
    }

    const userId = 'user_' + Math.random().toString(36).substring(2, 11);
    // Create a safe channel name from the stream URL/name
    const safeChannelName = `stream_room_${btoa(url).replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 50)}`;
    
    const channel = supabase.channel(safeChannelName, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setViewerCount(count || 1);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [url]);

  useEffect(() => {
    const updateTime = () => {
      setBdTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(new Date())
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-hide controls after 3 seconds of mouse inactivity
  useEffect(() => {
    let timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
        setShowQualityDropdown(false);
        setShowSpeedDropdown(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'j':
        case 'arrowleft':
          e.preventDefault();
          skipTime(-10);
          break;
        case 'l':
        case 'arrowright':
          e.preventDefault();
          skipTime(10);
          break;
        case 'arrowup':
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case 'arrowdown':
          e.preventDefault();
          adjustVolume(-0.1);
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, volume, isFullscreen]);

  const skipTime = (amount) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + amount));
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const adjustVolume = (amount) => {
    const video = videoRef.current;
    if (!video) return;
    const newVol = Math.max(0, Math.min(1, video.volume + amount));
    video.volume = newVol;
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  // Initialize HLS / Native Video Playback
  useEffect(() => {
    let hls;
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setErrorMessage(null);
    setQualityLevels([]);
    setCurrentQualityIndex(-1);

    // Sync volume setting initially
    video.volume = volume;
    video.muted = isMuted;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferSize: 30 * 1024 * 1024, // 30MB buffer size
      });
      
      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Parse quality levels
        const levels = hls.levels.map((level, idx) => ({
          index: idx,
          name: level.name || `${level.height}p`,
          height: level.height,
          bitrate: level.bitrate
        }));
        setQualityLevels(levels);

        video.play().catch((err) => {
          console.warn("Autoplay was blocked by browser policies:", err);
          setIsPlaying(false);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("Fatal network error encountered, attempting recovery...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("Fatal media error encountered, attempting recovery...");
              hls.recoverMediaError();
              break;
            default:
              setErrorMessage(`Streaming failed: ${data.details || 'Fatal playback error'}`);
              setIsLoading(false);
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple device support (Safari)
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((err) => {
          console.warn("Autoplay was blocked by Safari:", err);
          setIsPlaying(false);
        });
      });
    } else {
      setErrorMessage("Your browser does not support HLS (.m3u8) playback natively or via MSE.");
      setIsLoading(false);
    }

    return () => {
      if (hls) {
        hls.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, reloadKey]);

  // Video Element event synchronizers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onDurationChange = () => setDuration(video.duration);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onError = () => {
      setErrorMessage("Failed to load stream. Please verify the URL or cross-origin (CORS) access.");
      setIsLoading(false);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('durationchange', onDurationChange);
    video.addEventListener('volumechange', onVolumeChange);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);

    // Sync fullscreen events (esc key detection)
    const onFullscreenChange = () => {
      const fullscreenElement = 
        document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement || 
        document.msFullscreenElement;
      setIsFullscreen(fullscreenElement === containerRef.current || fullscreenElement === video);
    };

    const onWebKitBeginFullscreen = () => setIsFullscreen(true);
    const onWebKitEndFullscreen = () => setIsFullscreen(false);

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);
    video.addEventListener('webkitbeginfullscreen', onWebKitBeginFullscreen);
    video.addEventListener('webkitendfullscreen', onWebKitEndFullscreen);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('durationchange', onDurationChange);
      video.removeEventListener('volumechange', onVolumeChange);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      document.removeEventListener('MSFullscreenChange', onFullscreenChange);
      video.removeEventListener('webkitbeginfullscreen', onWebKitBeginFullscreen);
      video.removeEventListener('webkitendfullscreen', onWebKitEndFullscreen);
    };
  }, []);

  // Controls Methods
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => console.error(err));
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeSlider = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const newVol = parseFloat(e.target.value);
    video.volume = newVol;
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch((err) => console.error("Fullscreen error:", err));
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.error("Exit fullscreen error:", err));
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (video.webkitExitFullscreen) {
        video.webkitExitFullscreen();
      }
    }
  };

  const handleRefreshStream = () => {
    setErrorMessage(null);
    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);
    setReloadKey((key) => key + 1);
  };

  const togglePip = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPip(false);
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture();
        setIsPip(true);
      }
    } catch (err) {
      console.error("Picture in Picture error:", err);
    }
  };

  // Toggle Aspect Ratio
  const cycleAspectRatio = () => {
    const ratios = ['contain', 'cover', 'fill'];
    const nextIdx = (ratios.indexOf(aspectRatio) + 1) % ratios.length;
    setAspectRatio(ratios[nextIdx]);
  };

  // Set Playback Speed
  const handleSpeedChange = (speed) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedDropdown(false);
  };

  // Set Quality Level
  const handleQualityChange = (levelIndex) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
      setCurrentQualityIndex(levelIndex);
    }
    setShowQualityDropdown(false);
  };

  // Helper Time Formatter
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) return '00:00';
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const pad = (num) => String(num).padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const isLive = duration === Infinity || isNaN(duration);
  const allChannels = [...FEATURED_CHANNELS, ...BANGLA_CHANNELS];
  const relatedChannels = allChannels.filter((channel) => channel.name !== name && channel.streamUrl !== url).slice(0, 8);

  // Volume helper component selection
  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeMutedIcon />;
    if (volume < 0.5) return <VolumeMediumIcon />;
    return <VolumeHighIcon />;
  };

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '960px',
      width: '100%',
      margin: '0 auto 40px',
      padding: '0 24px'
    }}>
      {/* Upper Navigation and Beautiful Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <button
            onClick={onBack}
            className="glass"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'var(--text-primary)',
              border: '1px solid var(--surface-border)',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-4px)';
              e.currentTarget.style.borderColor = 'var(--accent-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.borderColor = 'var(--surface-border)';
            }}
          >
            <BackIcon />
            Back to Home
          </button>

          {/* Premium Ambient Stream Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--surface-border)',
            padding: '8px 18px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              display: 'inline-block',
              boxShadow: '0 0 10px #ef4444',
              animation: 'pulse-live 1.8s infinite'
            }} />
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}>
            Now Streaming:
            </span>
            <span style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--accent-color)',
              background: 'linear-gradient(90deg, var(--accent-color) 0%, var(--accent-hover) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em'
            }}>
              {name}
            </span>
          </div>
        </div>
        <div className="glass" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '18px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Bangladesh Time
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{bdTime}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Watching
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{name}</div>
          </div>
        </div>
      </div>

      {/* Media Player Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: isFullscreen ? '0px' : '24px',
          overflow: 'hidden',
          backgroundColor: '#000000',
          boxShadow: isFullscreen ? 'none' : '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px rgba(var(--accent-rgb), 0.1)',
          border: isFullscreen ? 'none' : '1px solid var(--surface-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          cursor: showControls ? 'default' : 'none'
        }}
      >
        {/* Core HTML5 Video Element */}
        <video
          ref={videoRef}
          onClick={togglePlay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: aspectRatio
          }}
          playsInline
        />

        {/* Realtime Watching Now Badge */}
        <div style={{
          position: 'absolute',
          top: isFullscreen ? '32px' : '20px',
          right: isFullscreen ? '40px' : '20px',
          zIndex: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '6px 14px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 700,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none'
        }}>
          🟢 {viewerCount} Watching Now
        </div>

        <div
          className="player-channel-switcher"
          style={{
            top: isFullscreen ? '20px' : '16px',
            right: isFullscreen ? '20px' : '16px'
          }}
          onMouseEnter={() => setShowChannelSwitcher(true)}
          onMouseLeave={() => setShowChannelSwitcher(false)}
        >
          <button
            type="button"
            className="player-channel-switcher-toggle"
            onClick={() => setShowChannelSwitcher((value) => !value)}
          >
            Media Controls
          </button>
          {showChannelSwitcher && (
            <div className="player-channel-switcher-panel">
              {relatedChannels.map((channel) => (
                <button
                  key={channel.name}
                  type="button"
                  className="player-channel-switcher-item"
                  onClick={() => {
                    setShowChannelSwitcher(false);
                    onSwitchChannel?.(channel.streamUrl, channel.name);
                  }}
                >
                  <span className="player-channel-switcher-dot" style={{ backgroundColor: channel.liveColor }} />
                  <span className="player-channel-switcher-name">{channel.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Central Overlay States: Buffering/Loading */}
        {isLoading && !errorMessage && (
          <div style={{
            position: 'absolute',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid rgba(255, 255, 255, 0.1)',
              borderTopColor: 'var(--accent-color)',
              borderRadius: '50%',
              animation: 'spin-loader 0.8s linear infinite'
            }} />
            <span style={{
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)'
            }}>
              Optimizing Stream
            </span>
          </div>
        )}

        {/* Central Overlay States: Fatal Errors */}
        {errorMessage && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            zIndex: 15
          }}>
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              padding: '28px',
              borderRadius: '20px',
              maxWidth: '480px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              backdropFilter: 'blur(12px)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 style={{ color: '#ef4444', fontFamily: 'var(--font-display)', margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Playback Interrupted</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                {errorMessage}
              </p>
              <button
                onClick={handleRefreshStream}
                className="premium-button"
                style={{
                  backgroundColor: '#ef4444',
                  marginTop: '6px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}
              >
                Reload Stream
              </button>
            </div>
          </div>
        )}

        {/* Video Player Custom Controls Panel */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: isFullscreen ? '40px 48px' : '24px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 5,
          opacity: showControls ? 1 : 0,
          transform: showControls ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: showControls ? 'auto' : 'none'
        }}>
          {/* Seek Bar (For VoD or live buffer) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: '12px'
          }}>
            {!isLive ? (
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="custom-slider"
                style={{ flex: 1, height: '6px' }}
              />
            ) : (
              <div style={{
                height: '5px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '3px',
                flex: 1,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(90deg, var(--accent-color) 0%, var(--accent-hover) 100%)'
                }} />
              </div>
            )}
          </div>

          {/* Bottom Controls Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative'
          }}>
            {/* Left Controls: Play/Pause, Skips, Volume, Time */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="control-btn"
                style={{
                  color: '#ffffff',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              {/* 10s Skip Backward */}
              <button
                onClick={() => skipTime(-10)}
                className="control-btn"
                title="Skip back 10s"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <SkipBackIcon />
              </button>

              {/* 10s Skip Forward */}
              <button
                onClick={() => skipTime(10)}
                className="control-btn"
                title="Skip forward 10s"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <SkipForwardIcon />
              </button>

              {/* Volume Controller */}
              <div
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginLeft: '4px'
                }}
              >
                <button
                  onClick={toggleMute}
                  className="control-btn"
                  style={{ color: '#ffffff' }}
                >
                  {renderVolumeIcon()}
                </button>
                <div style={{
                  width: showVolumeSlider ? '80px' : '0px',
                  opacity: showVolumeSlider ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeSlider}
                    className="custom-slider"
                    style={{ width: '70px', height: '24px' }}
                  />
                </div>
              </div>

              {/* Time tracker / LIVE status */}
              <div style={{
                color: 'rgba(255,255,255,0.95)',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '8px'
              }}>
                {isLive ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                      display: 'inline-block',
                      boxShadow: '0 0 8px #ef4444'
                    }} />
                    <span style={{ textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.06em', color: '#ef4444', fontWeight: 800 }}>LIVE</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '0.8rem' }}>({formatTime(currentTime)})</span>
                  </div>
                ) : (
                  <span>
                    {formatTime(currentTime)} <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 2px' }}>/</span> {formatTime(duration)}
                  </span>
                )}
              </div>
            </div>

            {/* Right Controls: Aspect Ratio, Speed, Quality, PiP, Fullscreen */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              position: 'relative'
            }}>
              {/* Aspect Ratio Selector */}
              <button
                onClick={cycleAspectRatio}
                className="control-btn"
                title={`Aspect Ratio: ${aspectRatio}`}
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <AspectRatioIcon />
                <span style={{ textTransform: 'capitalize', fontSize: '0.75rem' }}>{aspectRatio}</span>
              </button>

              {/* Playback Speed Controller */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => {
                    setShowSpeedDropdown(!showSpeedDropdown);
                    setShowQualityDropdown(false);
                  }}
                  className="control-btn"
                  title="Playback Speed"
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {playbackSpeed === 1.0 ? '1x' : `${playbackSpeed}x`}
                </button>

                {showSpeedDropdown && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: 0,
                    marginBottom: '8px',
                    backgroundColor: 'rgba(20, 20, 20, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '90px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 20
                  }}>
                    {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        style={{
                          backgroundColor: playbackSpeed === speed ? 'var(--accent-color)' : 'transparent',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {speed === 1.0 ? 'Normal' : `${speed}x`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quality / Resolution Selector */}
              {qualityLevels.length > 0 && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => {
                      setShowQualityDropdown(!showQualityDropdown);
                      setShowSpeedDropdown(false);
                    }}
                    className="control-btn"
                    title="Stream Quality"
                    style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <SettingsIcon />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                      {currentQualityIndex === -1 ? 'Auto' : `${qualityLevels[currentQualityIndex]?.height}p`}
                    </span>
                  </button>

                  {showQualityDropdown && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      right: 0,
                      marginBottom: '8px',
                      backgroundColor: 'rgba(20, 20, 20, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: '100px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(10px)',
                      zIndex: 20
                    }}>
                      <button
                        onClick={() => handleQualityChange(-1)}
                        style={{
                          backgroundColor: currentQualityIndex === -1 ? 'var(--accent-color)' : 'transparent',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        Auto
                      </button>
                      {qualityLevels.map((lvl) => (
                        <button
                          key={lvl.index}
                          onClick={() => handleQualityChange(lvl.index)}
                          style={{
                            backgroundColor: currentQualityIndex === lvl.index ? 'var(--accent-color)' : 'transparent',
                            color: '#ffffff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {lvl.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Picture-in-Picture */}
              {document.pictureInPictureEnabled && (
                <button
                  onClick={togglePip}
                  className="control-btn"
                  title="Picture-in-Picture"
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PipIcon />
                </button>
              )}

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="control-btn"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard info hints */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        margin: '16px auto 0',
        maxWidth: '640px',
        color: 'var(--text-tertiary)',
        fontSize: '0.78rem',
        flexWrap: 'wrap'
      }}>
        <span><kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>Space</kbd> Play/Pause</span>
        <span><kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>← / →</kbd> Jump 10s</span>
        <span><kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>↑ / ↓</kbd> Volume</span>
        <span><kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>F</kbd> Fullscreen</span>
        <span><kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>M</kbd> Mute</span>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px'
      }}>
        <button
          type="button"
          onClick={handleRefreshStream}
          className="glass"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '42px',
            padding: '10px 20px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            color: 'var(--text-primary)',
            border: '1px solid var(--surface-border)',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'var(--accent-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--surface-border)';
          }}
        >
          <RefreshIcon />
          Refresh Stream
        </button>
      </div>
    </div>
  );
}
