import { getQuizByQVID } from "@/lib/db"

const handle = async (req, res) => {
    if(req.method === 'GET') {
        try {
            let qvid = req.query.qvid[0]
            const quiz = await getQuizByQVID(qvid)
            if(quiz) {
                res.status(200).json({ status: "success", data: quiz })
            } else {
                res.status(404).json({ status: "error", data: "Quiz Not Found!", errorType: "ResourceError" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export default handle