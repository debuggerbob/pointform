import { createForm, updateForm, deleteForm, findFormByFVID } from "@/lib/db"
import { handle200, handle400, handle404, handle409 } from "@/lib/handler"
import { alphaValidator, betaValidator } from "@/lib/validators"
import { safayi } from "@/lib/sanitizers"
import { withAuth } from "@/middleware/withAuth"

const handle = async (req, res) => {
    /*
    POST Request || Create a New Form
    - Before the form object is used, it must be validated for required fields and strict types
    - After Fields and Type Validation
        1. check if form exists with the specified fvid
        2. if yes - handle409()
        3. if no - call createForm() by passing form object into it
        4. if successful - handle200()
        5. else - handle400()
    */
    if(req.method === 'POST') {
        try {
            let form = req.body
            // Initial Object Sanitization
            form = safayi(form)
            // Alpha Validation
            let alphaResponse = await alphaValidator(form)
            if(alphaResponse.validated) {
                let finalForm = alphaResponse.form
                // Primary Object Sanitization
                finalForm = safayi(finalForm)
                let fvid = finalForm.fvid
                let formExists = await findFormByFVID(fvid)
                if(formExists) {
                    handle409(res, { message: "Form already exists" })
                    return
                } else {
                    await createForm(finalForm)
                    handle200(res, { message: "Form has been created" })
                }
            }

            handle400(res, { message: "Invalid Form Fields" })
            return
        } catch (error) {
            handle400(res)
            return
        }
    }


    /*
    PATCH Request || Update a Form
    - Before the form object is used, it must be validated for required fields and strict types
    - After Fields and Type Validation
        1. check if form exists with the specified fvid
        2. if yes - call updateForm() by passing form object to it
        3. if no - call handle404()
        4. if successful - handle200()
        5. else - handle400()
    */
    if(req.method === 'PATCH') {
        try {
            let form = req.body
            // Initial Object Sanitization
            form = safayi(form)
            // Alpha Validation
            let alphaResponse = await alphaValidator(form)
            if(alphaResponse.validated) {
                let finalForm = alphaResponse.form
                // Primary Object Sanitization
                finalForm = safayi(finalForm)
                let fvid = finalForm.fvid
                let formExists = await findFormByFVID(fvid)
                // Beta Validation
                let betaResponse = betaValidator(finalForm)
                if(formExists) {
                    await updateForm(fvid, form)
                    handle200(res, { message: "Form has been updated" })
                    return
                } else {
                    handle404(res, { message: "Form doesn't exist" })
                    return
                }
            } 
            handle400(res, { message: "Invalid Form Fields" })
            return
        } catch (error) {
            handle400(res)
            return
        }
    }

    /*
    PUT Request || Update a Form
    - Before the form object is used, it must be validated for required fields and strict types
    - After Fields and Type Validation
        1. check if form exists with the specified fvid
        2. if yes - call updateForm() by passing form object to it
        3. if no - call handle404()
        4. if successful - handle200()
        5. else - handle400()
    */
    if(req.method === 'PUT') {
        try {
            let form = req.body
            let fvid = req.body.fvid
            if(fvid) {
                const exists = await findFormByFVID(fvid)
                if(!exists) {
                    handle404(res, { message: "Form does not exist" })
                    return
                } else {
                    await updateForm(fvid, form)
                    handle200(res, { message: "Form has been updated" })
                    return
                }
            } else {
                handle400(res, { message: "Invalid Form Fields" })
                return
            }
        } catch (error) {
            handle400(res)
            return
        }
    }

    /*
    Delete Request || Delete a Form
        1. check if form exists with the specified fvid
        2. if yes - call deleteForm() by passing form object to it
        3. if no - call handle404()
        4. if successful - handle200()
        5. else - handle400()
    */
    if(req.method === 'DELETE') {
        try {
            let fvid = req.body.fvid
            if(fvid) {
                const exists = await findFormByFVID(fvid)
                if(!exists) {
                    handle404(res, { message: "Form does not exist" })
                    return
                } else {
                    await deleteForm(fvid)
                    handle200(res, { message: "Form has been deleted successfully!" }) 
                    return  
                }
            } else {
                handle400(res, { message: "Invalid Form Fields" })
                return
            }
        } catch (error) {
            handle400(res)
            return
        }
    }
}

export default (handle)