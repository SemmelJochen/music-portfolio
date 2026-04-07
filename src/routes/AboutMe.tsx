export default function AboutMe() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center pt-12 px-4">
      <h1 className="text-4xl md:text-5xl text-black dark:text-white mb-8">About</h1>

      <div className="max-w-2xl space-y-6">
        <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
          <span className="text-primary dark:text-primary-dark font-bold">Elements Music Production</span> ist
          ein Musikprojekt, das sich auf elektronische Musik spezialisiert hat.
          Von atmosphärischen Ambient-Sounds bis hin zu energiegeladenen Beats
          &mdash; die Musik verbindet Genres und schafft einzigartige Klangwelten.
        </p>

        <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
          Inspiriert von den Weiten des Universums und der Schönheit der Natur,
          entstehen Kompositionen, die zum Nachdenken und Träumen einladen.
        </p>

        <div className="mt-10 p-6 rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10">
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">Kontakt</h2>
          <p className="text-black/60 dark:text-white/60">
            Für Anfragen, Kollaborationen oder einfach nur zum Austausch &mdash;
            schreib gerne über die Social-Media-Kanäle auf der{' '}
            <a href="/others" className="text-primary dark:text-primary-dark hover:underline">
              Links-Seite
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
