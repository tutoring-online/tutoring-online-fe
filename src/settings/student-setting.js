import { renderStatus, STATUS_COLORS } from "./setting"

export const STUDENT_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    BANNED: 3,
}

export const LIST_STUDENT_STATUS = [
    {
        label: "Active",
        value: STUDENT_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Inactive",
        value: STUDENT_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
    {
        label: "Banned",
        value: STUDENT_STATUSES.BANNED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_STUDENT_STATUS.find(item => item.value === value);
}

export const renderStudentStatus = (value, onClick) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject, onClick);
}
