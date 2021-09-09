import { isString, isEmpty, isNotEmpty, isNotObject, isArrayNotEmpty, isArray, isObject, isNotArray, sanitizer } from "@/lib/helpers"
import { QUESTION_TYPES } from "@/lib/constants"

/*
* AlphaValidator
*   - Empty and Type checks
* @params - form (Object)
* return Object
*/
export const alphaValidator = (form) => {
    
    let fvid = form.fvid
    let title = form.title
    let category = form.category
    let userId = form.userId
    
    let resp = {
        validated: false,
        form
    }

    if(isNotObject(form)) {
        return resp
    }
    if(isEmpty(fvid)) {
        return resp
    }
    if(isEmpty(title)) {
        return resp
    }
    if(isEmpty(category)) {
        return resp
    }
    if(isEmpty(userId)) {
        return resp
    }

    resp['validated'] = true
    return resp
}

/*
* BetaValidator
*   - Dynamic form object check
* @params - form (Object)
* return Object
*/
export const betaValidator = (form) => {
    let resp = {
        validated: false,
        form
    }
    let questions = form.questions
    let l = 0
    
    if(isArrayNotEmpty(questions)) {
        questions.forEach(question => {
            if(isNotEmpty(question)) {
                let checked = validateQuestionByType(question)
                if(checked) {
                    l++
                }
            }
        })
    }

    if(l === questions.length)
        resp['validated'] = true

    return resp
}

/*
* validateQuestionByType
*   - Actual question type validation happens here
* @params - question (Object)
* return Object
*/
const validateQuestionByType = (question) => {
	let isValidated = false
    let questionType = question.questionType

    if(questionType === QUESTION_TYPES.MCQ) {
        let options = question.options

        if(isArray(options) && isArrayNotEmpty(options)) {
            options.forEach(option => {
                let optionValues = Object.values(option)
                if(isNotEmpty(optionValues[0])) {
                    isValidated = true
                } else {
                    isValidated = false
                }
            })
        }
    }

    if(questionType === QUESTION_TYPES.TF) {
        let options = question.options
        if(isNotArray(options) && isObject(options)) {
			isValidated = true
        }
    }

    return isValidated
}