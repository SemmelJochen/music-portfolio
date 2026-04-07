import youtubeLogo from '../../resources/vectors/youtube.svg';

const socials = [
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com/elementsmusicproduction',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.56 8.87V17h8.76c1.85 0 3.35-1.53 3.35-3.42 0-1.89-1.5-3.42-3.35-3.42-.35 0-.69.05-1.01.15C18.89 7.87 16.77 6 14.18 6c-.98 0-1.91.3-2.62.87zM8.56 17h1.5V9.6c-.48-.28-1-.44-1.5-.5V17zm-3 0h1.5v-6.5c-.52.04-1.02.18-1.5.42V17zm-3 0h1.5v-4.31c-.55.56-.95 1.28-1.16 2.09-.22.81-.34 1.5-.34 2.22z"/>
      </svg>
    ),
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/3FK7gXaxK53ARn5sSbgr5P',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCZjH5QSiMElAqhsgLCeSdiA',
    icon: <img alt="YouTube" src={youtubeLogo} className="h-8 w-auto" />,
  },
];

export default function Footer() {
  return (
    <footer className="flex gap-8 items-end justify-start py-6 mt-8">
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 group text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          <div className="opacity-70 group-hover:opacity-100 transition-opacity">
            {s.icon}
          </div>
          <span className="text-xs">{s.name}</span>
        </a>
      ))}
    </footer>
  );
}
