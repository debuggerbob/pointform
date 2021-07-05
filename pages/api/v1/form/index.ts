import { validateForm, createForm, updateForm, deleteForm, findFormByFVID } from "@/lib/db"
import { withAuth } from "@/middleware/withAuth"

const handle = async (req, res) => {
    if(req.method === 'POST') {
        try {
            let form = req.body
            let fvid = req.body.fvid
            const exists = await findFormByFVID(fvid)
            if(exists) {
                res.status(400).json({ status: "error", message: "Form already exists", errorType: "ResourceError" })
            } else {
                await createForm(form)
                res.status(200).json({ status: "success", message: "Form has been created successfully!" })   
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    if(req.method === 'PATCH') {
        try {
            let form = req.body
            let fvid = req.body.fvid
            const exists = await findFormByFVID(fvid)
            if(!exists) {
                res.status(400).json({ status: "error", message: "Form does not exist", errorType: "ResourceError" })
            } else {
                await updateForm(fvid, form)
                res.status(200).json({ status: "success", message: "Form has been updated successfully!" })   
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
    
    if(req.method === 'PUT') {
        try {
            let form = req.body
            let fvid = req.body.fvid
            const exists = await findFormByFVID(fvid)
            if(!exists) {
                res.status(400).json({ status: "error", message: "Form does not exist", errorType: "ResourceError" })
            } else {
                await updateForm(fvid, form)
                res.status(200).json({ status: "success", message: "Form has been updated successfully!" })   
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    if(req.method === 'DELETE') {
        try {
            let fvid = req.body.fvid
            const exists = await findFormByFVID(fvid)
            if(!exists) {
                res.status(400).json({ status: "error", message: "Form does not exist", errorType: "ResourceError" })
            } else {
                await deleteForm(fvid)
                res.status(200).json({ status: "success", message: "Form has been deleted successfully!" })   
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export const config = {
    api: {
      externalResolver: true,
    },
}

export default validateForm(withAuth(handle))
