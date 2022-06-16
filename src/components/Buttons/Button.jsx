import React from 'react'
import makeStyles from "@mui/styles/makeStyles";

import componentStyles from "assets/theme/views/admin/profile.js";
import { Button } from '@mui/material';

const useStyles = makeStyles(componentStyles);

export default function TemplateButton({ children, ...props }) {
    const classes = useStyles();

    return (
        <Button
            classes={{ root: classes.buttonRootInfo }}
            {...props}
        >
            {children}
        </Button>
    )
}

