import { Link } from 'react-router-dom';

export default function NoMatch() {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl md:text-9xl font-bold text-primary dark:text-primary-dark opacity-80">
        404
      </h1>
      <p className="text-xl md:text-2xl text-black dark:text-white mt-4 mb-2">
        Lost in Space
      </p>
      <p className="text-black/50 dark:text-white/50 mb-8 max-w-md">
        Diese Seite existiert nicht &mdash; aber das Universum hat noch so viel mehr zu bieten.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-primary dark:bg-primary-dark text-white font-bold
                   hover:opacity-90 transition-opacity no-underline"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
