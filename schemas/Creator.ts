import { object, string, date, ref, bool } from "yup"

export const CreatorSchema = object({
    name: string().required().min(4).max(100),
    email: string().required().email(),
    oldPassword: string().min(8),
    password: string().min(8).when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
    ),
    confirmPassword: string().when('password', (password, field) =>
        password ? field.required().oneOf([ref('password')]) : field
    ),
    emailVerification: string().default('pending').oneOf(['pending', 'verified']),
    acceptedTerms: bool().default(false),
    accountType: string().default('personal').oneOf(['personal', 'institutional', 'commercial']),
    createdOn: date().default(() => {
        return new Date()
    })
})