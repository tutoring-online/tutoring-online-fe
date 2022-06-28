import React from 'react'
import { Grid } from '@mui/material';

//Component

export default function EditingContent({
    onSubmit
}) {

    return (
        <form onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    Waiting...
                </Grid>
            </Grid>
        </form>
    )
}
