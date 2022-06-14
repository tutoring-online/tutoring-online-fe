import * as React from 'react';
import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: "16px !important",
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    input: {
        width: "100%",
        height: "100%",
    }
}))

export default function TutorSearchField({ props }) {
    const classes = useStyles();

    return (
        <TextField
            className={classes.root}
            InputProps={{ className: classes.input }}
            {...props}
        />
    )
}