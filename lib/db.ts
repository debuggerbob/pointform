import { firestore as db } from '@/lib/firebaseAdmin'
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object"
import { AdmissionFormSchema, ContactFormSchema, DefaultFormSchema, FeedbackFormSchema, QuizFormSchema, SurveyFormSchema } from '@/schemas/Form'

import { validator } from "@/lib/validators"

export async function findUserNameByCID(userId) {
    let data
    const user = await db.collection(process.env.HAKUNA_MATATA_SJ).where('uid', '==', userId).get()
    if (user.empty) {
        return;
    }  
    user.forEach(doc => {
        data = doc.data().name
    })
    return data
}

export async function addUserInfo(info) {
    await db.collection(process.env.HAKUNA_MATATA_SJ).add(info)
}

export async function findFormByCID(userId) {
    const form = await db.collection(process.env.HAKUNA_MATATA_RY).where('userId', '==', userId).get()
    if(form.empty) return false
    else return true
}

export async function getFormByCID(userId) {
    let data = []
    const forms = await db.collection(process.env.HAKUNA_MATATA_RY).where('userId', '==', userId).get()
    if (forms.empty) {
        return;
    }  
    forms.forEach(doc => {
        data.push(doc.data())
    })
    return data
}

export async function findFormByFVID(fvid) {
    const form = await db.collection(process.env.HAKUNA_MATATA_RY).where('fvid', '==', fvid).get()
    if(form.empty) return false
    else return true
}

export async function getFormByFVID(fvid) {
    let data
    const forms = await db.collection(process.env.HAKUNA_MATATA_RY).where('fvid', '==', fvid).get()
    if (forms.empty) {
        return;
    }  
    forms.forEach(doc => {
        data = doc.data()
    })
    return data
}

export async function createForm(form) {
    await db.collection(process.env.HAKUNA_MATATA_RY).add(form)
}

export async function updateForm(fvid, form) {
    await db.collection(process.env.HAKUNA_MATATA_RY).where('fvid', '==', fvid).get()
        .then(response => {
            let batch = db.batch()
            response.docs.forEach((doc) => {
                const refDoc = db.collection(process.env.HAKUNA_MATATA_RY).doc(doc.id)
                batch.update(refDoc, {...form})
            })
            batch.commit().then(() => {
                return true
            })
        })
}

export async function deleteForm(fvid) {
    await db.collection(process.env.HAKUNA_MATATA_RY).where('fvid', '==', fvid).get()
        .then(response => {
            let batch = db.batch()
            response.docs.forEach((doc) => {
                const refDoc = db.collection(process.env.HAKUNA_MATATA_RY).doc(doc.id)
                batch.delete(refDoc)
            })
            batch.commit().then(() => {
                return true
            })
        })
}

export async function createResponse(participant) {
    await db.collection(process.env.HAKUNA_MATATA_TS).add(participant)
}

function validateSchema(formType) {
    switch(formType) {
        case "default_form": {
            return DefaultFormSchema
        }
        case "quiz": {
            return QuizFormSchema
        }
        case "admissions": {
            return AdmissionFormSchema
        }
        case "survey": {
            return SurveyFormSchema
        }
        case "feedback": {
            return FeedbackFormSchema
        }
        case "contact": {
            return ContactFormSchema
        }
    }
}

export function validateForm(
    handler: NextApiHandler
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if(req.method === "PATCH") {
            let questions = req.body.questions
            const validated = validator(questions)
            if(!validated)
                return res.status(400).json({ message: "Invalid data" })
        }
        await handler(req, res)
    }
}

export function validateFormResponse(
    schema: OptionalObjectSchema<ObjectShape>,
    handler: NextApiHandler
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if(req.method === "POST") {
            try {
                req.body = await schema
                    .camelCase()
                    .validate(req.body, { abortEarly: false, stripUnknown: true })
            } catch(error) {
                return res.status(400).json(error)
            }
        }
        await handler(req, res)
    }
}