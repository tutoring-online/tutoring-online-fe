import { renderStatus, STATUS_COLORS } from "./setting"

export const CATEGORY_STATUSES = {
    DISABLED: -1,
    DELETED: 0,
    ACTIVE: 1,
    INACTIVE: 2,
}

export const LIST_CATEGORY_STATUS = [
    {
        label: "Disabled",
        value: CATEGORY_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Deleted",
        value: CATEGORY_STATUSES.DELETED,
        textColor: STATUS_COLORS.CANCELED.textColor,
        bgColor: STATUS_COLORS.CANCELED.bgColor
    },
    {
        label: "Active",
        value: CATEGORY_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Inactive",
        value: CATEGORY_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.FINISHED.textColor,
        bgColor: STATUS_COLORS.FINISHED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_CATEGORY_STATUS.find(item => item.value === value);
}

export const renderCategoryStatus = (value) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject);
}

