import { createContext, useContext, useState, useRef, useCallback, useEffect, type ReactNode } from 'react';

export interface Track {
  id: string;
  name: string;
  albumName: string;
  albumId: string;
  previewUrl: string;
  albumArt: string;
  spotifyUrl: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  seek: (time: number) => void;
  playingAlbumId: string | null;
}

const AudioCtx = createContext<AudioContextType | null>(null);

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => setProgress(audio.currentTime));
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('play', () => setIsPlaying(true));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.id === track.id) {
      audio.play();
      return;
    }

    audio.src = track.previewUrl;
    audio.play();
    setCurrentTrack(track);
    setProgress(0);
  }, [currentTrack]);

  const pause = useCallback(() => audioRef.current?.pause(), []);
  const resume = useCallback(() => audioRef.current?.play(), []);
  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = '';
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
  }, []);
  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        play,
        pause,
        resume,
        stop,
        seek,
        playingAlbumId: currentTrack?.albumId ?? null,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}
