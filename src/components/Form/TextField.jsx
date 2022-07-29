import React from 'react'
import { Box, FilledInput, FormControl, FormGroup, FormHelperText, FormLabel } from '@mui/material'
import RequiredLabel from 'components/Text/RequiredLabel';

export default function TextField({
    label,
    required,
    disabled,
    inputProps,
    error
}) {
    return (
        <FormGroup>
            {label &&
                <FormLabel>
                    {required ? <RequiredLabel label={label} /> : label}
                </FormLabel>
            }
            <FormControl
                error={Boolean(error)}
                component={Box}
                width="100%"
                marginBottom="1rem!important"
            >
                <Box
                    paddingLeft="0.75rem"
                    paddingRight="0.75rem"
                    component={FilledInput}
                    autoComplete="off"
                    type="text"
                    disabled={Boolean(disabled)}
                    {...(inputProps || {})}
                />
                {error &&
                    <FormHelperText>{error}</FormHelperText>
                }
            </FormControl>
        </FormGroup>
    )
}
