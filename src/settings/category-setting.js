import { renderStatus, STATUS_COLORS } from "./setting"

export const CATEGORY_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
}

export const LIST_CATEGORY_STATUS = [
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
    {
        label: "Deleted",
        value: CATEGORY_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_CATEGORY_STATUS.find(item => item.value === value);
}

export const renderCategoryStatus = (value, onClick) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject, onClick);
}

