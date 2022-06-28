import React from 'react'
import { Grid } from '@mui/material';

//Component
import TextField from 'components/Form/TextField';

export default function EditingContent({
    register,
    errors,
    onSubmit,
}) {

    return (
        <form onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        required={true}
                        inputProps={{
                            ...register("name"),
                        }}
                        error={errors.name?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        inputProps={{
                            ...register("description"),
                            multiline: true,
                            rows: 4,
                        }}
                        error={errors.description?.message}
                    />
                </Grid>
            </Grid>
        </form>
    )
}
