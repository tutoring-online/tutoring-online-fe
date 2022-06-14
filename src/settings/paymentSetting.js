import { renderStatus, STATUS_COLORS } from "./setting"

export const PAYMENT_STATUSES = {
    PENDING: 0,
    PAID: 1,
    ERROR: 2,
    CANCELED: 3,
}

export const LIST_PAYMENT_STATUS = [
    {
        label: "Pending",
        value: PAYMENT_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "Payment Completed",
        value: PAYMENT_STATUSES.PAID,
        textColor: STATUS_COLORS.ACTIVE.textColor,
        bgColor: STATUS_COLORS.ACTIVE.bgColor
    },
    {
        label: "Error",
        value: PAYMENT_STATUSES,
        textColor: STATUS_COLORS.CANCELED.textColor,
        bgColor: STATUS_COLORS.CANCELED.bgColor
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

export const renderPaymentStatus = (value) => {
    const statusObject = findStatus(value);
    return renderStatus(statusObject);
}

