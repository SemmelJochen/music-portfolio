import React from 'react';
import { PackedLogo } from './PackedLogo';
import youtubeLogo from '../../resources/vectors/youtube.svg';

export default function Footer() {
    return (
        <div style={{
            height: "80px",
            minHeight: "80px",
            display: "flex",
            flexDirection: "row",
            //position: "absolute",
            bottom: 0,
            width: "100%",
            //height: "2.5rem" 
        }}>

            <PackedLogo name="Soundcloud">
                <iframe
                    title="soundcloud-profile"
                    allowtransparency="true"
                    crolling="no"
                    frameBorder="no"
                    src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Felementsmusicproduction&color=white_transparent&size=48"
                    style={{ width: "48px", height: "48px" }} />
            </PackedLogo>

            <PackedLogo name="Spotify">
                <a href="https://open.spotify.com/artist/3FK7gXaxK53ARn5sSbgr5P?si=_QfLIQx6SCyzZL-GtvnruQ" style={{height: "38px", width: "auto", margin: "5px"}}>
                <img alt="youtube-logo" src="https://svgshare.com/i/6q8.svg" style={{height: "38px", width: "auto"}} />
                </a>
            </PackedLogo>


            <PackedLogo name="Youtube">
                <a href="https://www.youtube.com/channel/UCZjH5QSiMElAqhsgLCeSdiA?view_as=subscriber" style={{height: "32px", width: "auto", margin: "8px"}}>
                <img alt="youtube-logo" src={youtubeLogo} style={{height: "32px", width: "auto"}} />
                </a>
            </PackedLogo>
        </div>
    )
}
