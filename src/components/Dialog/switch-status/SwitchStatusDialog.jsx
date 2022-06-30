import React, { useEffect, useState } from "react";

import { Dialog, DialogContent, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { isAvailableArray } from "helpers/arrayUtils";

import CustomDialogActions from "../custom/CustomDialogActions";
import CustomDialogTitle from "../custom/CustomDialogTitle";
import CancelButton from "components/Buttons/CancelButton";
import SubmitButton from "components/Buttons/SubmitButton";

export default function SwitchStatusDialog({
    open,
    onClose,
    onSubmit,
    loadingSubmit,

    title = "Status settings",
    status,
    listStatus,
}) {

    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        setSelectedStatus(status);
    }, [status])

    const handleOnChangeSelectedStatus = (event, value) => {
        setSelectedStatus(parseInt(value));
    }

    const handleSubmit = () => {
        onSubmit(selectedStatus);
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
        >
            <CustomDialogTitle title={title} onClose={onClose} />
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <RadioGroup
                            value={selectedStatus}
                            onChange={handleOnChangeSelectedStatus}
                        >
                            {isAvailableArray(listStatus) && listStatus.map((item, index) =>
                                <FormControlLabel
                                    key={index}
                                    value={item.value}
                                    label={selectedStatus === item.value ? <b>{item.label}</b> : item.label}
                                    sx={{
                                        borderRadius: "4px",
                                        width: "100%",
                                        margin: 0,
                                        marginTop: "0.5rem",
                                        backgroundColor: item.bgColor,
                                        color: item.textColor,
                                        transition: "all 0.3s ease",
                                        boxShadow: `0 1px 2px ${selectedStatus === item.value ? item.textColor : "transparent"}`,
                                        "&:hover": {
                                            boxShadow: `0 1px 2px ${item.textColor}`
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: item.textColor + " !important"
                                        }
                                    }}
                                    control={<Radio size="small" sx={{
                                        color: item.textColor
                                    }} />}
                                />
                            )}
                        </RadioGroup>
                    </Grid>
                </Grid>
            </DialogContent>
            <CustomDialogActions>
                <CancelButton
                    onClick={onClose}
                    text="Close"
                />
                <SubmitButton
                    onClick={handleSubmit}
                    text={"Update"}
                    loading={loadingSubmit}
                    disabled={status === selectedStatus}
                />
            </CustomDialogActions>
        </Dialog>
    )
}
