import { renderStatus, STATUS_COLORS } from "./setting"

export const PAYMENT_STATUSES = {
    PENDING: 1,
    PAID: 2,
    ERROR: 3,
    CANCELED: 0,
}

export const LIST_PAYMENT_STATUS = [
    {
        label: "Pending",
        value: PAYMENT_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Completed",
        value: PAYMENT_STATUSES.PAID,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Error",
        value: PAYMENT_STATUSES.ERROR,
        textColor: STATUS_COLORS.DELETED.textColor,
        bgColor: STATUS_COLORS.DELETED.bgColor
    },
    {
        label: "Canceled",
        value: PAYMENT_STATUSES.CANCELED,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
    },
]

const findStatus = (value) => {
    return value != null && LIST_PAYMENT_STATUS.find(item => item.value === value);
}

export const renderPaymentStatus = (value, onClick) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject, onClick);
}

