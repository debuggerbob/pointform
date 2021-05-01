import { ParticipantSchema } from "@/schemas/Participant";
import {
	validateFormResponse,
	createResponse,
} from "@/lib/db";

const handle = async (req, res) => {
	if (req.method === "POST") {
		try {
			let participant = req.body;
			await createResponse(participant)
			res.status(200).json({
				status: "success",
				message: "Hurray! Your submission has been received",
			});
		} catch (err) {
			res.json(err);
		}
	}
};

export default validateFormResponse(ParticipantSchema, handle);
