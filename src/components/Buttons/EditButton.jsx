import { Button } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

export default function EditButton({
    onClick,
    text = "Enable Edit",
    startIcon = <EditIcon />
}) {
    return (
        <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={onClick}
            startIcon={startIcon}
        >
            {text}
        </Button>
    )
}
