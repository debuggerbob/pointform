import { getQuizByQVID } from "@/lib/db"

const handle = async (req, res) => {
    if(req.method === 'POST') {
        try {
            let quiz = req.body
            let qvid = quiz.qvid
            const exists = await getQuizByQVID(qvid)
            if(exists) {
                const data = {
                    questions: exists.questions,
                    qvid: exists.qvid,
                    title: exists.title
                }
                res.status(200).json({ status: "success", data: data })
            } else {
                res.status(404).json({ status: "error", data: "Quiz Not Found!", errorType: "ResourceError" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export default handle