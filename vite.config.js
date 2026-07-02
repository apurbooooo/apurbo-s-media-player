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

    if (!apiKey) {
      throw { status: 500, message: 'API key is not configured in .env', body: 'Missing API key' };
    }

    const apiResponse = await fetch('https://api.football-data.org/v4/competitions/WC/matches?season=2026&status=SCHEDULED', {
      headers: {
        'X-Auth-Token': apiKey
      }
    });

    const responseBody = await apiResponse.text();

    if (!apiResponse.ok) {
      throw { status: apiResponse.status, message: `API responded with status ${apiResponse.status}`, body: responseBody };
    }

    let data;
    try {
      data = JSON.parse(responseBody);
    } catch (e) {
      throw { status: 500, message: 'Failed to parse JSON response from Football API', body: responseBody };
    }
    
    const upcoming = (data.matches || [])
      .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

    if (upcoming.length === 0) {
      throw { status: 404, message: 'No upcoming matches found in schedule', body: responseBody };
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
      res.statusCode = err.status || 502;
      res.end(JSON.stringify({ 
        error: err.message || 'Failed to fetch match schedule', 
        status: err.status || 502,
        body: err.body || 'No additional details available'
      }));
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
