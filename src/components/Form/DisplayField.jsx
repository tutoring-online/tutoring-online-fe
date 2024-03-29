import React from 'react'
import {
    Box,
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel
} from '@mui/material'

export default function DisplayField({
    label,
    value,
    valueBackgroundColor = "#fff",
    error
}) {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl
                error={Boolean(error)}
                component={Box}
                width="100%"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor={valueBackgroundColor}
                >
                    <Box
                        fontSize="14px"
                        width="100%"
                    >
                        {value}
                    </Box>
                </Box>
                {error &&
                    <FormHelperText>{error}</FormHelperText>
                }
            </FormControl>
        </FormGroup>
    )
}
