import moment from 'moment';

export const dateFormat = 'DD/MM/YYYY';
export const iso8601Format = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';
export const datetimeFormat = 'DD/MM/YYYY HH:mm:ss';
export const datetimeFormatV2 = 'DD-MM-YYYY HH:mm:ss';
export const datetimeFormatReverseDate = 'YYYY-MM-DD HH:mm:ss';

const notMillisecond = (date) => {
    const isNumberOnly = (value) => /^[0-9]*$/.test(value);
    return !isNumberOnly(date);
}

export const validDate = (date) => {
    if (date == null) return false;

    if (typeof date === "string") {
        return notMillisecond(date) && (
            moment(date, dateFormat, true).isValid() ||
            moment(date, datetimeFormat, true).isValid() ||
            moment(date, datetimeFormatV2, true).isValid() ||
            moment(date, datetimeFormatReverseDate, true).isValid() ||
            moment(date, iso8601Format, true).isValid() ||
            moment(date, "MM/DD/YYYY", true).isValid()
        );
    }

    if (date instanceof Date) {
        return !isNaN(date);
    }

    return false;
}

export const formatDate = (date, format = dateFormat) => date ? moment(date).format(format) : 'N/A';

export const formatLocalDate = (date, format = dateFormat) => date ? moment(date).local().format(format) : 'N/A';

export const formatDateTime = (date, format = datetimeFormat, invalidStr = 'N/A') => {
    return validDate(date) ? moment(new Date()).format(format) : invalidStr;
}

export const formatLocalDateTime = (date, format = datetimeFormat, invalidStr = 'N/A') => date ? moment(date).local().format(format) : invalidStr;

export const toISO = (date) => moment(date).utc().format(iso8601Format);

export const currentDate = (format = dateFormat) => moment().format(format);

export const sub = (type = 'days', day, format = dateFormat) => moment().subtract(day, type).format(format);
export const add = (type = 'days', day, format = dateFormat) => moment().add(day, type).format(format);

export const rangeDate = (firstDaysAgo, secondDaysAgo) => [
    sub('days', firstDaysAgo),
    sub('days', secondDaysAgo)
];

export const rangeNextDate = (firstDaysAgo, secondDaysAgo) => [
    add('days', firstDaysAgo),
    add('days', secondDaysAgo)
];

export const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
export const lastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const rangeLastMonth = () => [
    moment().subtract(1, 'months').startOf('month').format(dateFormat),
    moment().subtract(1, 'months').endOf('month').format(dateFormat),
];

export const rangeNextMonth = () => [
    moment().add(1, 'months').startOf('month').format(dateFormat),
    moment().add(1, 'months').endOf('month').format(dateFormat),
];

export const rangeCurrentMonth = () => [
    moment().startOf('month').format(dateFormat),
    currentDate()
];

export const rangeFullDaysCurrentMonth = () => [
    moment().startOf('month').format(dateFormat),
    moment().endOf('month').format(dateFormat),
];

// export const menuFilter = [
//     {
//         label: 'Hôm nay',
//         radioValue: 'today',
//         value: [currentDate()]
//     },
//     {
//         label: 'Hôm qua',
//         radioValue: 'yesterday',
//         value: [sub('days', 1)]
//     },
//     {
//         label: '7 ngày vừa qua',
//         radioValue: 'last7days',
//         value: rangeDate(7, 0)
//     },
//     {
//         label: '30 ngày vừa qua',
//         radioValue: 'last30days',
//         value: rangeDate(30, 0)
//     },
//     {
//         label: 'Tháng này',
//         radioValue: 'currentMonth',
//         value: rangeCurrentMonth()
//     },
//     {
//         label: 'Tháng trước',
//         radioValue: 'lastMonth',
//         value: rangeLastMonth()
//     },
// ];

// export const menuFilterLoanPayment = [
//     {
//         label: 'Hôm nay',
//         radioValue: 'today',
//         value: [currentDate()]
//     },
//     {
//         label: 'Ngày mai',
//         radioValue: 'tomorrow',
//         value: [add('days', 1)]
//     },
//     {
//         label: '7 ngày tới',
//         radioValue: 'next7days',
//         value: rangeNextDate(7, 0)
//     },
//     {
//         label: '30 ngày tới',
//         radioValue: 'next30days',
//         value: rangeNextDate(30, 0)
//     },
//     {
//         label: 'Tháng này',
//         radioValue: 'currentMonth',
//         value: rangeFullDaysCurrentMonth()
//     },
//     {
//         label: 'Tháng sau',
//         radioValue: 'nextMonth',
//         value: rangeNextMonth()
//     },
// ];
