import { array, object, number, string, date, mixed } from "yup";

export const ParticipantSchema = object({
	participantId: string().required().min(6).max(500),
	fvid: string().required(),
	name: string().required(),
	institute: string().required(),
	questions: array(
		object({
			questionId: number(),
			choosenAnswer: mixed(),
		})
	),
	finalScore: number().default(0),
	timestamps: date().default(() => {
		return new Date();
	}),
});
