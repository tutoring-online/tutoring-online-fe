import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { Chip, FormControl, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { isAvailableArray } from 'helpers/arrayUtils';

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 8,
            borderBottom: `1px solid  ${theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
                }`,
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

function PopperComponent(props) {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
    anchorEl: PropTypes.any,
    disablePortal: PropTypes.bool,
    open: PropTypes.bool.isRequired,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
        }`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
        }`,
    '& input': {
        height:"30px",
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: "4px 8px",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `0px 0px 0px 3px ${theme.palette.mode === 'light'
                ? 'rgba(3, 102, 214, 0.3)'
                : 'rgb(12, 45, 107)'
                }`,
            borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
        },
    },
}));

const defaultRenderOption = (props, option) => {
    if (typeof option === "string") {
        return <li {...props} key={option}>
            {option}
        </li>
    }
    return (
        <li {...props} key={option.value}>
            {option.label}
        </li>
    );
}

export default function NTAChipSelectField({
    label,
    options,
    name,
    control,
    error,
    renderOption = defaultRenderOption
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const getValueOption = (value) => {
        if (value == null) return null;
        if (!isAvailableArray(options)) return { label: value, value };
        return options.find(item => item.value === value) || { label: value, value };
    }

    const handleClose = () => {
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;

    return (
        <React.Fragment>
            <Chip
                label={label}
                component="button"
                type="button"
                onClick={handleClick}
                deleteIcon={<KeyboardArrowDownIcon/>}
                onDelete={handleClick}
            />

            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
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
                                    open
                                    onClose={handleClose}

                                    disableCloseOnSelect
                                    PopperComponent={PopperComponent}
                                    renderOption={renderOption}
                                    options={options}
                                    renderInput={(params) => (
                                        <StyledInput
                                            ref={params.InputProps.ref}
                                            inputProps={params.inputProps}
                                            autoFocus
                                            placeholder="Search"
                                        />
                                    )}

                                    {...field}
                                    value={getValueOption(field.value)}
                                    onChange={(e, selectedOption) => {
                                        const newValue = selectedOption != null ? selectedOption.value : null;
                                        field.onChange({ target: { value: newValue } });
                                    }}
                                />
                            )}
                            name={name}
                            control={control}
                        />
                        {error &&
                            <FormHelperText>{error}</FormHelperText>
                        }
                    </FormControl>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    );
}