import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Cache variables (in-memory)
let cachedMatch = null;
let cacheExpiry = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

function footballApiProxyPlugin(apiKey) {
  const fetchAndCacheMatch = async () => {
    if (cachedMatch && Date.now() < cacheExpiry) {
      return cachedMatch;
    }

    if (!apiKey || apiKey === 'YOUR_FOOTBALL_DATA_API_KEY') {
      throw new Error('API key is not configured');
    }

    const apiResponse = await fetch('https://api.football-data.org/v4/competitions/WC/matches', {
      headers: {
        'X-Auth-Token': apiKey
      }
    });

    if (!apiResponse.ok) {
      throw new Error(`API responded with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    
    // Valid active match statuses: scheduled/timed or currently live
    const validStatuses = ['SCHEDULED', 'TIMED', 'LIVE', 'IN_PLAY', 'PAUSED'];
    const upcoming = (data.matches || [])
      .filter(m => validStatuses.includes(m.status))
      .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

    if (upcoming.length === 0) {
      throw new Error('No upcoming matches found in schedule');
    }

    cachedMatch = upcoming[0];
    cacheExpiry = Date.now() + CACHE_DURATION;
    return cachedMatch;
  };

  const handler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      const match = await fetchAndCacheMatch();
      res.statusCode = 200;
      res.end(JSON.stringify(match));
    } catch (err) {
      console.error('[football-api-proxy] Error:', err.message);
      res.statusCode = err.message === 'API key is not configured' ? 500 : 502;
      res.end(JSON.stringify({ error: err.message || 'Failed to fetch match schedule' }));
    }
  };

  return {
    name: 'football-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/football', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/football', handler);
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.FOOTBALL_API_KEY;

  return {
    plugins: [
      react(),
      footballApiProxyPlugin(apiKey)
    ]
  }
})
