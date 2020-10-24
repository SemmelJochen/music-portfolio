import React from 'react'
import { ListItem } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar(props) {
    const { routes } = props;
    return (
        <div style={{
            height: "60px",
            //position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            textAlign: "center",
            margin: 0,
            //top: "10px"
        }}>
            <div style={{ padding: "16px" }}>
                <NavLink
                    className="link"
                    activeClassName="active"
                    exact
                    to={routes.home.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <ListItem className="menu-item" style={{ padding: "0px" }}>{routes.home.name}</ListItem>
                </NavLink>
            </div>
            <div style={{ padding: "16px" }}>
                <NavLink
                    className="link"
                    activeClassName="active"
                    to={routes.others.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <ListItem className="menu-item" style={{ padding: "0px" }}>{routes.others.name}</ListItem>
                </NavLink>
            </div>
            <div style={{ padding: "16px" }}>
                <NavLink
                    className="link"
                    activeClassName="active"
                    to={routes.aboutMe.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <ListItem className="menu-item" style={{ padding: "0px" }} >{routes.aboutMe.name}</ListItem>
                </NavLink>
            </div>
            <div style={{ padding: "16px" }}>
                <NavLink
                    className="link"
                    activeClassName="active"
                    to={routes.releases.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <ListItem className="menu-item" style={{ padding: "0px" }} >{routes.releases.name}</ListItem>
                </NavLink>
            </div>
        </div>
    )
}
