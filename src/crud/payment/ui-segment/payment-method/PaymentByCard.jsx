import { Box, Grid } from '@mui/material';
import DisplayField from 'components/Form/DisplayField';
import SelectField from 'components/Form/SelectField';
import TextField from 'components/Form/TextField';
import { PaypalImage } from 'nta-team/nta-img';
import { VisaCardImage } from 'nta-team/nta-img';
import { MasterCardImage } from 'nta-team/nta-img';
import React, { memo } from 'react'
import { useForm } from 'react-hook-form';

const generateCartYearOptions = () => {
    const options = [];
    for (let i = 1; i < 100; i++) {
        const temp = i < 10 ? "0" + i : "" + i;
        options.push({ label: temp, value: temp });
    }
    return options;
}

const getMonthOptions = () => {
    const options = [];
    for (let i = 1; i < 13; i++) {
        const temp = i < 10 ? "0" + i : "" + i;
        options.push({ label: temp, value: temp });
    }
    return options;
}

function PaymentByCard() {

    const { control } = useForm()

    return (
        <Box
            component="div"
        >
            <Box
                display="flex"
                gap="1rem"
            >
                <MasterCardImage width="50px" height="50px" />
                <VisaCardImage width="50px" height="50px" />
                <PaypalImage width="50px" height="50px" />
            </Box>
            <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item xs={6}>
                    <DisplayField
                        label="Name"
                        value={<TextField fullWidth />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DisplayField
                        label="Card number"
                        value={(
                            <TextField
                                fullWidth
                                inputProps={{
                                    placeholder: "XXXX XXXX XXXX XXXX"
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DisplayField
                        label="Expiry date"
                        value={
                            <Box
                                display="flex"
                                columnGap="0.5rem"
                                height="fit-content"
                                overFlow="hidden"
                                width="100%"
                            >
                                <SelectField
                                    inputProps={{
                                        placeholder: "MM",
                                        type: "number"
                                    }}
                                    name="month"
                                    options={getMonthOptions()}
                                    control={control}
                                />
                                <SelectField
                                    inputProps={{
                                        placeholder: "YY",
                                        type: "number"
                                    }}
                                    name="year"
                                    options={generateCartYearOptions()}
                                    control={control}
                                />
                            </Box>
                        }
                    />
                </Grid>
                <Grid item xs={6}>
                    <DisplayField
                        label="CVV"
                        value={<TextField fullWidth />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <DisplayField
                        label="Address"
                        value={<TextField fullWidth />}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default memo(PaymentByCard);