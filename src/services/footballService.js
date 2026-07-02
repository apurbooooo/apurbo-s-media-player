/**
 * Reusable Football Service to fetch match fixtures from the server-side proxy
 */
export async function fetchUpcomingMatch() {
  try {
    const response = await fetch('/api/football');
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }
    const match = await response.json();
    return match;
  } catch (error) {
    console.error('[footballService] Failed to fetch upcoming match:', error.message);
    return null;
  }
}
