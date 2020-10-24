import React from 'react'
import './NestedBackground.css'
import { useSpring, animated } from 'react-spring'
import { makeStyles, Switch, Typography, withTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import Footer from '../footer/Footer'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`
const trans5 = (x, y) => `translate3d(${x / 10 - 250}px,${y / 9 - 200}px,0)`
const trans6 = (x, y) => `translate3d(${x / 15 + 35}px,${y / 15 - 230}px,0)`
const trans7 = (x, y) => `translate3d(${x / 100 + 35}px,${y / 100}px,0)`

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "hidden",
    position: "absolute",
  }
}));

function NestedBackground(props) {
  const classes = useStyles();
  const [get, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
  return (
    <div className={classes.root} onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.div className="stars1" style={{ transform: get.xy.interpolate(trans1) }} />
      <animated.div className="stars2" style={{ transform: get.xy.interpolate(trans2) }} />
      <animated.div className="stars3" style={{ transform: get.xy.interpolate(trans3) }} />
      <animated.div className="stars4" style={{ transform: get.xy.interpolate(trans4) }} />
      <animated.div className="stars02" style={{ transform: get.xy.interpolate(trans7) }} />

      <animated.div className="moon" style={{ transform: get.xy.interpolate(trans2) }} />
      <animated.div className="saturn" style={{ transform: get.xy.interpolate(trans1) }} />
      <animated.div className="jupiter" style={{ transform: get.xy.interpolate(trans5) }} />
      <animated.div className="uranus" style={{ transform: get.xy.interpolate(trans6) }} />

      <animated.div className="fog" style={{ transform: get.xy.interpolate(trans1) }} />
      <animated.div className="fog" style={{ transform: get.xy.interpolate(trans2) }} />
      <div style={{
        justifyContent: "flex-start",
        height: "60px",
        position: "absolute",
        top: "10px",
        display: "flex",
        alignItems: "center",
        zIndex: "1",
        width: "100vw"
      }}>
        {props.navbar}
        <div style={{
          position: "absolute",
          display:"flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Typography>Dark Mode</Typography>
          <Switch color="primary" defaultChecked={props.darkModeChecked} onChange={props.darkModeChange}/>
        </div>
      </div>

      <div style={{
        position: "absolute",
        top: "70px",
        width: "90vw",
        height: 'calc(100vh - 70px)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //flexDirection: "column"
      }}>
        {props.children}
        <Footer/>
      </div>

    </div>
  )
}
NestedBackground.propTypes = {
    darkModeChecked: PropTypes.bool,
    darkModeChange: PropTypes.func.isRequired,
}

export default withTheme(NestedBackground);