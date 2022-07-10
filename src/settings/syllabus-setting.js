import { renderStatus, STATUS_COLORS } from "./setting"

export const SYLLABUS_STATUSES = {
    DISABLED: -1,
    DELETED: 0,
    ACTIVE: 1,
    INACTIVE: 2,
}

export const LIST_SYLLABUS_STATUS = [
    {
        label: "Active",
        value: SYLLABUS_STATUSES.ACTIVE,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Inactive",
        value: SYLLABUS_STATUSES.INACTIVE,
        textColor: STATUS_COLORS.FINISHED.textColor,
        bgColor: STATUS_COLORS.FINISHED.bgColor
    },
    {
        label: "Disabled",
        value: SYLLABUS_STATUSES.DISABLED,
        textColor: STATUS_COLORS.DISABLED.textColor,
        bgColor: STATUS_COLORS.DISABLED.bgColor
    },
    {
        label: "Deleted",
        value: SYLLABUS_STATUSES.DELETED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_SYLLABUS_STATUS.find(item => item.value === value);
}

export const renderSyllabusStatus = (value, onClick) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject, onClick);
}

export const DURATION_OPTIONS = [
    { label: "4 weeks", value: 12 },
    { label: "8 weeks", value: 24 },
    { label: "12 weeks", value: 36 },
]