import React, { Component } from 'react';
import { Dialog, ClickAwayListener } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AlbumViewComponent from '../components/albumview/AlbumViewComponent';

const styles = theme => ({
    albumMap: {
        display: "flex",
        flex: "0 1 auto",
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        height: "inherit",
        marginTop: "20px"
    }
});
class Releases extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elements: undefined,
            albums: undefined,
            open: false,
            selectedAlbumPreview: undefined,
            audioPlayer: new Audio(),
        };
    }
    async fetchSpotifyData(link) {
        var encodedData = window.btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_KEY);
        var authHeaderString = 'Basic ' + encodedData;
        //default limit: 20
        var token = await fetch("https://accounts.spotify.com/api/token", {
            body: "grant_type=client_credentials",
            headers: {
                Authorization: authHeaderString,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        }).then(res => res.json()).then(function (res) { return res }).catch((error) => console.log(error));

        var albums = await fetch(link, {
            headers: {
                Authorization: token.token_type + " " + token.access_token
            }
        }).then(res => res.json()).then(function (res) { return res }).catch((error) => console.log(error));

        return albums;

    }
    async componentDidMount() {
        var albums = await this.fetchSpotifyData("https://api.spotify.com/v1/artists/3FK7gXaxK53ARn5sSbgr5P/albums");
        var albumItems = albums.items;
        var sortedByReleaseDate = albumItems.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        this.setState({ albums: sortedByReleaseDate });
        console.log(sortedByReleaseDate);
    }
    embedLink(link) {
        var embeddedLink = link.replace('/album', '/embed/album')
        return embeddedLink;
    }
    profileBar() {
        return (
            <div style={{
                width: "100vw",
                height: "60px",
                margin: "15px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "5%",

            }}>
                <iframe
                    title="spotify_profile"
                    src={`https://open.spotify.com/follow/1/?uri=spotify:artist:3FK7gXaxK53ARn5sSbgr5P&size=detail&theme=${this.props.theme.palette.type}`}
                    style={{ boder: "none", overflow: "hidden", border: "0" }}
                    width="300"
                    height="56"
                    scrolling="no"
                    allowtransparency="true" />

                <iframe
                    title="soundcloud-profile"
                    allowtransparency="true"
                    crolling="no"
                    frameborder="no"
                    src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Felementsmusicproduction&color=white_transparent&size=64"
                    style={{ width: "64px", height: "64px" }} />
            </div>
        )
    }
    async onClick(albumLink) {
        this.setState({ open: true });
        this.setState({ selectedAlbumPreviewLink: albumLink })
        console.log(albumLink)
    }
    dialog(albumLink) {
        return (
            <>
                {albumLink !== undefined &&
                    <Dialog open={this.state.open}>
                        <ClickAwayListener onClickAway={() => this.setState({ open: false })}>
                            <iframe title="player"
                                src={this.embedLink(albumLink)}
                                width="320"
                                height="320"
                                style={{ boder: "none", overflow: "hidden", border: "0" }}
                                scrolling="yes"
                                allow="encrypted-media" />
                        </ClickAwayListener>
                    </Dialog>
                }
            </>
        )
    }
    albumParallax() {
        var parallaxContainer = <>
            {this.state.albums !== undefined && this.state.albums.map((album) => (
                <AlbumViewComponent key={album.id} album={album} onClick={this.onClick.bind(this)} />
            ))
            }
        </>;
        return parallaxContainer;
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.albumMap}>
                {this.profileBar()}
                {this.albumParallax()}
                {this.dialog(this.state.selectedAlbumPreviewLink)}
            </div>
        )
    }
}

Releases.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withTheme(withStyles(styles)(Releases));