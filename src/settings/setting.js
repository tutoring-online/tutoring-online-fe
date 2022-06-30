import { Box, IconButton } from "@mui/material";
import { equalIgnoreCase } from "helpers/stringUtils";
import { SquareRefreshingIcon } from "nta-team/nta-icon";
import BootstrapTooltip from "nta-team/nta-tooltips/BootstrapTooltip";

export const ROLES = {
    ADMIN: "ADMIN",
    STUDENT: "STUDENT",
    TUTOR: "TUTOR"
}

export const isAdmin = (role) => {
    return equalIgnoreCase(role, ROLES.ADMIN);
}

export const isTutor = (role) => {
    return equalIgnoreCase(role, ROLES.TUTOR);
}

export const isStudent = (role) => {
    return equalIgnoreCase(role, ROLES.STUDENT);
}

export const STATUS_COLORS = {
    DISABLED: {
        textColor: "#3a3540",
        bgColor: "#e0e0e0"
    },
    ACTIVE: {
        textColor: "#229451",
        bgColor: "#e9f4ee"
    },
    PENDING: {
        textColor: "#866416",
        bgColor: "#ead186"
    },
    AVAILABLE: {
        textColor: "#1d3f7b",
        bgColor: "#c8e6ff"
    },
    CANCELED: {
        textColor: "#f0565b",
        bgColor: "#fcedea"
    },
    FINISHED: {
        textColor: "#c3b0e5",
        bgColor: "#573e7d"
    },

}


export const renderStatus = (statusObject, onClick) => {
    if (!statusObject) return null;
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="4px 8px"
            borderRadius="4px"
            width="fit-content"
            fontSize="inherit"
            fontWeight={600}
            color={statusObject.textColor}
            bgcolor={statusObject.bgColor}
        >
            {statusObject.label}
            {onClick &&
                <Box marginLeft="8px">
                    <BootstrapTooltip title="Edit">
                        <IconButton
                            sx={{
                                borderRadius: "4px",
                                padding: "2px 4px"
                            }}
                            onClick={onClick}
                        >
                            <SquareRefreshingIcon fill="#255784" />
                        </IconButton>
                    </BootstrapTooltip>
                </Box>
            }
        </Box>
    )
}


export const GENDERS = {
    male: "male",
    female: "female"
}

export const genderOptions = [
    { label: "Male", value: GENDERS.male },
    { label: "Female", value: GENDERS.female }
]

export const convertNumberToGender = (genderNumber) => {
    if (genderNumber === 1 || genderNumber === "1") return GENDERS.male;
    if (genderNumber === 0 || genderNumber === "0") return GENDERS.female;
    return null;
}

export const convertGenderToNumber = (gender) => {
    if (gender === GENDERS.male) return 1;
    if (gender === GENDERS.female) return 0;
    return null;
}

export const CRUD_MODE = {
    view: "view",
    create: "create",
    edit: "edit",
    delete: "delete"
}