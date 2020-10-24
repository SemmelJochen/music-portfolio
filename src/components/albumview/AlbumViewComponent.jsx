import React from 'react'
import { Link, makeStyles, Typography } from '@material-ui/core';
import './AlbumViewComponent.css'

const useStyles = makeStyles(theme => ({
    cover: {
        width: "320px",
        height: "320px"
    },
    albumDiv: {
        margin: "10px",
        borderRadius: "3px",
        width: "320px",
        height: "320px",
        position: "relative",
        display: "inline-block",
    },
    playButton: {
        position: "absolute",
        top: "110px",
        left: "110px",
        backgroundColor: "black",
        opacity: 0,
        '&:hover': {
            opacity: 0.8
        },
        cursor: "pointer",
        borderRadius: "50px",
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    playButtonInner: {
        width: "50px",
        color: "white"
    },
    titleFont: {
        color: theme.palette.primary.light,
        cursor: "pointer"
    }
}));

export default function AlbumViewComponent(props) {
    const classes = useStyles();
    const { name, id, release_date, external_urls, images } = props.album;
    const releaseDate = release_date.split('-');
    const date = new Date(releaseDate[0], releaseDate[1], releaseDate[2]);

    return (
        <div style={{
            display: "grid",
            alignItems: "center",
            gridAutoFlow: "row",
            overflowX: "hidden",
            width: "340px",
            height: "440px",
            alignContent: "flex-start"
        }}>
            <div key={id}
                className="album"
                style={{
                    transition: "transform 1s",
                    transformStyle: "preserve-3d",
                    margin: "10px",
                    borderRadius: "3px",
                    width: "320px",
                    height: "320px",
                    position: "relative",
                    display: "inline-block",
                }} onClick={onClick}>
                <img
                    className="albumicon albumicon-front"
                    alt={name}
                    src={images[0].url}
                    width="320px"
                    height="auto"
                    style={{
                        display: "block",
                        borderRadius: "3px",
                        position: "absolute",
                        height: "100 %",
                        width: "100 %",
                        backfaceVisibility: "hidden",
                    }}
                />
                <iframe
                    className="albumicon albumicon-back"
                    title="player"
                    src={embedLink(external_urls.spotify)}
                    width="320px"
                    height="320px"
                    style={{
                        display: "block",
                        borderRadius: "3px",
                        border: "0px",
                        position: "absolute",
                        height: "100 %",
                        width: "100 %",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                    scrolling="yes"
                    allow="encrypted-media" />
            </div>
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <Typography className={classes.titleFont} variant="h6">
                    <Link href={external_urls.spotify}>
                        <b>
                            {name}
                        </b>
                    </Link>
                </Typography>
                <Typography variant="body1">
                    <b>
                        {(typeof date.getFullYear() == "number" && !isNaN(date.getFullYear())) ?
                            date.getFullYear()
                            :
                            "No date available"}
                    </b>
                </Typography>
            </div>
        </div>
    )
}

function embedLink(link) {
    var embeddedLink = link.replace('/album', '/embed/album')
    return embeddedLink;
}

function onClick() {
    document.getElementsByClassName('albumicon').classList.toggle('is-flipped');
}