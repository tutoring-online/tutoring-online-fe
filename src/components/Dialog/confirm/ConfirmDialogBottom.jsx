import React from 'react'
import makeStyles from '@mui/styles/makeStyles';
import { DialogActions } from '@mui/material';

const useStyles = makeStyles(() => ({
    root: {
        padding: 0,
    },
    wrapper: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
    }
}));

export default function ConfirmDialogBottom({ children, ...props }) {

    const classes = useStyles();

    return (
        <DialogActions className={classes.root} {...props}>
            <div className={classes.wrapper}>
                {children}
            </div>
        </DialogActions>
    )
}
