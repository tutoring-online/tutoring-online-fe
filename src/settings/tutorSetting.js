import { renderStatus, STATUS_COLORS } from "./setting"

export const TUTOR_STATUSES = {
    DISABLED: 0,
    ACTIVE: 1,
}

export const LIST_TUTOR_STATUS = [
    {
        label: "Disabled",
        value: TUTOR_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Active",
        value: TUTOR_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_TUTOR_STATUS.find(item => item.value === value);
}

export const renderTutorStatus = (value) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject);
}

