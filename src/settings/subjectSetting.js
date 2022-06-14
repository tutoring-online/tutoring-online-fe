import { renderStatus, STATUS_COLORS } from "./setting"

export const SUBJECT_STATUSES = {
    DISABLED: 0,
    ACTIVE: 1,
    INACTIVE: 2,
}

export const LIST_SUBJECT_STATUS = [
    {
        label: "Disabled",
        value: SUBJECT_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Active",
        value: SUBJECT_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Inactive",
        value: SUBJECT_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.CANCELED.textColor,
        bgColor: STATUS_COLORS.CANCELED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_SUBJECT_STATUS.find(item => item.value === value);
}

export const renderSubjectStatus = (value) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject);
}

