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
        textColor: "#2e624b",
        bgColor: "#d4ecda"
    },
    PENDING: {
        textColor:"#927722",
        bgColor: "#ebd282"
    },
    AVAILABLE: {
        textColor: "",
        bgColor: ""
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