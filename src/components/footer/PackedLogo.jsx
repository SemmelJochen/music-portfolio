import StyledTypography from '../typography/StyledTypography'
import React from 'react'

export const PackedLogo = (props) => {
    return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginRight: "20px"
            }}>
                {props.children}
                <StyledTypography>{props.name}</StyledTypography>
            </div>
    )
}
