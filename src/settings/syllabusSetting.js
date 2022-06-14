import { renderStatus, STATUS_COLORS } from "./setting"

export const SYLLABUS_STATUSES = {
    DISABLED: 0,
    ACTIVE: 1,
}

export const LIST_SYLLABUS_STATUS = [
    {
        label: "Disabled",
        value: SYLLABUS_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Active",
        value: SYLLABUS_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_SYLLABUS_STATUS.find(item => item.value === value);
}

export const renderSyllabusStatus = (value) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject);
}

