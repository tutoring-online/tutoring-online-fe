import { Box, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material'
import { isAvailableArray } from 'helpers/arrayUtils'
import React from 'react'

export default function RadioGroupField({
    label,
    row,
    disabled,
    options,
    inputProps
}) {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl
                variant="filled"
                component={Box}
                width="100%"
                marginBottom="1rem!important"
            >
                <RadioGroup
                    row={Boolean(row)}
                    defaultChecked={false}
                    {...(inputProps || {})}
                >
                    {isAvailableArray(options) && options.map((item) =>
                        <FormControlLabel
                            key={item.value}
                            value={item.value}
                            label={item.label}
                            control={<Radio />}
                            disabled={Boolean(disabled)}
                        />
                    )}
                </RadioGroup>
            </FormControl>
        </FormGroup>
    )
}
