/*
* Parent Helper Class contains all the helper methods
* !! - Uses basic regex comparision
*/

interface Checkable {  
    isString(input): boolean
    isNumber(input): boolean
    isAlphaNumeric(input): boolean
    isEmail(input): boolean
    isPhoneNumber(input): boolean
    isSame(inputOne, inputTwo): boolean
    isEmpty(input): boolean
}

export default class Helper implements Checkable {
    /*
    * Validate if the input is a string
    * return bool
    */
    public isString = (input) => {
        let check = Object.prototype.toString.call(input) === "[object String]"
        return check
    }
    
    /*
    * Validate if the input is a number
    * return bool
    */
    public isNumber = (input) => {
        let regEx = /^\d+$/
        return regEx.test(input)
    }


    /*
    * Validate if the give input is alpha numeric
    * return bool
    */
    public isAlphaNumeric = (input) => {
        let regEx = /^[a-z0-9]+$/i;
        return regEx.test(input)
    }


    /*
    * Validate if the input is an email
    * return bool
    */
    public isEmail = (input) => {
        let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regEx.test(input)
    }

    /*
    * Validate if the input is a phone number
    * !! - Doesn't validate depending on country code
    * return bool
    */
    public isPhoneNumber = (input) => {
        let regEx = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/
        return regEx.test(input)
    }


    /*
    * Validate if two inputs are same
    * return bool
    */
    public isSame = (inpOne, inpTwo) => {
        let check = inpOne === inpTwo
        return check
    }


    /*
    * Validate if the give input is empty
    * return bool
    */
    public isEmpty = (input) => {
        let regEx = /\S+/;
        return regEx.test(input)
    }
}