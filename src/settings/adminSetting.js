import { renderStatus, STATUS_COLORS } from "./setting"

export const ADMIN_STATUSES = {
    DISABLED: 0,
    ACTIVE: 1,
}

export const LIST_ADMIN_STATUS = [
    {
        label: "Disabled",
        value: ADMIN_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Active",
        value: ADMIN_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_ADMIN_STATUS.find(item => item.value === value);
}

export const renderAdminStatus = (value) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject);
}

