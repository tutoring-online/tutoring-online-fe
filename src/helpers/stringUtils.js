

export const isString = (string) => {
    return string != null && typeof string === "string";
}

export const equalIgnoreCase = (stringOne, stringTwo) => {
    if (!isString(stringOne)) return false;
    if (!isString(stringTwo)) return false;
    return stringOne.toLowerCase() === stringTwo.toLowerCase();
}