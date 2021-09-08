import { getFormByFVID } from "@/lib/db"
import { handle200, handle400, handle404 } from "@/lib/handler"

const handle = async (req, res) => {
    if(req.method === 'GET') {
        try {
            let fvid = req.query.fvid[0]
            if(fvid) {
                const form = await getFormByFVID(fvid)
                if(form) {
                    handle200(res, { message: form })
                } else {
                    handle404(res, { message: "Form doesn't exist" })
                }
            } else {
                handle404(res, { message: "Form doesn't exist" })
            }
        } catch (error) {
            handle400(res)
        }
    }
}

export default handle