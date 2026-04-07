import { useState, useEffect, useCallback } from 'react';
import NestedBackground from './components/background/NestedBackground';
import Home from './routes/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const routes: RoutesMap = {
  home: { name: "Home", path: "/" },
  others: { name: "Others", path: "/others" },
  aboutMe: { name: "About Me", path: "/about-me" },
  releases: { name: "Music", path: "/music" },
};

function App() {
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

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return (
    <BrowserRouter>
      <NestedBackground
        routes={routes}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      >
        <Routes>
          <Route path={routes.home.path} element={<Home />} />
          <Route path={routes.aboutMe.path} element={<AboutMe />} />
          <Route path={routes.others.path} element={<Others />} />
          <Route path={routes.releases.path} element={<Releases />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </NestedBackground>
    </BrowserRouter>
  );
}

export default App;
