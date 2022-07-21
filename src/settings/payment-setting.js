import Combo from "components/Combo/Combo";
import { ComboItem } from "components/Combo/Combo";
import { convertBeDateToIso } from "helpers/dateUtils";
import { validDate } from "helpers/dateUtils";
import { removeOffsetTimeZone } from "helpers/dateUtils";
import { isNumberOnly } from "helpers/dateUtils";
import { renderStatus, STATUS_COLORS } from "./setting"

export const PAYMENT_STATUSES = {
    PENDING: 1,
    PAID: 2,
    CANCELED: 3,
    ERROR: 4,
    ONGOING: 5,
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
        label: "On going",
        value: PAYMENT_STATUSES.ONGOING,
        textColor: STATUS_COLORS.AVAILABLE.textColor,
        bgColor: STATUS_COLORS.AVAILABLE.bgColor
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
        textColor: STATUS_COLORS.CANCELED.textColor,
        bgColor: STATUS_COLORS.CANCELED.bgColor
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
    {
        label: (
            <Combo
                list={["Monday", "Wednesday", "Friday"]}
            />
        ),
        value: 1,
        text: "Even days (Monday, Wednesday, Friday)", 
    },
    {
        label: (
            <Combo
                list={["Tuesday", "Thursday", "Saturday"]}
            />
        ),
        value: 2,
        text: "Odd days (Tuesday, Thursday, Saturday)", 
    },
]

export const DATE_SESSION_OPTIONS = [
    {
        label: <ComboItem content="Morning (8h - 11h)" />,
        text: "Morning (8h - 11h)",
        value: 1,
        startHour: 8,
        endHour: 11
    },
    {
        label: <ComboItem content="Afternoon (13h - 16h)" />,
        text: "Afternoon (13h - 16h)",
        value: 2,
        startHour: 13,
        endHour: 16
    },
    {
        label: <ComboItem content="Evening (19h - 22h)" />,
        text: "Evening (19h - 22h)",
        value: 3,
        startHour: 19,
        endHour: 22
    },
]

const getDateSessionObject = (value) => {
    const theValue = isNumberOnly(value) ? Number.parseInt(value) : value;
    return DATE_SESSION_OPTIONS.find(item => item.value === theValue) || null;
}

const prepareDate = (date) => {
    if(!validDate(date)) return null;
    if(new Date(date) == "Invalid Date") {
        return removeOffsetTimeZone(new Date(convertBeDateToIso(date)));
    }
    return removeOffsetTimeZone(new Date(date));
}

export const getLessonStartDate = (date, dateSession) => {
    const dateSessionObject = getDateSessionObject(dateSession);
    if (!dateSessionObject) return null;
    
    const startDate = prepareDate(date);
    if(!startDate) return null;
    
    startDate.setHours(dateSessionObject.startHour);
    return startDate;
}

export const getLessonEndDate = (date, dateSession) => {
    const dateSessionObject = getDateSessionObject(dateSession);
    if (!dateSessionObject) return null;
    
    const endDate = prepareDate(date);
    if(!endDate) return null;
    
    endDate.setHours(dateSessionObject.endHour);
    return endDate;
}

export const DEFAULT_MAX_PRICE = 2 * 1000 * 1000;

export const SORTBY_OPTIONS = [
    { label: "Default", value: "" },
    { label: "Created date: newest first", value: "-createdDate" },
    { label: "Created date: oldest first", value: "+createdDate" },
]

export const getSortByLabel = (value) => {
    const option = SORTBY_OPTIONS.find(item => item.value === value);
    return option?.label || "";
}

export const getComboLabel = (value) => {
    const option = COMBO_OPTIONS.find(item => item.value === value);
    return option?.label || "";
}

export const getDateSessionLabel = (value) => {
    const option = DATE_SESSION_OPTIONS.find(item => item.value === value);
    return option?.label || "";
}