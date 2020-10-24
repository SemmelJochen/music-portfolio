import React from 'react';
import NestedBackground from './components/background/NestedBackground.jsx'
import { ThemeProvider, createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core'
import Home from './routes/Home.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Others from './routes/Others.jsx';
import AboutMe from './routes/AboutMe.jsx';
import Releases from './routes/Releases.jsx';
import NoMatch from './routes/NoMatch.jsx';
import Footer from './components/footer/Footer.jsx'
const lightTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: '#f7a222',
    },
    secondary: {
      main: '#749fa3',
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
const darkTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: "dark",
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
    component: Home,
    path: "/",
  },
  others: {
    name: "Others",
    component: Others,
    path: "/others"
  },
  aboutMe: {
    name: "About Me",
    component: AboutMe,
    path: "/about-me"
  },
  releases: {
    name: "Music",
    component: Releases,
    path: "/music"
  },
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false,
      theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme,
    }
    this.darkModeSwitchChange = this.darkModeSwitchChange.bind(this);
  }

  componentDidMount() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newColorScheme = e.matches ? "dark" : "light";
      if (newColorScheme === "light") {
        this.setState({ theme: lightTheme });
      } else {
        this.setState({ theme: darkTheme });
      }
    });
  }
  darkModeSwitchChange() {
    if (this.state.darkMode) {
      this.setState({ theme: lightTheme });
      this.setState({ darkMode: !this.state.darkMode })
    } else if (!this.state.darkMode) {
      this.setState({ theme: darkTheme });
      this.setState({ darkMode: !this.state.darkMode })
    }
  }
  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <NestedBackground
            navbar={<Navbar routes={routes} />}
            darkModeChecked={this.state.darkMode}
            darkModeChange={this.darkModeSwitchChange}>

            <Switch>
              <Route exact path={routes.home.path} component={routes.home.component} />
              <Route path={routes.aboutMe.path} component={routes.aboutMe.component} />
              <Route path={routes.others.path} component={routes.others.component} />
              <Route path={routes.releases.path} component={routes.releases.component} />
              <Route component={NoMatch} />
            </Switch>

          </NestedBackground>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App;