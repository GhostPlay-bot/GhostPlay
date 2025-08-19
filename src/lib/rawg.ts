const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const RAWG_BASE_URL = 'https://api.rawg.io/api';

console.log('RAWG API Key:', RAWG_API_KEY ? 'Present' : 'Missing');

if (!RAWG_API_KEY) {
  console.error('Missing RAWG API key - check your .env file');
}

export interface RAWGGame {
  id: number;
  name: string;
  description?: string;
  description_raw?: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic: number | null;
  released: string;
  genres: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  platforms: Array<{
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
  short_screenshots?: Array<{
    id: number;
    image: string;
  }>;
}

export interface RAWGResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RAWGGame[];
}

export interface RAWGGameDetails extends RAWGGame {
  description_raw: string;
  website: string;
  reddit_url: string;
  metacritic_url: string;
  developers: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  publishers: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

const makeRequest = async (url: string): Promise<any> => {
  console.log('Making RAWG API request to:', url);
  
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'GhostPlay/1.0',
    },
  });
  
  console.log('RAWG API response status:', response.status);
  
  // Clone response to read it twice
  const responseClone = response.clone();
  const responseText = await responseClone.text();
  console.log('RAWG API raw response text:', responseText);
  
  if (!response.ok) {
    console.error('RAWG API error for URL:', url, 'Status:', response.status, 'Response:', responseText);
    throw new Error(`RAWG API error: ${response.status} - ${responseText}`);
  }
  
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (parseError) {
    console.error('Failed to parse RAWG API response as JSON:', parseError, 'Raw text:', responseText);
    throw new Error('Invalid JSON response from RAWG API');
  }
  
  console.log('RAWG API response data:', data);
  return data;
};

export const rawgService = {
  // Get popular games
  async getPopularGames(page = 1, pageSize = 20): Promise<RAWGResponse> {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    // Get games from the last 5 years to ensure relevance
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    const fiveYearsAgoString = fiveYearsAgo.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}&dates=${fiveYearsAgoString},${today}&ordering=-rating,-released&metacritic=70,100`;
    return makeRequest(url);
  },

  // Get trending games (recently released with high ratings)
  async getTrendingGames(page = 1, pageSize = 20): Promise<RAWGResponse> {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    // Get games from the last 2 years for better trending content
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const twoYearsAgoString = twoYearsAgo.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${Math.min(pageSize, 40)}&dates=${twoYearsAgoString},${today}&ordering=-released,-rating&metacritic=60,100`;
    return makeRequest(url);
  },

  // Get upcoming games
  async getUpcomingGames(page = 1, pageSize = 20): Promise<RAWGResponse> {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    const today = new Date().toISOString().split('T')[0];
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const nextYearString = nextYear.toISOString().split('T')[0];

    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}&dates=${today},${nextYearString}&ordering=-released`;
    return makeRequest(url);
  },

  // Get game details by ID
  async getGameDetails(gameId: number): Promise<RAWGGameDetails> {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    const url = `${RAWG_BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`;
    return makeRequest(url);
  },

  // Get game screenshots
  async getGameScreenshots(gameId: number) {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    const url = `${RAWG_BASE_URL}/games/${gameId}/screenshots?key=${RAWG_API_KEY}`;
    return makeRequest(url);
  },

  // Search games
  async searchGames(query: string, page = 1, pageSize = 20): Promise<RAWGResponse> {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page=${page}&page_size=${Math.min(pageSize, 40)}&ordering=-rating`;
    return makeRequest(url);
  },

  // Get games by genre
  async getGamesByGenre(genreId: number, page = 1, pageSize = 20): Promise<RAWGResponse> {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    // Get games from the last 10 years for category filtering
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    const tenYearsAgoString = tenYearsAgo.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&genres=${genreId}&page=${page}&page_size=${Math.min(pageSize, 40)}&dates=${tenYearsAgoString},${today}&ordering=-released,-rating&metacritic=50,100`;
    return makeRequest(url);
  },

  // Get all genres
  async getGenres() {
    if (!RAWG_API_KEY) {
      throw new Error('RAWG API key is not configured');
    }

    const url = `${RAWG_BASE_URL}/genres?key=${RAWG_API_KEY}`;
    return makeRequest(url);
  },
};