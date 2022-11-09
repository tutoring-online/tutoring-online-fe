import React, { useState } from "react";

//Mui
import { Box, Container, Dialog, DialogContent } from "@mui/material";

//Core components
import CustomDialogTitle from "components/Dialog/custom/CustomDialogTitle";
import CustomDialogActions from "components/Dialog/custom/CustomDialogActions";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";
import BackDropLoader from "components/Loading/BackDropLoader";
import SelectPaymentMethod from "./SelectPaymentMethod";
import CompletePayment from "./CompletePayment";

const STEPS = {
    SELECT_PAYMENT_METHOD: 1,
    DO_PAYMENT: 2
}

const STEP_OPTIONS = [
    { label: "1. How do you want to pay?", value: STEPS.SELECT_PAYMENT_METHOD },
    { label: "2. Complete you payment.", value: STEPS.DO_PAYMENT },
]

export const PAYMENT_METHOD = {
    MOMO: "MOMO",
    CREDIT_CARD: "CREDIT_CARD",
    PAY_LATER: "PAY_LATER"
}

export default function ProcessPaymentDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,
    onPayLater,
    onPayByMomo,
    submitButton = {
        text: "Confirm"
    }
}) {
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.MOMO);

    const handleChangePaymentMethod = (newValue) => {
        setPaymentMethod(newValue);
    }

    const renderContent = () => (
        <>
            <Box
                component={Container}
                display="flex"
                flexDirection="column"
                gap="1rem"
            >
                <SelectPaymentMethod
                    title={STEP_OPTIONS[0].label}
                    paymentMethod={paymentMethod}
                    onChange={handleChangePaymentMethod}
                />
                {paymentMethod &&
                    <CompletePayment
                        title={STEP_OPTIONS[1].label}
                        paymentMethod={paymentMethod}
                    />
                }
            </Box>
        </>
    )

    const renderActions = () => {
        if (paymentMethod === PAYMENT_METHOD.MOMO) {
            return (
                <SubmitButton
                    onClick={onPayByMomo}
                    text={"Confirm"}
                    startIcon={submitButton.icon}
                />
            )
        }

        if (paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
            return (
                <SubmitButton
                    onClick={onSubmit}
                    text={submitButton.text}
                    startIcon={submitButton.icon}
                />
            )
        }

        return (
            <CancelButton
                onClick={onPayLater}
                text="Close"
            />
        )
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
        >
            <CustomDialogTitle
                title={"Process Payment"}
                onClose={onClose}
            />
            <DialogContent>
                {renderContent()}
            </DialogContent>
            <CustomDialogActions>
                {renderActions()}
            </CustomDialogActions>
            <BackDropLoader
                open={loadingSubmit}
                text="Processing.."
            />
        </Dialog>
    )
}
