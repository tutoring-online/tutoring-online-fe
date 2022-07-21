import React from "react";

//Mui
import { Dialog, DialogContent, Grid } from "@mui/material";

//Core components
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";
import TextField from "components/Form/TextField";
import DisplayField from "components/Form/DisplayField";
import { Box } from "@mui/system";
import BackDropLoader from "components/Loading/BackDropLoader";
import { MasterCardImage } from "nta-team/nta-img";
import { VisaCardImage } from "nta-team/nta-img";
import { PaypalImage } from "nta-team/nta-img";
import SelectField from "components/Form/SelectField";
import { useForm } from "react-hook-form";

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

export default function ProcessPaymentDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    submitButton = {
        text: "Confirm"
    }
}) {

    const { control } = useForm()

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
        >
            <CustomDialogTitle
                title={"Process Payment"}
                onClose={onClose}
            />
            <DialogContent>
                <Box
                    display="flex"
                    gap="0.5rem"
                >
                    <MasterCardImage width="50px" height="50px" />
                    <VisaCardImage width="50px" height="50px" />
                    <PaypalImage width="50px" height="50px" />
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Card number"
                            inputProps={{
                                placeholder: "XXXX XXXX XXXX XXXX"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="CVV"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <CustomDialogActions>
                <CancelButton
                    onClick={onClose}
                    text="Pay later"
                />
                <SubmitButton
                    onClick={onSubmit}
                    text={submitButton.text}
                    startIcon={submitButton.icon}
                />
            </CustomDialogActions>
            <BackDropLoader
                open={loadingSubmit}
                text="Processing.."
            />
        </Dialog>
    )
}
