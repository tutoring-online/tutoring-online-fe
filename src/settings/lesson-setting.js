import { renderStatus, STATUS_COLORS } from "./setting"

export const LESSON_STATUSES = {
    PENDING: 1,
    FINISHED: 2,
    CANCELED: 3
}

export const LIST_LESSON_STATUS = [
    {
        label: "Active",
        value: LESSON_STATUSES.PENDING,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Finished",
        value: LESSON_STATUSES.FINISHED,
        textColor: STATUS_COLORS.FINISHED.textColor,
        bgColor: STATUS_COLORS.FINISHED.bgColor
    },
    {
        label: "Canceled",
        value: LESSON_STATUSES.CANCELED,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_LESSON_STATUS.find(item => item.value === value);
}

export const renderLessonStatus = (value, onClick) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject, onClick);
}

