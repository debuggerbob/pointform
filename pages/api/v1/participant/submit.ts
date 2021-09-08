import { createResponse } from "@/lib/db"
import { handle200, handle400, handle404 } from "@/lib/handler"

const handle = async (req, res) => {
	if (req.method === "POST") {
		try {
			let participant = req.body
			if(participant) {
				await createResponse(participant)
				handle200(res, { message: "Hurray! Your submission has been received" })
			} else {
				handle400(res)
			}
		} catch (err) {
			res.json(err)
		}
	}
}

export default handle