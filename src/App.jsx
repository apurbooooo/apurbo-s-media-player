import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MediaPlayer from './components/MediaPlayer';
import Footer from './components/Footer';
import Login from './components/Login';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import UpcomingMatch from './components/UpcomingMatch';

function SecurityNoticeModal({ onClose }) {
  return (
    <div className="security-notice-overlay" role="dialog" aria-modal="true" aria-labelledby="security-notice-title">
      <div className="glass security-notice-card">
        <button
          type="button"
          className="security-notice-close"
          onClick={onClose}
          aria-label="Close security notice"
        >
          ×
        </button>

        <div className="security-notice-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>

        <div className="security-notice-content">
          <p className="security-notice-kicker">Required browser setting</p>
          <h2 id="security-notice-title">Allow insecure content for live streams</h2>
          <p>
            Some live channels use HTTP stream links. To play them in Chrome, open the browser site settings for this website and change <strong>Insecure content</strong> from <strong>Block (default)</strong> to <strong>Allow</strong>.
          </p>

          <ol className="security-notice-steps">
            <li>Click the site info icon beside the address bar.</li>
            <li>Open <strong>Site settings</strong>.</li>
            <li>Find <strong>Insecure content</strong> and select <strong>Allow</strong>.</li>
            <li>Return to this page and refresh if the stream does not start.</li>
          </ol>
        </div>

        <button type="button" className="premium-button security-notice-action" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [showSecurityNotice, setShowSecurityNotice] = useState(false);

  // Check localStorage, then fallback to OS preference
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [activeUrl, setActiveUrl] = useState(null);

  // Sync theme changes to document attributes & localStorage
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme;
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // React to system OS theme changes if the user hasn't pinned a theme yet
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const hasUserPref = localStorage.getItem('theme');
      if (!hasUserPref) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handlePlayStream = (url) => {
    setActiveUrl(url);
  };

  const handleBackToInput = () => {
    setActiveUrl(null);
  };

  const handleLogin = (username, password) => {
    const success = username === 'admin' && password === 'apurbo1122';
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setShowSecurityNotice(true);
    }
    return success;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowSecurityNotice(false);
    setActiveUrl(null);
  };

  return (
    <>
      {/* Background slideshow */}
      <BackgroundSlideshow />

      {isLoggedIn ? (
        <>
          {/* Main sticky navbar */}
          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onLogoClick={handleBackToInput}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />

          {!activeUrl && <UpcomingMatch />}

          {/* Layout Content wrapper with standard alignment */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Render URL input or custom MediaPlayer depending on active stream url */}
            {!activeUrl ? (
              <div className="transition-layout">
                <Hero onPlayStream={handlePlayStream} />
              </div>
            ) : (
              <div className="transition-layout">
                <MediaPlayer url={activeUrl} onBack={handleBackToInput} />
              </div>
            )}
          </main>

          {/* Minimal clean footer */}
          <Footer />

          {showSecurityNotice && (
            <SecurityNoticeModal onClose={() => setShowSecurityNotice(false)} />
          )}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
