import { getFormByFVID } from "@/lib/db"
import { handle200, handle400, handle404 } from "@/lib/handler"
import { arrayClipper } from "@/lib/clippers"
import { sanitizer } from "@/lib/helpers"

const handle = async (req, res) => {
    if(req.method === 'POST') {
        try {
            let form = req.body
            let fvid = sanitizer(form.fvid)
            const formData = await getFormByFVID(fvid)
            if(formData) {
                const form = arrayClipper(formData, ['questions', 'fvid', 'title'])
                handle200(res, { message: form })
                return
            } else {
                handle404(res, { message: "Form doesn't exist" })
                return
            }
        } catch (error) {
            handle400(res)
            return
        }
    }
}

export default handle