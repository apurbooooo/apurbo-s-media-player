import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate a brief premium auth loading delay
    setTimeout(() => {
      const success = onLogin(username.trim(), password.trim());
      setIsLoading(false);
      if (!success) {
        setError('Invalid username or password. Please try again.');
      }
    }, 800);
  };

  return (
    <div className="login-stage" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="login-backdrop-grid" />
      <div className="login-backdrop-panel" />

      <div className="glass login-card" style={{
        maxWidth: '430px',
        width: '100%',
        padding: '36px 30px',
        borderRadius: '22px',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--card-shadow), 0 22px 80px -28px rgba(var(--accent-rgb), 0.42)',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Decorative subtle header line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ef4444, #22c55e, var(--accent-color))'
        }} />

        {/* Branding & Intro */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ef4444 0%, var(--accent-color) 55%, #22c55e 100%)',
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 28px rgba(var(--accent-rgb), 0.32)',
            margin: '0 auto 12px',
            transform: 'rotate(-4deg)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#ffffff" stroke="none" style={{ transform: 'rotate(4deg)' }}>
              <path d="m7 4 12 8-12 8V4Z" />
            </svg>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 7vw, 2.2rem)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 0,
            lineHeight: 1.05
          }}>
            Apurbo's Media Player
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginTop: '4px',
            maxWidth: '330px'
          }}>
            Sign in to watch live sports channels and custom HLS streams.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Username Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Username
            </label>
            <div className="glass" style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '12px',
              padding: '10px 14px',
              border: '1px solid var(--surface-border)',
              transition: 'border-color 0.2s'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5, marginRight: '10px' }}>
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="premium-input"
                style={{ fontSize: '0.9rem' }}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Password
            </label>
            <div className="glass" style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '12px',
              padding: '10px 14px',
              border: '1px solid var(--surface-border)',
              transition: 'border-color 0.2s'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5, marginRight: '10px' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="premium-input"
                style={{ fontSize: '0.9rem' }}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              color: '#ef4444',
              fontSize: '0.82rem',
              fontWeight: 500,
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              padding: '10px 12px',
              borderRadius: '8px',
              textAlign: 'center',
              animation: 'fade-in-up 0.2s ease-out'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="premium-button"
            disabled={isLoading}
            style={{
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.95rem',
              marginTop: '8px',
              position: 'relative'
            }}
          >
            {isLoading ? (
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: '#ffffff',
                borderRadius: '50%',
                animation: 'spin-loader 0.8s linear infinite'
              }} />
            ) : (
              'Unlock Access'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
