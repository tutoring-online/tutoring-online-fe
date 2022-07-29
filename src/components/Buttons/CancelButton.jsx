

import { Button } from '@mui/material'
import React from 'react'

export default function CancelButton({
    onClick,
    text = "Cancel"
}) {
    return (
        <Button
            variant=""
            color="info"
            size="medium"
            onClick={onClick}
            sx={{ background: "#fff", "&:hover": { background: "#f3f3f3" } }}
        >
            {text}
        </Button>
    )
}
