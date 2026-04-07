import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { RoutesMap } from '../../router';

interface Props {
  routes: RoutesMap;
}

function NavLinks({ routes, onClick }: { routes: RoutesMap; onClick?: () => void }) {
  const navItems = [
    { route: routes.home, exact: true },
    { route: routes.others, exact: false },
    { route: routes.aboutMe, exact: false },
    { route: routes.releases, exact: false },
  ];

  return (
    <>
      {navItems.map(({ route, exact }) => (
        <div key={route.path} className="px-4">
          <Link
            to={route.path}
            activeOptions={{ exact }}
            className="text-black dark:text-white no-underline text-lg transition-all duration-200 pb-1 border-b-3 border-transparent [&.active]:border-accent dark:[&.active]:border-accent-dark hover:border-accent/50 dark:hover:border-accent-dark/50"
            activeProps={{ className: 'active' }}
            onClick={onClick}
          >
            {route.name}
          </Link>
        </div>
      ))}
    </>
  );
}

export default function Navbar({ routes }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex h-[60px] absolute items-center justify-center">
        <NavLinks routes={routes} />
      </nav>

      {/* Mobile hamburger */}
      <div className="flex md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col justify-between h-5 w-[30px] ml-4 cursor-pointer bg-transparent border-none p-0"
          aria-label="Open menu"
        >
          <span className="w-[30px] h-0.5 bg-black dark:bg-white" />
          <span className="w-[30px] h-0.5 bg-black dark:bg-white" />
          <span className="w-[30px] h-0.5 bg-black dark:bg-white" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <nav className="absolute left-0 top-0 h-full w-64 bg-surface dark:bg-surface-dark shadow-xl p-6 flex flex-col gap-2">
            <button
              onClick={() => setOpen(false)}
              className="self-end text-2xl text-black dark:text-white bg-transparent border-none cursor-pointer mb-4"
              aria-label="Close menu"
            >
              &times;
            </button>
            <NavLinks routes={routes} onClick={() => setOpen(false)} />
          </nav>
        </div>
      )}
    </>
  );
}
