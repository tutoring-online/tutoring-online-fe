import { Box, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import RequiredLabel from "components/Text/RequiredLabel"
import { isAvailableArray } from "helpers/arrayUtils"
import React from "react"
import { Controller } from "react-hook-form";

export default function OutlineRadioGroupField({
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
                            sx={{
                                marginLeft: "0.75rem"
                            }}
                        >
                            {isAvailableArray(options) && options.map((item) =>
                                <FormControlLabel
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                    control={<Radio size="small" />}
                                    disabled={Boolean(disabled)}
                                    sx={{
                                        borderRadius: "8px",
                                        padding: "0.5rem 0",
                                        paddingRight: "0.75rem",
                                        border: `1px solid ${field.value === "" + item.value ? "#233dd2" : "#ececec"}`,
                                    }}
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
