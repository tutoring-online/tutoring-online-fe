import { LoadingButton } from '@mui/lab'
import React from 'react'

export default function SubmitButton({
    onClick,
    text = "Submit",
    loading = false,
    ...props
}) {
    return (
        <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            size="medium"
            type="submit"
            onClick={onClick}
            {...props}
        >
            {text}
        </LoadingButton>
    )
}
