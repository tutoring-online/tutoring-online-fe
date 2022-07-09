import React, { useState } from 'react'
import { Autocomplete, Box, FormControl, FormGroup, FormHelperText, FormLabel, Popper, TextField } from '@mui/material'
import RequiredLabel from 'components/Text/RequiredLabel';
import { Controller } from 'react-hook-form';
import { isAvailableArray } from 'helpers/arrayUtils';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { useEffect } from 'react';

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: "8px 16px",
            color: "#525f7f",
            "&:not(:last-child)": {
                borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'}`,
            },
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
            {
                backgroundColor: theme.palette.action.hover,
            },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
        }`,
    borderRadius: 6,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

function PopperComponent(props) {
    const { disablePortal, anchorEl, open, ...other } = props;

    return <StyledPopper anchorEl={anchorEl} open={open} disablePortal={disablePortal}>
        <StyledAutocompletePopper {...other} />
    </StyledPopper>
}

export default function NTASelectField({
    label,
    required,
    disabled,
    inputProps,
    options,
    name,
    control,
    error,
}) {
    const inputElm = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(open !== true) return;
        inputElm.current && inputElm.current.focus();
    }, [open])

    const getValueOption = (value) => {
        if (value == null) return null;
        if (!isAvailableArray(options)) return { label: value, value };
        return options.find(item => item.value === value) || { label: value, value };
    }

    const handleOnClickLabel = () => {
        setOpen(true);
    }

    return (
        <FormGroup
            className="nta-select-field"
        >
            <FormLabel
                sx={{
                    color: "#8898aa",
                    fontWeight: 400,
                    fontSize: "11px",
                    letterSpacing: "0.75px",
                    textTransform: "uppercase",
                    marginBottom: "0.25px",
                    padding: "0 16px",
                    paddingTop: "12px"
                }}
                onClick={handleOnClickLabel}
            >
                {required ? <RequiredLabel label={label} /> : label}
            </FormLabel>
            <FormControl
                error={Boolean(error)}
                component={Box}
                width="100%"
                sx={{
                    paddingBottom: "8px"
                }}
            >
                <Controller
                    render={({ field }) => (
                        <Autocomplete
                            open={open}
                            onFocus={() => setOpen(true)}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}

                            size="small"
                            className="nta-select-field__autocomplete"

                            blurOnSelect
                            handleHomeEndKeys={false}
                            options={options}
                            PopperComponent={PopperComponent}
                            disabled={Boolean(disabled)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    inputRef={inputElm}
                                    variant="filled"
                                    className="select-field-filledInput"
                                    style={{
                                        border: "none !important",
                                        borderRadius: "0 !important",
                                        boxShadow: "none !important",
                                    }}
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
