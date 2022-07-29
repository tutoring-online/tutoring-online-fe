import * as yup from 'yup'

const REGEX_ONLY_NUMBER = /^\d+$/

yup.addMethod(yup.string, 'onlyNumber', function (
    message,
) {
    //this is yup.string()
    return this.matches(REGEX_ONLY_NUMBER, {
        message,
        excludeEmptyString: true,
    })
});

export default yup;