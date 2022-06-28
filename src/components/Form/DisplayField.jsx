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
    valueBackgroundColor = "#f7f7f7",
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
                    backgroundColor={valueBackgroundColor}
                    boxShadow="0 1px 2px #c6cfd8"
                >
                    <Box
                        padding="10px 12px"
                        fontSize="14px"
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
