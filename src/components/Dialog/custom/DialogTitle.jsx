import { Box, DialogTitle, IconButton } from '@mui/material'
import BootstrapTooltip from 'nta-team/nta-tooltips/BootstrapTooltip'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function CustomDialogTitle({
    title = "",
    onClose
}) {
    return (
        <DialogTitle
            component={Box}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            fontSize="1.2rem"
        >
            {title}
            <BootstrapTooltip title="Close">
                <IconButton
                    onClick={onClose}
                    sx={{ padding: "5px" }}
                >
                    <CloseIcon
                        sx={{ width: 24, height: 24 }}
                    />
                </IconButton>
            </BootstrapTooltip>
        </DialogTitle>
    )
}
