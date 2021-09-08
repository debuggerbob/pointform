import { createForm, updateForm, deleteForm, findFormByFVID } from "@/lib/db"
import { handle200, handle400, handle404, handle409 } from "@/lib/handler"
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
            let fvid = req.body.fvid
            if(fvid) {
                let exists = await findFormByFVID(fvid)
                if(exists) {
                    handle409(res, { message: "Form already exists" })
                } else {
                    console.log(form)
                    await createForm(form)
                    handle200(res, { message: "Form has been created" })
                }
            } else {
                handle400(res, { message: "Invalid Form Fields" })
            }
        } catch (error) {
            handle400(res)
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
            let fvid = req.body.fvid
            if(fvid) {
                const exists = await findFormByFVID(fvid)
                if(!exists) {
                    handle404(res, { message: "Form does not exist" })
                } else {
                    await updateForm(fvid, form)
                    handle200(res, { message: "Form has been updated" })
                }
            } else {
                handle400(res, { message: "Invalid Form Fields" })
            }
        } catch (error) {
            handle400(res)
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
                } else {
                    await updateForm(fvid, form)
                    handle200(res, { message: "Form has been updated" })
                }
            } else {
                handle400(res, { message: "Invalid Form Fields" })
            }
        } catch (error) {
            handle400(res)
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
                } else {
                    await deleteForm(fvid)
                    handle200(res, { message: "Form has been deleted successfully!" })   
                }
            } else {
                handle400(res, { message: "Invalid Form Fields" })
            }
        } catch (error) {
            handle400(res)
        }
    }
}

export default withAuth(handle)