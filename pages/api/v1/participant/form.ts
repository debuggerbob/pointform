import { getFormByFVID } from "@/lib/db"
import { handle200, handle400, handle404 } from "@/lib/handler"

const handle = async (req, res) => {
    if(req.method === 'POST') {
        try {
            let form = req.body
            let fvid = form.fvid
            const exists = await getFormByFVID(fvid)
            if(exists) {
                const data = {
                    questions: exists.questions,
                    fvid: exists.fvid,
                    title: exists.title
                }
                handle200(res, { message: data })
            } else {
                handle404(res, { message: "Form doesn't exist" })
            }
        } catch (error) {
            handle400(res)
        }
    }
}

export default handle