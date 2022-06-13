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