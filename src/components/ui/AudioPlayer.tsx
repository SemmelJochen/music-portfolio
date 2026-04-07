import { useAudio } from '../../context/AudioContext';

function formatTime(sec: number) {
  const s = Math.floor(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const { currentTrack, isPlaying, progress, duration, pause, resume, stop, seek } = useAudio();

  if (!currentTrack) return null;

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 text-white">
      <div className="max-w-4xl mx-auto flex items-center gap-4 px-4 py-3">
        {/* Album Art */}
        <img
          src={currentTrack.albumArt}
          alt={currentTrack.albumName}
          className="w-12 h-12 rounded object-cover shrink-0"
        />

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{currentTrack.name}</p>
          <p className="text-xs text-white/60 truncate">{currentTrack.albumName}</p>
        </div>

        {/* Controls */}
        <button
          onClick={isPlaying ? pause : resume}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0 cursor-pointer"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          )}
        </button>

        {/* Progress */}
        <div className="hidden sm:flex items-center gap-2 w-48 shrink-0">
          <span className="text-xs text-white/50 w-8 text-right">{formatTime(progress)}</span>
          <div
            className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              seek(x * duration);
            }}
          >
            <div
              className="absolute top-0 left-0 h-full bg-accent-dark rounded-full transition-[width] duration-100"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-white/50 w-8">{formatTime(duration)}</span>
        </div>

        {/* Spotify Link */}
        <a
          href={currentTrack.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/40 hover:text-white/70 transition-colors hidden md:block"
          title="Open in Spotify"
        >
          Spotify
        </a>

        {/* Close */}
        <button
          onClick={stop}
          className="text-white/40 hover:text-white transition-colors text-lg cursor-pointer bg-transparent border-none"
          aria-label="Close player"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
