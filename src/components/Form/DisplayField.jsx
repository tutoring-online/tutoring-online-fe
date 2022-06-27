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
    error
}) {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl
                error={Boolean(error)}
                component={Box}
                width="100%"
                marginBottom="1rem!important"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    minHeight="43px"
                    paddingLeft="0.75rem"
                    paddingRight="0.75rem"
                    borderRadius="6px"
                    boxShadow="0 1px 3px rgb(50, 50, 93,0.15), 0 1px 0 rgb(0, 0, 0,0.02)"
                >
                    <Box
                        padding="10px 12px"
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
