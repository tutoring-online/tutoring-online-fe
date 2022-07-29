
export const PERCENT_PRECISION = 4;

export const isNumber = (number) => {
    return number != null && (!isNaN(number) || typeof number === "number");
}

export const toPercentPrecision = (number) => {
    return isNumber(number) ? number.toPrecision(PERCENT_PRECISION) : null;
}

export const calculatePercentToFix = (number1, number2, fix = 2) => {
    if(number1 === 0 || number1 === "0") {
        return "0";
    }

    const result = isNumber(number1) && isNumber(number2) ?
        (number1 / number2 * 100).toFixed(fix) : null;
        
    if(result != null && result.endsWith(".00")) {
        return result.replace(".00", "");
    }
    return result + "";
}