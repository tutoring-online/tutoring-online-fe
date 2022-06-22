import React from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import styled from '@emotion/styled';

import ConfirmDialogBottom from './ConfirmDialogBottom';
import "./index.scss";

const RedButton = withStyles(() => ({
    root: {
        color: "#fff",
        padding: "8px 22px",
        backgroundColor: "#e45253",
        borderRadius: 0,
        '&:hover': {
            backgroundColor: "#aa3838",
        },
    },
}))(Button);

const ColorButton = styled(Button)(() => ({
    color: "#777",
    backgroundColor: "#f7f7f7",
    border: "1px solid #c9c9c9 !important",
    borderRadius: 0,
    padding: "7px 22px",
    '&:hover': {
        color: "#333",
        backgroundColor: "#e7e7e7",
        border: "1px solid #c9c9c9 !important",
    },
}));

const DefaultCancelButton = ({ onCancel = () => { } }) => (
    <ColorButton
        onClick={onCancel}
        size="large"
    >
        Cancel
    </ColorButton>
)

const DefaultConfirmButton = ({ onConfirm = () => { } }) => (
    <RedButton
        onClick={onConfirm}
        size="large"
    >
        Confirm
    </RedButton>
)

const ConfirmDialog = ({
    open,
    onCancel = () => { },
    onConfirm = () => { },

    description = "Are you sure?",
    title = "Confirm",
    CancelButton = DefaultCancelButton,
    ConfirmButton = DefaultConfirmButton,
}) => {

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="md"
            className="confirm-dialog"
        >
            <DialogContent style={{ padding: 1 }}>
                <div className="confirm-dialog__content">
                    <div className="confirm-dialog__title">
                        {title}
                    </div>
                    <div className="confirm-dialog__description">
                        {description}
                    </div>
                </div>
            </DialogContent>
            <ConfirmDialogBottom>
                <CancelButton onCancel={onCancel} />
                <ConfirmButton onConfirm={onConfirm} />
            </ConfirmDialogBottom>
        </Dialog>
    )
}

export default ConfirmDialog;
