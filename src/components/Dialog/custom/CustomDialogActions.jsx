import React from 'react'
import { DialogActions } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    root: {
        background: "#e3e3e3",
        boxShadow: "0 -1px 2px 0 rgba(0,0,0, 0.16)",
    },
    wrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gridGap: "0.5rem",
    }
}));

export default function CustomDialogActions({ children, ...props }) {

    const classes = useStyles();

    return (
        <DialogActions className={classes.root} {...props}>
            <div className={classes.wrapper}>
                {children}
            </div>
        </DialogActions>
    )
}
