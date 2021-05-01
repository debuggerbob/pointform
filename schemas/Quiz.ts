import { array, object, number, string, date, bool } from "yup";

export const QuizSchema = object({
    title: string().required().min(3).max(500),
    fvid: string().required(),
    userId: string().required(),
    questions: array(
        object({
            questionId: number(),
            question: string().max(1000),
            questionType: string().oneOf(["MCQ", "TF"]),
            required: bool().default(false),
            options: array(
                object({
                    optionId: number(),
                    value: string().max(1000),
                    score: number().default(0),
                })
            ),
        })
    ),
    status: string().default("pending").oneOf(["pending", "published"]),
    timestamps: date().default(() => {
        return new Date();
    }),
});
