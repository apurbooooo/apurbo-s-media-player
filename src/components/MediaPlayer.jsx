import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

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

export default function MediaPlayer({ url, onBack }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
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

  // Auto-hide controls after 3 seconds of mouse inactivity
  useEffect(() => {
    let timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  // Initialize HLS / Native Video Playback
  useEffect(() => {
    let hls;
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setErrorMessage(null);

    // Sync volume setting initially
    video.volume = volume;
    video.muted = isMuted;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferSize: 30 * 1024 * 1024, // 30MB buffer size
      });
      
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
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
      {/* Return Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '16px'
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
            fontWeight: 500,
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
          Back to URL Input
        </button>
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
          borderRadius: isFullscreen ? '0px' : '20px',
          overflow: 'hidden',
          backgroundColor: '#000000',
          boxShadow: isFullscreen ? 'none' : 'var(--card-shadow)',
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
            objectFit: 'contain'
          }}
          playsInline
        />

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
              borderTopColor: '#ffffff',
              borderRadius: '50%',
              animation: 'spin-loader 0.8s linear infinite'
            }} />
            <span style={{
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              Buffering stream
            </span>
          </div>
        )}

        {/* Central Overlay States: Play/Pause quick flash overlay on click */}
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
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '20px',
              borderRadius: '16px',
              maxWidth: '460px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 style={{ color: '#ef4444', fontFamily: 'var(--font-display)', margin: 0 }}>Playback Error</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: 0 }}>
                {errorMessage}
              </p>
              <button
                onClick={handleRefreshStream}
                className="premium-button"
                style={{
                  backgroundColor: '#ef4444',
                  marginTop: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem'
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
          padding: isFullscreen ? '32px 40px' : '20px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 5,
          opacity: showControls ? 1 : 0,
          transform: showControls ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
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
                style={{ flex: 1 }}
              />
            ) : (
              <div style={{
                height: '4px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '2px',
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
            width: '100%'
          }}>
            {/* Left Controls: Play, Volume, Time */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="control-btn"
                style={{
                  color: '#ffffff',
                  width: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              {/* Volume Controller */}
              <div
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
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
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.85rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
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
                    <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em', color: '#ef4444', fontWeight: 700 }}>LIVE</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8rem' }}>({formatTime(currentTime)})</span>
                  </div>
                ) : (
                  <span>
                    {formatTime(currentTime)} <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 2px' }}>/</span> {formatTime(duration)}
                  </span>
                )}
              </div>
            </div>

            {/* Right Controls: PiP, Fullscreen */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* Picture-in-Picture */}
              {document.pictureInPictureEnabled && (
                <button
                  onClick={togglePip}
                  className="control-btn"
                  title="Picture-in-Picture"
                  style={{ color: '#ffffff' }}
                >
                  <PipIcon />
                </button>
              )}

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="control-btn"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                style={{ color: '#ffffff' }}
              >
                {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <p style={{
        margin: '12px auto 0',
        maxWidth: '620px',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
        fontSize: '0.82rem',
        lineHeight: 1.5
      }}>
        Tip: Please be patient. Your stream may take a few seconds to start.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '18px'
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
