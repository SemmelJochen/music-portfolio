import { useAudio } from '../../context/AudioContext';
import type { SpotifyAlbum } from '../../lib/spotify';

interface Props {
  album: SpotifyAlbum;
  onPlay: (album: SpotifyAlbum) => void;
  loading?: boolean;
}

export default function AlbumCard({ album, onPlay, loading }: Props) {
  const { playingAlbumId, isPlaying, pause, resume } = useAudio();
  const { name, release_date, external_urls, images } = album;
  const year = new Date(release_date).getFullYear();
  const isThisPlaying = playingAlbumId === album.id;

  const handleClick = () => {
    if (isThisPlaying && isPlaying) {
      pause();
    } else if (isThisPlaying) {
      resume();
    } else {
      onPlay(album);
    }
  };

  return (
    <div className="w-[340px] grid items-start content-start gap-3 p-2">
      <button
        onClick={handleClick}
        className="relative w-[320px] h-[320px] rounded-lg overflow-hidden group cursor-pointer border-0 p-0 bg-transparent"
        aria-label={`Play ${name}`}
      >
        <img
          className="w-full h-full object-cover rounded-lg"
          alt={name}
          src={images[0]?.url}
        />

        {/* Play/Pause overlay */}
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-lg ${isThisPlaying ? 'bg-black/30' : ''}`}>
          <div className={`w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300 ${isThisPlaying ? 'scale-100 opacity-100' : 'scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}>
            {loading ? (
              <div className="w-6 h-6 border-3 border-accent border-t-transparent rounded-full animate-spin" />
            ) : isThisPlaying && isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#7d5300">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#7d5300">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>

        {/* Now playing indicator */}
        {isThisPlaying && isPlaying && (
          <div className="absolute bottom-3 left-3 flex gap-0.5 items-end h-4">
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0ms' }} />
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '40%', animationDelay: '300ms' }} />
            <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '80%', animationDelay: '450ms' }} />
          </div>
        )}
      </button>

      <div className="px-1">
        <a
          href={external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary dark:text-primary-dark font-bold text-lg hover:underline"
        >
          {name}
        </a>
        <p className="text-black dark:text-white text-sm mt-1">
          {!isNaN(year) ? year : 'No date available'}
        </p>
      </div>
    </div>
  );
}
