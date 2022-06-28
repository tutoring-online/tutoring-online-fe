import React from 'react'
import { Grid } from '@mui/material';

//Component
import TextField from 'components/Form/TextField';
import SelectField from 'components/Form/SelectField';
import useCategoryList from 'hooks/category/useCategoryList';

export default function EditingContent({
    register,
    errors,
    control,
    onSubmit,
}) {
    const { categoryList } = useCategoryList();

    return (
        <form onSubmit={onSubmit}>
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <TextField
                        label="Code"
                        required={true}
                        inputProps={{
                            ...register("code"),
                        }}
                        error={errors.code?.message}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        label="Name"
                        required={true}
                        inputProps={{
                            ...register("name"),
                        }}
                        error={errors.name?.message}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <SelectField
                        label="Category"
                        name="categoryId"
                        control={control}
                        required={true}
                        options={categoryList.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                        error={errors.categoryId?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        inputProps={{
                            ...register("description"),
                            multiline: true,
                            rows: 4,
                            type: "date",
                        }}
                        error={errors.description?.message}
                    />
                </Grid>
            </Grid>
        </form>
    )
}
