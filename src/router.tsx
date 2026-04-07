import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { AudioProvider } from './context/AudioContext';
import NestedBackground from './components/background/NestedBackground';
import Home from './routes/Home';
import Others from './routes/Others';
import AboutMe from './routes/AboutMe';
import Releases from './routes/Releases';
import NoMatch from './routes/NoMatch';

export interface RouteConfig {
  name: string;
  path: string;
}

export interface RoutesMap {
  home: RouteConfig;
  others: RouteConfig;
  aboutMe: RouteConfig;
  releases: RouteConfig;
}

export const routes: RoutesMap = {
  home: { name: 'Home', path: '/' },
  others: { name: 'Others', path: '/others' },
  aboutMe: { name: 'About Me', path: '/about-me' },
  releases: { name: 'Music', path: '/music' },
};

function RootLayout() {
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  const [darkMode, setDarkMode] = useState(prefersDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), []);

  return (
    <AudioProvider>
      <NestedBackground
        routes={routes}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      >
        <Outlet />
      </NestedBackground>
    </AudioProvider>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NoMatch,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const othersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/others',
  component: Others,
});

const aboutMeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about-me',
  component: AboutMe,
});

const releasesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music',
  component: Releases,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  othersRoute,
  aboutMeRoute,
  releasesRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
