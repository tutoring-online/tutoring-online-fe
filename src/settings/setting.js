import { Box } from "@mui/material";
import { equalIgnoreCase } from "helpers/stringUtils";

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
        bgColor: "#d7d9db"
    },
    ACTIVE: {
        textColor: "#3e5e30",
        bgColor: "#d2edda"
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
        textColor: "#7c2f3d",
        bgColor: "#f7c6cc"
    },
    FINISHED: {
        textColor: "#c3b0e5",
        bgColor: "#573e7d"
    },

}


export const renderStatus = (statusObject) => {
    if (!statusObject) return null;
    return (
        <Box
            component="div"
            display="inline-block"
            padding="4px 8px"
            borderRadius={1}

            fontSize="inherit"
            fontWeight={600}
            color={statusObject.textColor}
            bgcolor={statusObject.bgColor}
        >
            {statusObject.label}
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