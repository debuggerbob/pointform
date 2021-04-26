import { getQuizByCID } from "@/lib/db"
import { withAuth } from "@/middleware/withAuth"

const handle = async (req, res) => {
    if(req.method === 'GET') {
            const cid = req.query.userId[0]
            const quizzes = await getQuizByCID(cid)
            if(quizzes) {
                res.status(200).json({ status: "success", data: quizzes })
            } else {
                res.status(404).json({ status: "error", message: "Resource Not Found!", errorType: "ResourceError" })
            }
    }
}

export default withAuth(handle)