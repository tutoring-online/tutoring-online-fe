import { renderStatus, STATUS_COLORS } from "./setting"

export const TUTOR_SUBJECT_STATUSES = {
    ACTIVE: 1,
    DELETED: 3,
}

export const LIST_TUTOR_SUBJECT_STATUS = [
    {
        label: "Active",
        value: TUTOR_SUBJECT_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Deleted",
        value: TUTOR_SUBJECT_STATUSES.DELETED,
        textColor: STATUS_COLORS.BANNED.textColor,
        bgColor: STATUS_COLORS.BANNED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_TUTOR_SUBJECT_STATUS.find(item => item.value === value);
}

export const renderTutorStatus = (value, onClick) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject, onClick);
}

