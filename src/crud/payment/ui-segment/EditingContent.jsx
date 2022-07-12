import React from 'react'
import { FormLabel, Grid } from '@mui/material';
import SmallSyllabusCard from 'components/Cards/SmallSyllabusCard';
import GroupBox from 'components/Form/GroupBox';
import OutlineRadioGroupField from 'components/Form/OutlineRadioGroupField';
import { COMBO_OPTIONS } from 'settings/payment-setting';
import { DATE_SESSION_OPTIONS } from 'settings/payment-setting';

//Component

const BookingInfo = ({
    control,
    errors,
}) => (
    <GroupBox>
        <Grid container>
            <Grid item xs={12}>
                <FormLabel sx={{ fontSize: "18px" }}>
                    Booking Info
                </FormLabel>
            </Grid>

            <Grid item xs={12}>
                <OutlineRadioGroupField
                    label="Combo"
                    name="combo"
                    row={true}
                    options={COMBO_OPTIONS}
                    control={control}
                    error={errors.combo?.message}
                />
            </Grid>

            <Grid item xs={12}>
                <OutlineRadioGroupField
                    label="Date session"
                    name="dateSession"
                    row={true}
                    options={DATE_SESSION_OPTIONS}
                    control={control}
                    error={errors.combo?.message}
                />
            </Grid>

        </Grid>
    </GroupBox>
)

export default function EditingContent({
    onSubmit,
    syllabus,
    control,
    errors
}) {

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SmallSyllabusCard
                        syllabus={syllabus}
                    />
                </Grid>

                <Grid item xs={12}>
                    <BookingInfo
                        control={control}
                        errors={errors}
                    />
                </Grid>
            </Grid>
        </form>
    )
}
