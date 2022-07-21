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

export default function ProcessPaymentDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    submitButton = {
        text: "Confirm"
    }
}) {

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
                {/* <GroupBox> */}
                <Grid container spacing={2}>
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
                                >
                                    <TextField
                                        inputProps={{
                                            placeholder: "MM"
                                        }}
                                    />
                                    <TextField
                                        inputProps={{
                                            placeholder: "YY"
                                        }}
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
                            label="Name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                        />
                    </Grid>
                </Grid>
                {/* </GroupBox> */}
            </DialogContent>
            <CustomDialogActions>
                <CancelButton
                    onClick={onClose}
                    text="Pay later"
                />
                <SubmitButton
                    onClick={onSubmit}
                    text={submitButton.text}
                    loading={loadingSubmit}
                />
            </CustomDialogActions>
        </Dialog>
    )
}
