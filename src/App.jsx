import { useState, useEffect, useCallback } from 'react';
import NestedBackground from './components/background/NestedBackground.jsx'
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from '@mui/material'
import Home from './routes/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Others from './routes/Others.jsx';
import AboutMe from './routes/AboutMe.jsx';
import Releases from './routes/Releases.jsx';
import NoMatch from './routes/NoMatch.jsx';

const lightTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#f7a222',
    },
    secondary: {
      main: '#a3bfc2',
    },
    text: {
      primary: "#000000",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Times',
  },
}));
const darkTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#f69709',
    },
    secondary: {
      main: '#1f2d2e',
    },
    text: {
      primary: "#ffffff",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Times',
  },
}));
const routes = {
  home: {
    name: "Home",
    path: "/",
  },
  others: {
    name: "Others",
    path: "/others"
  },
  aboutMe: {
    name: "About Me",
    path: "/about-me"
  },
  releases: {
    name: "Music",
    path: "/music"
  },
}

function App() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(prefersDark);
  const [theme, setTheme] = useState(prefersDark ? darkTheme : lightTheme);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      setTheme(e.matches ? darkTheme : lightTheme);
      setDarkMode(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const darkModeSwitchChange = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      setTheme(next ? darkTheme : lightTheme);
      return next;
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NestedBackground
          routes={routes}
          darkModeChecked={darkMode}
          darkModeChange={darkModeSwitchChange}>

          <Routes>
            <Route path={routes.home.path} element={<Home />} />
            <Route path={routes.aboutMe.path} element={<AboutMe />} />
            <Route path={routes.others.path} element={<Others />} />
            <Route path={routes.releases.path} element={<Releases />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>

        </NestedBackground>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
