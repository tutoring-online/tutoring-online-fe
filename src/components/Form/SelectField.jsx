import React, { useState } from 'react'
import { Autocomplete, Box, FormControl, FormGroup, FormHelperText, FormLabel, TextField } from '@mui/material'
import RequiredLabel from 'components/Text/RequiredLabel';
import { Controller } from 'react-hook-form';
import { isAvailableArray } from 'helpers/arrayUtils';

// const defaultRenderCurrentValue = (value, options) => {
// 	if (!value) return "";
// 	if (!options) return value;
// 	return options.find(option => option.value === value)?.label || value;
// }

export default function SelectField({
    label,
    required,
    disabled,
    inputProps,
    options,
    name,
    control,
    error
}) {
    const [open, setOpen] = useState(false);

    const getValueOption = (value) => {
        if (value == null) return null;
        if (!isAvailableArray(options)) return { label: value, value };
        return options.find(item => item.value === value) || { label: value, value };
    }

    return (
        <FormGroup
            sx={{
                width:"100%"
            }}
        >
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
                <Controller
                    render={({ field }) => (
                        <Autocomplete
                            open={open}
                            onFocus={() => setOpen(true)}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}

                            size="small"

                            options={options}
                            disabled={Boolean(disabled)}
                            renderInput={(params) => (
                                <TextField
                                    variant="filled"
                                    className="select-field-filledInput"
                                    placeholder={inputProps?.placeholder}
                                    {...params}
                                />
                            )}
                            {...field}
                            value={getValueOption(field.value)}
                            onChange={(e, selectedOption) => {
                                const newValue = selectedOption != null ? selectedOption.value : null;
                                field.onChange({ target: { value: newValue } });
                            }}
                            {...(inputProps || {})}
                        />
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
