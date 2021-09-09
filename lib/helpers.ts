import sanitizeHtml from 'sanitize-html';

/*
* Sanitize the input with sanitizeHtml package
* return bool
*/
export const sanitizer = (inputToSanitize) => {
    let sanitizedInput = sanitizeHtml(inputToSanitize, {
        allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ]
    })

    return sanitizedInput
}

/*
* Validate if the input is a string
* return bool
*/
export const isString = (input):boolean => {
    let check = Object.prototype.toString.call(input) === "[object String]"
    return check
}

/*
* Validate if the input is a number
* return bool
*/
export const isNumber = (input):boolean => {
    let regEx = /^\d+$/
    return regEx.test(input)
}

/*
* Validate if the give input is alpha numeric
* return bool
*/
export const isAlphaNumeric = (input):boolean => {
    let regEx = /^[a-z0-9]+$/i;
    return regEx.test(input)
}

/*
* Validate if the input is an email
* return bool
*/
export const isEmail = (input):boolean => {
    let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regEx.test(input)
}

/*
* Validate if the input is a phone number
* !! - Doesn't validate depending on country code
* return bool
*/
export const isPhoneNumber = (input):boolean => {
    let regEx = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
    return regEx.test(input)
}

/*
* Validate if two inputs are same
* return bool
*/
export const isSame = (inpOne, inpTwo):boolean => {
    let check = inpOne === inpTwo
    return check
}

/*
* Validate if the give input is empty
* return bool
*/
export const isEmpty = (input):boolean => {
    let regEx = /\S+/;
    let check = regEx.test(input)
    if(input && check) {
        return false
    } else {
        return true
    }
}

/*
* Validate if the given input is not empty
* return bool
*/
export const isNotEmpty = (input):boolean => {
    return !isEmpty(input)
}

/*
* Validate if the given input is object
* return bool
*/
export const isObject = (input):boolean => {
    let check = typeof input === "object" ? true : false
    return check 
}

/*
* Validate if the given input is not object
* return bool
*/
export const isNotObject = (input):boolean => {
    return !isObject(input)
}

/*
* Validate if the given input is array
* return bool
*/
export const isArray = (input):boolean => {
    let check = Array.isArray(input) ? true : false
    return check
}

/*
* Validate if the given input is array and not empty
* return bool
*/
export const isArrayNotEmpty = (input):boolean => {
    let check = isArray(input) && input.length > 0 ? true : false
    return check
}

/*
* Validate if the given input is not array
* return bool
*/
export const isNotArray = (input):boolean => {
    return !isArray(input)
}