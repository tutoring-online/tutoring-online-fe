import React, { useState } from 'react'
import { Box, ClickAwayListener, FormControl, FormGroup, FormHelperText, FormLabel, Popper, Slider } from '@mui/material'
import RequiredLabel from 'components/Text/RequiredLabel';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { isAvailableArray } from 'helpers/arrayUtils';

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

const defaultRenderValueText = (value) => {
    return value;
}

const defaultRenderDisplayRange = (value) => {
    if (!isAvailableArray(value)) return;
    const [from, to] = value;
    return `${from || 0} - ${to || 0}`;
}

export default function NTARangeField({
    min = 0,
    max = 100,
    label,
    required,
    name,
    control,
    error,
    getAriaValueText = defaultRenderValueText,
    renderDisplayRange = defaultRenderDisplayRange
}) {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

    const handleClosePopper = () => {
        setOpen(false);
    }

    const handleOpenPopper = () => {
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

                    cursor: "pointer",
                    padding: "0 16px",
                    paddingTop: "12px",
                    marginBottom: "0.25px",
                }}
                onClick={handleOpenPopper}
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
                onClick={handleOpenPopper}
            >
                <Controller
                    render={({ field }) => (
                        <>
                            <Box
                                display="inline-block"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                fontSize="14px"

                                width="10px"
                                height="24px"
                                padding="0 16px"
                                minWidth="100%"
                                tabIndex="0"
                                border="none"
                                sx={{
                                    cursor: "pointer",
                                    outline: "none"
                                }}

                                ref={ref}
                                onFocus={handleOpenPopper}
                                onClick={handleOpenPopper}
                            >
                                {renderDisplayRange(field.value)}
                            </Box>
                            {open &&
                                <ClickAwayListener onClickAway={handleClosePopper}>
                                    <StyledPopper
                                        open={open}
                                        anchorEl={ref.current}
                                    >
                                        <Box
                                            width={ref.current?.offsetWidth || 300}
                                            padding="0.5rem 1rem"
                                        >
                                            <Slider
                                                {...field}
                                                max={max}
                                                min={min}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={getAriaValueText}
                                            />
                                        </Box>
                                    </StyledPopper>
                                </ClickAwayListener>
                            }
                        </>
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
