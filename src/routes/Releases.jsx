import React, { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AlbumViewComponent from '../components/albumview/AlbumViewComponent';
import { LoadingAnimation } from '../components/lottie/LoadingAnimation';

const styles = theme => ({
    albumMap: {
        display: "flex",
        flex: "0 1 auto",
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        height: "inherit",
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
            dataFetched: false,
            linksLoaded: false,
        };
        this.handleLoad.bind(this);
    }

    fetchAccessToken() {

        const encodedData = window.btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_KEY);
        const authHeaderString = 'Basic ' + encodedData;
        //default limit: 20
        fetch("https://accounts.spotify.com/api/token", {
            body: "grant_type=client_credentials",
            headers: {
                Authorization: authHeaderString,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        }).then(res => res.json())
            .then(token => { this.fetchAlbumData("https://api.spotify.com/v1/artists/3FK7gXaxK53ARn5sSbgr5P/albums", token)}) //whyyyyyyy??????!!?!?!?!?!?!??
            .catch((error) => console.error(error));

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

    fetchAlbumData(link, token) {
        //const _this = this;
        fetch(this.state.link, {
            headers: {
                Authorization: token.token_type + " " + token.access_token
            }
        }).then(res => res.json())
            .then(res => {
                var albumItems = res;
                var sortedByReleaseDate = albumItems.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                this.setState({
                    albums: sortedByReleaseDate,
                    dataFetched: true
                });
            }).then((res) => { return res; })
            //.catch((error) => console.error(error));
    }

    componentDidUpdate(prevProps, prevState) {
        const token = this.state.token;
        if (typeof token != "undefined") {
            //this.fetchAlbumData("https://api.spotify.com/v1/artists/3FK7gXaxK53ARn5sSbgr5P/albums")
        }
    }

    async componentDidMount() {
        var albums = await this.fetchSpotifyData("https://api.spotify.com/v1/artists/3FK7gXaxK53ARn5sSbgr5P/albums");
        var albumItems = albums.items;
        var sortedByReleaseDate = albumItems.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        this.setState(
            { 
                albums: sortedByReleaseDate,
                dataFetched: true,
                
         });
        
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
                    allowtransparency="true"
                    onLoad={this.handleLoad}
                />
            </div>
        )
    }
    handleLoad = () => {
        this.setState({ linksLoaded: true });
    }

    albumParallax() {
        var parallaxContainer = <>
            {this.state.albums !== undefined && this.state.albums.map((album) => (
                <AlbumViewComponent key={album.id} album={album} />
            ))
            }
        </>;
        return parallaxContainer;
    }
    render() {
        const { classes } = this.props;
        const isReady = this.state.dataFetched && this.state.linksLoaded;
        console.log(this.state.dataFetched);
        return (
            <>
                {!isReady &&
                    <LoadingAnimation />
                }
                <div className={classes.albumMap} style={isReady ? { display: 'flex' } : { display: 'none' }}>
                    {this.profileBar()}
                    {this.albumParallax()}
                </div>

            </>
        )
    }
}

Releases.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withTheme(withStyles(styles)(Releases));