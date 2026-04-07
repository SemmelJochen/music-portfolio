import { useState, useEffect, useCallback } from 'react';
import AlbumCard from '../components/albumview/AlbumCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { SpotifyAlbum } from '../components/albumview/AlbumCard';

interface SpotifyResponse {
  items: SpotifyAlbum[];
}

async function fetchSpotifyData(link: string): Promise<SpotifyResponse> {
  const encodedData = window.btoa(
    import.meta.env.VITE_CLIENT_ID + ':' + import.meta.env.VITE_CLIENT_KEY
  );

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: 'Basic ' + encodedData,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  }).then((res) => res.json());

  const albums = await fetch(link, {
    headers: {
      Authorization: tokenRes.token_type + ' ' + tokenRes.access_token,
    },
  }).then((res) => res.json());

  return albums;
}

export default function Releases() {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchSpotifyData(
      'https://api.spotify.com/v1/artists/3FK7gXaxK53ARn5sSbgr5P/albums'
    ).then((data) => {
      if (cancelled) return;
      const sorted = [...data.items].sort(
        (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
      setAlbums(sorted);
      setDataFetched(true);
    }).catch(console.error);
    return () => { cancelled = true; };
  }, []);

  const handleProfileLoad = useCallback(() => setProfileLoaded(true), []);
  const isReady = dataFetched && profileLoaded;

  return (
    <>
      {!isReady && <LoadingSpinner />}
      <div
        className="flex flex-wrap justify-center gap-6 w-full"
        style={{ display: isReady ? 'flex' : 'none' }}
      >
        {/* Spotify Profile */}
        <div className="w-full text-center mb-8">
          <iframe
            title="spotify_profile"
            src="https://open.spotify.com/follow/1/?uri=spotify:artist:3FK7gXaxK53ARn5sSbgr5P&size=detail&theme=dark"
            className="border-0 overflow-hidden"
            width="300"
            height="56"
            onLoad={handleProfileLoad}
          />
        </div>

        {/* Album Grid */}
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </>
  );
}
