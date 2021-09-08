import { getFormByCID } from "@/lib/db"
import { withAuth } from "@/middleware/withAuth"
import { handle200, handle400, handle404 } from "@/lib/handler"
import { arrayClipper } from "@/lib/clippers"

const handle = async (req, res) => {
    if(req.method === 'GET') {
        try {
            const userId = req.query.userId[0]
            const formsData = await getFormByCID(userId)
            const forms = arrayClipper(formsData, ['title', 'fvid', 'status', 'category', 'formType'])
            if(forms) {
                handle200(res, { message: forms })
            } else {
                handle404(res, { message: "User hasn't created any forms yet" })
            }
        } catch (error) {
            console.log(error)
            handle400(res)
        }
    }
}

export default withAuth(handle)