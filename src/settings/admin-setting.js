import { renderStatus, STATUS_COLORS } from "./setting"

export const ADMIN_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

export const LIST_ADMIN_STATUS = [
    {
        label: "Deleted",
        value: ADMIN_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
    {
        label: "Inactive",
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

export const findAdminStatus = (value) => {
    return value != null && LIST_ADMIN_STATUS.find(item => item.value === value);
}

export const renderAdminStatus = (value, onClick) => {
    const statusObject = findAdminStatus(value);
    return renderStatus(statusObject, onClick);
}

