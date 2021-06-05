import { array, object, number, string, date, bool, ref, lazy } from 'yup';

const common = {
    title: string().required().min(3).max(500),
    fvid: string().required(),
    formType: string().required(),
    category: string().default("Form"),
    userId: string().required(),
    status: string().default('pending').oneOf(['pending', 'published']),
    timestamps: date().default(() => new Date())
}

export const DefaultFormSchema = object({
    ...common,
    questions: array().of(
        object({
            questionId: number(),
            question: string().max(1000),
            questionType: string().oneOf(['MCQ', 'TF', 'EMAIL', 'PHONE', 'ADDRESS', 'DATE', 'FILE', 'RATING', 'TEXT', 'DROPDOWN']),
            required: bool().default(false),
            options: array().of(object({
                optionId: number(),
                value: string().max(1000),
                score: number().default(0),
            }))
        })
    )
});

export const QuizFormSchema = object({
    ...common,
    questions: array(
        object({
            questionId: number(),
            question: string().max(1000),
            questionType: string().oneOf(['MCQ', 'TF', 'TEXT']),
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
});

export const AdmissionFormSchema = object({
    ...common,
    questions: array(
        object({
            questionId: number(),
            question: string().max(1000),
            questionType: string().oneOf(['MCQ', 'EMAIL', 'PHONE', 'ADDRESS', 'DATE', 'FILE', 'TEXT', 'DROPDOWN']),
            required: bool().default(false),
            options: array(
                object({
                    optionId: number(),
                    value: string().max(1000),
                    score: number().default(0),
                })
            ),
        })
    )
});

export const SurveyFormSchema = object({
    ...common,
    questions: array(
        object({
            questionId: number(),
            question: string().max(1000),
            questionType: string().oneOf(['MCQ', 'TF', 'EMAIL', 'PHONE', 'ADDRESS', 'DATE', 'FILE', 'RATING', 'TEXT', 'DROPDOWN']),
            required: bool().default(false),
            options: array(
                object({
                    optionId: number(),
                    value: string().max(1000),
                    score: number().default(0),
                })
            ),
        })
    )
});

export const FeedbackFormSchema = SurveyFormSchema
export const ContactFormSchema = AdmissionFormSchema