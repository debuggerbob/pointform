import { getFormByFVID } from "@/lib/db"
import { handle200, handle400, handle404 } from "@/lib/handler"
import { sanitizer } from "@/lib/helpers"

const handle = async (req, res) => {
    if(req.method === 'GET') {
        try {
            let fvid = req.query.fvid[0]

            fvid = sanitizer(fvid)

            if(fvid) {
                const form = await getFormByFVID(fvid)
                if(form) {
                    handle200(res, { message: form })
                    return
                } else {
                    handle404(res, { message: "Form doesn't exist" })
                    return
                }
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