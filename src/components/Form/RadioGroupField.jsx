import { Box, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import RequiredLabel from "components/Text/RequiredLabel"
import { isAvailableArray } from "helpers/arrayUtils"
import React from "react"
import { Controller } from "react-hook-form";

export default function RadioGroupField({
    label,
    name,
    row,
    disabled,
    options,
    required,
    error,
    control
}) {
    return (
        <FormGroup>
            <FormLabel>
                {required ? <RequiredLabel label={label} /> : label}
            </FormLabel>
            <FormControl
                error={Boolean(error)}
                component={Box}
                variant="filled"
                width="100%"
            >
                <Controller
                    render={({ field }) => (
                        <RadioGroup
                            row={Boolean(row)}
                            {...field}
                            value={field.value || null}
                        >
                            {isAvailableArray(options) && options.map((item) =>
                                <FormControlLabel
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                    control={<Radio size="small" />}
                                    disabled={Boolean(disabled)}
                                />
                            )}
                        </RadioGroup>

                    )}
                    name={name}
                    control={control}
                />
                {error &&
                    <FormHelperText>{error}</FormHelperText>
                }
            </FormControl>
        </FormGroup>
    )
}
