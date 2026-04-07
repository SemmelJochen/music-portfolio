import youtubeLogo from '../../resources/vectors/youtube.svg';

const socials = [
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com/elementsmusicproduction',
    icon: (
      <iframe
        title="soundcloud-profile"
        frameBorder="no"
        src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Felementsmusicproduction&color=white_transparent&size=48"
        className="w-12 h-12"
      />
    ),
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/3FK7gXaxK53ARn5sSbgr5P',
    icon: (
      <img
        alt="Spotify"
        src="https://svgshare.com/i/6q8.svg"
        className="h-10 w-auto"
      />
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCZjH5QSiMElAqhsgLCeSdiA',
    icon: (
      <img alt="YouTube" src={youtubeLogo} className="h-8 w-auto" />
    ),
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
          className="flex flex-col items-center gap-1 group"
        >
          <div className="opacity-70 group-hover:opacity-100 transition-opacity">
            {s.icon}
          </div>
          <span className="text-black dark:text-white text-xs opacity-70 group-hover:opacity-100 transition-opacity">
            {s.name}
          </span>
        </a>
      ))}
    </footer>
  );
}
