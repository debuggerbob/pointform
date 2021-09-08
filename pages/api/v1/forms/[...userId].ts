import { getFormByCID } from "@/lib/db"
import { withAuth } from "@/middleware/withAuth"
import { handle200, handle400, handle404 } from "@/lib/handler"

const handle = async (req, res) => {
    if(req.method === 'GET') {
        try {
            const userId = req.query.userId[0]
            const forms = await getFormByCID(userId)
            if(forms) {
                handle200(res, { message: forms })
            } else {
                handle404(res, { message: "User hasn't created any forms yet" })
            }
        } catch (error) {
            handle400(res)
        }
    }
}

export default withAuth(handle)