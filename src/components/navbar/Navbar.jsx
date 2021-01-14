import React from 'react'
import { Button, ListItem, makeStyles, SwipeableDrawer } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import './Navbar.css'


const useStyles = makeStyles((theme) => ({
    toggleButton: {
        display: "flex",
        height: "20px",
        width: "30px",
        padding: 0,
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        marginLeft: "1rem",
        //overwrite @MUI theme button styles
        minWidth: 0,
        verticalAlign: "unset"
    },
    toggleButtonLine: {
        width: "30px",
        height: "2px",
        background: theme.palette.text.primary,
    },
    navLinks: {
        textDecoration: "none",
        color: theme.palette.text.primary,
    }
}));

export default function Navbar(props) {
    const { routes } = props;
    const classes = useStyles();
    return (
        <>
            <div className="navbar">

                <div style={{ padding: "16px" }}>
                    <NavLink
                        className={classes.navLinks}
                        activeClassName="active"
                        exact
                        to={routes.home.path}
                    >
                        <ListItem className="menu-item" style={{ padding: "0px" }}>{routes.home.name}</ListItem>
                    </NavLink>
                </div>
                <div style={{ padding: "16px" }}>
                    <NavLink
                        className={classes.navLinks}
                        activeClassName="active"
                        to={routes.others.path}
                    >
                        <ListItem className="menu-item" style={{ padding: "0px" }}>{routes.others.name}</ListItem>
                    </NavLink>
                </div>
                <div style={{ padding: "16px" }}>
                    <NavLink
                        className={classes.navLinks}
                        activeClassName="active"
                        to={routes.aboutMe.path}
                    >
                        <ListItem className="menu-item" style={{ padding: "0px" }} >{routes.aboutMe.name}</ListItem>
                    </NavLink>
                </div>
                <div style={{ padding: "16px" }}>
                    <NavLink
                        className={classes.navLinks}
                        activeClassName="active"
                        to={routes.releases.path}
                    >
                        <ListItem className="menu-item" style={{ padding: "0px" }} >{routes.releases.name}</ListItem>
                    </NavLink>
                </div>
            </div>

            <div className="mobile-navbar">
                {NavbarDrawer(routes)}
            </div>
        </>
    )
}

function NavbarDrawer(routes) {
    const [state, setState] = React.useState({
        open: false,
    });
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...open, open: open });
    }
    const classes = useStyles();
    /**
     * for improving performance on iOS - if there are problems
     * const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
     * <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />
     */
    return (
        <>
            <Button className={classes.toggleButton} onClick={toggleDrawer(true)}>
                <div className={classes.toggleButtonLine} />
                <div className={classes.toggleButtonLine} />
                <div className={classes.toggleButtonLine} />
            </Button>
            <SwipeableDrawer
                anchor="left"
                open={state.open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div>
                    <div style={{ padding: "16px" }}>
                        <NavLink
                            className={classes.navLinks}
                            activeClassName="active"
                            exact
                            to={routes.home.path}
                        >
                            <ListItem className="menu-item" style={{ padding: "0px" }}>{routes.home.name}</ListItem>
                        </NavLink>
                    </div>
                    <div style={{ padding: "16px" }}>
                        <NavLink
                            className={classes.navLinks}
                            activeClassName="active"
                            to={routes.others.path}
                        >
                            <ListItem className="menu-item" style={{ padding: "0px" }}>{routes.others.name}</ListItem>
                        </NavLink>
                    </div>
                    <div style={{ padding: "16px" }}>
                        <NavLink
                            className={classes.navLinks}
                            activeClassName="active"
                            to={routes.aboutMe.path}
                        >
                            <ListItem className="menu-item" style={{ padding: "0px" }} >{routes.aboutMe.name}</ListItem>
                        </NavLink>
                    </div>
                    <div style={{ padding: "16px" }}>
                        <NavLink
                            className={classes.navLinks}
                            activeClassName="active"
                            to={routes.releases.path}
                        >
                            <ListItem className="menu-item" style={{ padding: "0px" }} >{routes.releases.name}</ListItem>
                        </NavLink>
                    </div>
                </div>

            </SwipeableDrawer>
        </>
    )
}
