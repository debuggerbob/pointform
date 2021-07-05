import { getFormByCID } from "@/lib/db"
import { withAuth } from "@/middleware/withAuth"

const handle = async (req, res) => {
    if(req.method === 'GET') {
            const userId = req.query.userId[0]
            const forms = await getFormByCID(userId)
            if(forms) {
                res.status(200).json({ status: "success", data: forms })
            } else {
                res.status(404).json({ status: "error", message: "Resource Not Found!", errorType: "ResourceError" })
            }
    }
}

export default withAuth(handle)