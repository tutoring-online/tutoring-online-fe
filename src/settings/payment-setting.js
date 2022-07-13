import { renderStatus, STATUS_COLORS } from "./setting"

export const PAYMENT_STATUSES = {
    PENDING: 1,
    PAID: 2,
    CANCELED: 3,
    ERROR: 4,
}

export const LIST_PAYMENT_STATUS = [
    {
        label: "Pending",
        value: PAYMENT_STATUSES.PENDING,
        textColor: STATUS_COLORS.PENDING.textColor,
        bgColor: STATUS_COLORS.PENDING.bgColor
    },
    {
        label: "PAID",
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

export const COMBO_OPTIONS = [
    { label: "Even days (Monday, Wednesday, Friday", value: 1 },
    { label: "Odd days (Tuesday, Thursday, Saturday", value: 2 },
]

export const DATE_SESSION_OPTIONS = [
    { label: "Morning", value: 1 },
    { label: "Afternoon", value: 2 },
    { label: "Evening", value: 3 },
]

export const DEFAULT_MAX_PRICE = 2 * 1000 * 1000;

export const SORTBY_OPTIONS = [
    { label: "Default", value: "" },
    { label: "Price: highest first", value: "-price" },
    { label: "Price: lowest first", value: "+price" },
    { label: "Created date: newest first", value: "-createdDate" },
    { label: "Created date: oldest first", value: "+createdDate" },
    { label: "Status: canceled to pending", value: "-status" },
    { label: "Status: pending to canceled", value: "+status" },
]

export const getSortByLabel = (value) => {
    const option = SORTBY_OPTIONS.find(item => item.value === value);
    return option?.label || "";
}