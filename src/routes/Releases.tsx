import { useState, useEffect, useCallback } from 'react';
import AlbumCard from '../components/albumview/AlbumCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAudio } from '../context/AudioContext';
import { spotifyFetch, type SpotifyAlbum, type SpotifyTrack } from '../lib/spotify';

export default function Releases() {
  const { play } = useAudio();
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [loadingAlbumId, setLoadingAlbumId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    spotifyFetch<{ items: SpotifyAlbum[] }>(
      '/artists/3FK7gXaxK53ARn5sSbgr5P/albums'
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

  const handlePlay = useCallback(async (album: SpotifyAlbum) => {
    setLoadingAlbumId(album.id);
    try {
      const data = await spotifyFetch<{ items: SpotifyTrack[] }>(
        `/albums/${album.id}/tracks`
      );
      const trackWithPreview = data.items.find((t) => t.preview_url);
      if (trackWithPreview && trackWithPreview.preview_url) {
        play({
          id: trackWithPreview.id,
          name: trackWithPreview.name,
          albumName: album.name,
          albumId: album.id,
          previewUrl: trackWithPreview.preview_url,
          albumArt: album.images[0]?.url ?? '',
          spotifyUrl: trackWithPreview.external_urls.spotify,
        });
      } else {
        window.open(album.external_urls.spotify, '_blank');
      }
    } catch (e) {
      console.error('Failed to load tracks:', e);
      window.open(album.external_urls.spotify, '_blank');
    } finally {
      setLoadingAlbumId(null);
    }
  }, [play]);

  if (!dataFetched) return <LoadingSpinner />;

  return (
    <div className="pb-24">
      <div className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-5xl text-black dark:text-white mb-2">Releases</h1>
        <p className="text-black/60 dark:text-white/60">
          Klick auf ein Album um eine Vorschau zu hören
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onPlay={handlePlay}
            loading={loadingAlbumId === album.id}
          />
        ))}
      </div>
    </div>
  );
}
