import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
    line: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        gridGap: 8,
        color: blue[500]
    },
    wrapper: {
        position: 'relative',
        maxHeight: "33.2px",
    },
}));


export default function NTALoading({
    loading = false,
    text = "Loading...",
    size = 16,
    thickness = 4
}) {
    const classes = useStyles();
    const [loadingState, setLoadingState] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        let timer = null;

        if (loading === false) {
            timer = setTimeout(() => {
                setLoadingState(false);
                setContent("");
            }, 1000)
        }

        if (loading === true) {
            setContent(text);
            setLoadingState(true);
        }

        return () => timer && clearTimeout(timer);
    }, [loading, text]);

    return (
        <div className={classes.wrapper}>
            {loadingState === true &&
                <span className={classes.line}>
                    {content || ""}
                    <CircularProgress size={size} thickness={thickness} />
                </span>
            }
        </div>
    );
}