import React from 'react'
import { Typography } from '@material-ui/core'

export default function Home() {
    const headline = "We are just an advanced breed of monkeys on a minor planet of a very average star. But we can understand the Universe. That makes us something very special.";
    const body = "Stephen Hawking"
    return (
        <div
            style={{
                height: 'calc(100vh - 70px)',
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
            }}>
            <Typography variant="h3">{headline}</Typography>
            <Typography variant="h5">{body}</Typography>
        </div>
    )
}
