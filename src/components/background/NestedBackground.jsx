import './NestedBackground.css'
import { useSpring, animated } from '@react-spring/web'
import { Switch } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import Footer from '../footer/Footer'
import StyledTypography from '../typography/StyledTypography'
import Navbar from '../navbar/Navbar'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`
const trans5 = (x, y) => `translate3d(${x / 10 - 250}px,${y / 9 - 200}px,0)`
const trans6 = (x, y) => `translate3d(${x / 15 + 35}px,${y / 15 - 230}px,0)`
const trans7 = (x, y) => `translate3d(${x / 100 + 35}px,${y / 100}px,0)`

function NestedBackground(props) {
  const theme = useTheme();
  const [springs, api] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));

  const rootStyle = {
    width: "100%",
    height: "100%",
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "hidden",
    position: "absolute",
  };

  return (
    <div style={rootStyle} onMouseMove={({ clientX: x, clientY: y }) => api.start({ xy: calc(x, y) })}>
      <animated.div className="stars1" style={{ transform: springs.xy.to(trans1) }} />
      <animated.div className="stars2" style={{ transform: springs.xy.to(trans2) }} />
      <animated.div className="stars3" style={{ transform: springs.xy.to(trans3) }} />
      <animated.div className="stars4" style={{ transform: springs.xy.to(trans4) }} />
      <animated.div className="stars02" style={{ transform: springs.xy.to(trans7) }} />

      <animated.div className="moon" style={{ transform: springs.xy.to(trans2) }} />
      <animated.div className="saturn" style={{ transform: springs.xy.to(trans1) }} />
      <animated.div className="jupiter" style={{ transform: springs.xy.to(trans5) }} />
      <animated.div className="uranus" style={{ transform: springs.xy.to(trans6) }} />

      <animated.div className="fog" style={{ transform: springs.xy.to(trans1) }} />
      <animated.div className="fog" style={{ transform: springs.xy.to(trans2) }} />
      <div className="navbar-container">
        {/* Switch */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          position: "absolute"
        }}>
          <StyledTypography>Dark Mode</StyledTypography>
          <Switch color="primary" defaultChecked={props.darkModeChecked} onChange={props.darkModeChange} />
        </div>
        <Navbar routes={props.routes} />
      </div>

      <div style={{
        position: "absolute",
        top: "70px",
        width: "90vw",
        display: "block",
      }}>
        {props.children}
        <Footer />
      </div>

    </div>
  )
}
NestedBackground.propTypes = {
  darkModeChecked: PropTypes.bool,
  darkModeChange: PropTypes.func.isRequired,
}

export default NestedBackground;
