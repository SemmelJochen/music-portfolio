import React from 'react'
import StyledTypography from '../components/typography/StyledTypography';


export default function Home() {
    const headline = "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special.";
    const body = "Stephen Hawking"
    return (
        <div
            style={{
                height: 'calc(100vh - 70px)',
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
            }}>
            <div style={{ width: "80%" }}>
                <StyledTypography variant="h3">{headline}</StyledTypography>
                <StyledTypography variant="h5">{body}</StyledTypography>
            </div>
        </div>
    )
}
