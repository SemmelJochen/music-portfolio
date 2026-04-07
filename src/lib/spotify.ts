let tokenCache: { token: string; expires: number } | null = null;

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expires) {
    return tokenCache.token;
  }
  const encoded = btoa(
    import.meta.env.VITE_CLIENT_ID + ':' + import.meta.env.VITE_CLIENT_KEY
  );
  const res = await fetch('https://accounts.spotify.com/api/token', {
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: 'Basic ' + encoded,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  }).then((r) => r.json());

  tokenCache = {
    token: res.access_token,
    expires: Date.now() + (res.expires_in - 60) * 1000,
  };
  return res.access_token;
}

export async function spotifyFetch<T>(endpoint: string): Promise<T> {
  const token = await getToken();
  return fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: 'Bearer ' + token },
  }).then((r) => r.json());
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  external_urls: { spotify: string };
  images: { url: string; height: number; width: number }[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  preview_url: string | null;
  track_number: number;
  duration_ms: number;
  external_urls: { spotify: string };
}
