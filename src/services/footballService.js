/**
 * Football Service — fetches the next FIFA World Cup 2026 fixture
 * from the server-side proxy at /api/football.
 *
 * Logs full error details (HTTP status, body, message) to the
 * browser console so issues can be debugged.
 */
export async function fetchUpcomingMatch() {
  try {
    const response = await fetch('/api/football');
    const responseText = await response.text();

    if (!response.ok) {
      let errorDetail;
      try {
        errorDetail = JSON.parse(responseText);
      } catch {
        errorDetail = { error: 'Failed to parse JSON response', body: responseText };
      }

      console.error('Football API request failed:', {
        'HTTP status': response.status,
        'Response body': errorDetail.body || responseText,
        'Error message': errorDetail.error || 'Unknown error'
      });
      return null;
    }

    const match = JSON.parse(responseText);
    return match;
  } catch (error) {
    console.error('Football API request failed:', {
      'HTTP status': 'Fetch / Network Error',
      'Response body': 'N/A',
      'Error message': error.message
    });
    return null;
  }
}
