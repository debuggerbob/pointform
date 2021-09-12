import { createResponse } from "@/lib/db"
import { handle200, handle400, handle404 } from "@/lib/handler"
import { safayi } from "@/lib/sanitizers"

const handle = async (req, res) => {
	if (req.method === "POST") {
		try {
			let pariticipantForm = req.body
            // Initial Object Sanitization
            pariticipantForm = safayi(pariticipantForm)
			if(pariticipantForm) {
				await createResponse(pariticipantForm)
				handle200(res, { message: "Hurray! Your submission has been received" })
				return
			} else {
				handle400(res)
				return
			}
		} catch (error) {
			handle400(error)
			return
		}
	}
}

export default handle