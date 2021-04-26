import { QuizSchema } from "@/schemas/Quiz"
import { validateQuiz, createQuiz, updateQuiz, deleteQuiz, findQuizByQVID } from "@/lib/db"
import { withAuth } from "@/middleware/withAuth"

const handle = async (req, res) => {
    if(req.method === 'POST') {
        try {
            let quiz = req.body
            let qvid = req.body.qvid
            const exists = await findQuizByQVID(qvid)
            if(exists) {
                res.status(400).json({ status: "error", message: "Quiz already exists", errorType: "ResourceError" })
            } else {
                await createQuiz(quiz)
                res.status(200).json({ status: "success", message: "Quiz has been created successfully!" })   
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    if(req.method === 'PATCH') {
        try {
            let quiz = req.body
            let qvid = req.body.qvid
            const exists = await findQuizByQVID(qvid)
            if(!exists) {
                res.status(400).json({ status: "error", message: "Quiz does not exist", errorType: "ResourceError" })
            } else {
                await updateQuiz(qvid, quiz)
                res.status(200).json({ status: "success", message: "Quiz has been updated successfully!" })   
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
    
    if(req.method === 'DELETE') {
        try {
            let qvid = req.body.qvid
            const exists = await findQuizByQVID(qvid)
            if(!exists) {
                res.status(400).json({ status: "error", message: "Quiz does not exist", errorType: "ResourceError" })
            } else {
                await deleteQuiz(qvid)
                res.status(200).json({ status: "success", message: "Quiz has been deleted successfully!" })   
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export default validateQuiz(QuizSchema, withAuth(handle))