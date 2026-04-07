import { useState } from 'react'
import { Button, ListItem, SwipeableDrawer } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function NavLinks({ routes }) {
    const theme = useTheme();
    const linkStyle = { textDecoration: "none", color: theme.palette.text.primary };

    const navItems = [
        { route: routes.home, exact: true },
        { route: routes.others },
        { route: routes.aboutMe },
        { route: routes.releases },
    ];

    return navItems.map(({ route, exact }) => (
        <div key={route.path} style={{ padding: "16px" }}>
            <NavLink
                style={linkStyle}
                className={({ isActive }) => isActive ? "active" : ""}
                end={exact}
                to={route.path}
            >
                <ListItem className="menu-item" style={{ padding: "0px" }}>{route.name}</ListItem>
            </NavLink>
        </div>
    ));
}

export default function Navbar(props) {
    const { routes } = props;
    return (
        <>
            <div className="navbar">
                <NavLinks routes={routes} />
            </div>

            <div className="mobile-navbar">
                <NavbarDrawer routes={routes} />
            </div>
        </>
    )
}

function NavbarDrawer({ routes }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = (isOpen) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(isOpen);
    }

    const toggleButtonLine = {
        width: "30px",
        height: "2px",
        background: theme.palette.text.primary,
    };

    return (
        <>
            <Button
                sx={{
                    display: "flex",
                    height: "20px",
                    width: "30px",
                    padding: 0,
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                    marginLeft: "1rem",
                    minWidth: 0,
                    verticalAlign: "unset"
                }}
                onClick={toggleDrawer(true)}
            >
                <div style={toggleButtonLine} />
                <div style={toggleButtonLine} />
                <div style={toggleButtonLine} />
            </Button>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div>
                    <NavLinks routes={routes} />
                </div>
            </SwipeableDrawer>
        </>
    )
}
