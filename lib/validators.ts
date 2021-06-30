/*
* Helper validation functions
*/
const isString = (str) => {
    return Object.prototype.toString.call(str) === "[object String]"
}

/*
* Validated the questions array for input types, lengths and options object depending on the questionType
* return bool
*/
export const validator = (questions) => {
    let isValidated = false

    if(Array.isArray(questions)) {
        if(questions.length <= 0)
            isValidated = false
        else {
            questions.map((question) => {
                if(question.question === "" || question.question === null)
                    isValidated = false
                else {
                    if(question.questionType === "MCQ") {
                        let options = question.options
                        if(Array.isArray(options)) {
                            for(let i = 0; i < options.length; i++) {
                                if(options[i].value === "" || options[i].value === null || options[i].value === undefined) {
                                    isValidated = false
                                    break;
                                }
                                else
                                    isValidated = true
                            }
                        }
                        else
                            isValidated = false
                    }
                    if(question.questionType === "TF") {
                        let options = question.options
                        if(!Array.isArray(options) && options !== null && !isString(options)) {
                            if(options.value === "" || options.value === null || options.value === undefined) {
                                isValidated = false
                            }
                            else
                                isValidated = true
                        }
                        else
                            isValidated = false
                    }
                }
            })
        }
    }

    return isValidated
}