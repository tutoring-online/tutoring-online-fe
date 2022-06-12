export const ROLES = {
    ADMIN: "ADMIN",
    STUDENT: "STUDENT",
    TUTOR: "TUTOR"
}

export const isAdmin = (role) => {
    return role && role === ROLES.ADMIN;
}

export const isTutor = (role) => {
    return role && role === ROLES.TUTOR;
}

export const isStudent = (role) => {
    return role && role === ROLES.STUDENT;
}