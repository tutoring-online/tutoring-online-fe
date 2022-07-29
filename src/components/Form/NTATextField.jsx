import React from 'react'
import { Box, FormControl, FormGroup, FormHelperText, FormLabel, InputBase } from '@mui/material'
import RequiredLabel from 'components/Text/RequiredLabel';

export default function NTATextField({
    label,
    required,
    disabled,
    inputProps,
    error
}) {
    return (
        <FormGroup
            className="nta-select-field"
        >
            {label &&
                <FormLabel
                    sx={{
                        color: "#8898aa",
                        fontWeight: 400,
                        fontSize: "11px",
                        letterSpacing: "0.75px",
                        textTransform: "uppercase",

                        cursor: "pointer",
                        padding: "0 16px",
                        paddingTop: "12px",
                        marginBottom: "0.25px",
                    }}
                >
                    {required ? <RequiredLabel label={label} /> : label}
                </FormLabel>
            }
            <FormControl
                error={Boolean(error)}
                component={Box}
                width="100%"
                sx={{
                    paddingBottom: "8px"
                }}
            >
                <Box
                    component={InputBase}
                    autoComplete="off"
                    type="text"
                    disabled={Boolean(disabled)}
                    className="nta-select-field__input-base"
                    {...(inputProps || {})}
                />
                {error &&
                    <FormHelperText>{error}</FormHelperText>
                }
            </FormControl>
        </FormGroup>
    )
}
