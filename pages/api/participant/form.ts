import { getFormByFVID } from "@/lib/db"

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
                res.status(200).json({ status: "success", data: data })
            } else {
                res.status(404).json({ status: "error", data: "Resource Not Found!", errorType: "ResourceError" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export default handle