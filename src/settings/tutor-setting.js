import { renderStatus, STATUS_COLORS } from "./setting"

export const TUTOR_STATUSES = {
    BANNED: -1,
    DELETED: 0,
    ACTIVE: 1,
}

export const LIST_TUTOR_STATUS = [
    {
        label: "Active",
        value: TUTOR_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Banned",
        value: TUTOR_STATUSES.BANNED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
    {
        label: "Deleted",
        value: TUTOR_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_TUTOR_STATUS.find(item => item.value === value);
}

export const renderTutorStatus = (value, onClick) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject, onClick);
}

