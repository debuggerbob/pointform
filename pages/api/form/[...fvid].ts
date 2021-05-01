import { getFormByFVID } from "@/lib/db"

const handle = async (req, res) => {
    if(req.method === 'GET') {
        try {
            let fvid = req.query.fvid[0]
            const form = await getFormByFVID(fvid)
            if(form) {
                res.status(200).json({ status: "success", data: form })
            } else {
                res.status(404).json({ status: "error", data: "Resource Not Found!", errorType: "ResourceError" })
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

export default handle