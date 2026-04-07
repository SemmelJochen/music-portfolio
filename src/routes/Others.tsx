const links = [
  {
    title: 'SoundCloud',
    description: 'Alle Tracks, Remixe und Reposts',
    href: 'https://soundcloud.com/elementsmusicproduction',
  },
  {
    title: 'Spotify',
    description: 'Offizielle Releases streamen',
    href: 'https://open.spotify.com/artist/3FK7gXaxK53ARn5sSbgr5P',
  },
  {
    title: 'YouTube',
    description: 'Musikvideos und Visualizer',
    href: 'https://www.youtube.com/channel/UCZjH5QSiMElAqhsgLCeSdiA',
  },
];

export default function Others() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center pt-12 px-4">
      <h1 className="text-4xl md:text-5xl text-black dark:text-white mb-2">Links</h1>
      <p className="text-black/60 dark:text-white/60 mb-10 text-center">
        Finde Elements Music Production auf diesen Plattformen
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-sm
                       border border-black/10 dark:border-white/10
                       hover:bg-black/10 dark:hover:bg-white/10
                       hover:border-accent dark:hover:border-accent-dark
                       transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                  {link.description}
                </p>
              </div>
              <span className="text-black/30 dark:text-white/30 group-hover:text-accent dark:group-hover:text-accent-dark text-2xl transition-colors">
                &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
