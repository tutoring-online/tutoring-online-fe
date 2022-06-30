
export const PERCENT_PRECISION = 4;

export const isNumber = (number) => {
    return number != null && (!isNaN(number) || typeof number === "number");
}

export const toPercentPrecision = (number) => {
    return isNumber(number) ? number.toPrecision(PERCENT_PRECISION) : null;
}