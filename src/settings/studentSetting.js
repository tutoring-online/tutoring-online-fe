import { renderStatus, STATUS_COLORS } from "./setting"

export const STUDENT_STATUSES = {
    DISABLED: 0,
    ACTIVE: 1,
}

export const LIST_STUDENT_STATUS = [
    {
        label: "Disabled",
        value: STUDENT_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Active",
        value: STUDENT_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_STUDENT_STATUS.find(item => item.value === value);
}

export const renderStudentStatus = (value) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject);
}

