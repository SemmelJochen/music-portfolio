import { Typography } from '@mui/material'

export default function StyledTypography(props) {
    return (
        <Typography sx={{ color: 'text.primary' }} {...props}>
            {props.children}
        </Typography>
    )
}
