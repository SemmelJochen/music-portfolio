import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    font: {
        color: theme.palette.text
    }
}));

export default function StyledTypography(props) {
    const classes = useStyles();
    return (
        <Typography className={classes.font} {...props}>
            {props.children}
        </Typography>
    )
}
