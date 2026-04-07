import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import AlbumViewComponent from '../components/albumview/AlbumViewComponent';
import { LoadingAnimation } from '../components/lottie/LoadingAnimation';

async function fetchSpotifyData(link) {
    const encodedData = window.btoa(import.meta.env.VITE_CLIENT_ID + ':' + import.meta.env.VITE_CLIENT_KEY);
    const authHeaderString = 'Basic ' + encodedData;

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        body: "grant_type=client_credentials",
        headers: {
            Authorization: authHeaderString,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(res => res.json()).catch((error) => console.log(error));

    const albums = await fetch(link, {
        headers: {
            Authorization: tokenRes.token_type + " " + tokenRes.access_token
        }
    }).then(res => res.json()).catch((error) => console.log(error));

    return albums;
}

export default function Releases() {
    const theme = useTheme();
    const [albums, setAlbums] = useState(undefined);
    const [dataFetched, setDataFetched] = useState(false);
    const [linksLoaded, setLinksLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetchSpotifyData("https://api.spotify.com/v1/artists/3FK7gXaxK53ARn5sSbgr5P/albums")
            .then(data => {
                if (cancelled) return;
                const sorted = data.items.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                setAlbums(sorted);
                setDataFetched(true);
                console.log(sorted);
            });
        return () => { cancelled = true; };
    }, []);

    const handleLoad = useCallback(() => {
        setLinksLoaded(true);
    }, []);

    const isReady = dataFetched && linksLoaded;

    return (
        <>
            {!isReady && <LoadingAnimation />}
            <Box
                sx={{
                    display: isReady ? "flex" : "none",
                    flex: "0 1 auto",
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    height: "inherit",
                }}
            >
                {/* Profile Bar */}
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
                        src={`https://open.spotify.com/follow/1/?uri=spotify:artist:3FK7gXaxK53ARn5sSbgr5P&size=detail&theme=${theme.palette.mode}`}
                        style={{ border: "none", overflow: "hidden" }}
                        width="300"
                        height="56"
                        scrolling="no"
                        allowtransparency="true"
                        onLoad={handleLoad}
                    />
                </div>

                {/* Albums */}
                {albums !== undefined && albums.map((album) => (
                    <AlbumViewComponent key={album.id} album={album} />
                ))}
            </Box>
        </>
    );
}
