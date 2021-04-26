import { firestore as db } from '@/lib/firebaseAdmin'
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object"

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

export async function findQuizByCID(userId) {
    const quiz = await db.collection(process.env.HAKUNA_MATATA_RY).where('userId', '==', userId).get()
    if(quiz.empty) return false
    else return true
}

export async function getQuizByCID(userId) {
    let data = []
    const quiz = await db.collection(process.env.HAKUNA_MATATA_RY).where('userId', '==', userId).get()
    if (quiz.empty) {
        return;
    }  
    quiz.forEach(doc => {
        data.push(doc.data())
    })
    return data
}

export async function findQuizByQVID(qvid) {
    const quiz = await db.collection(process.env.HAKUNA_MATATA_RY).where('qvid', '==', qvid).get()
    if(quiz.empty) return false
    else return true
}

export async function getQuizByQVID(qvid) {
    let data
    const quiz = await db.collection(process.env.HAKUNA_MATATA_RY).where('qvid', '==', qvid).get()
    if (quiz.empty) {
        return;
    }  
    quiz.forEach(doc => {
        data = doc.data()
    })
    return data
}

export async function createQuiz(quiz) {
    await db.collection(process.env.HAKUNA_MATATA_RY).add(quiz)
}

export async function updateQuiz(qvid, quiz) {
    await db.collection(process.env.HAKUNA_MATATA_RY).where('qvid', '==', qvid).get()
        .then(response => {
            let batch = db.batch()
            response.docs.forEach((doc) => {
                const refDoc = db.collection(process.env.HAKUNA_MATATA_RY).doc(doc.id)
                batch.update(refDoc, {...quiz})
            })
            batch.commit().then(() => {
                return true
            })
        })
}

export async function deleteQuiz(qvid) {
    await db.collection(process.env.HAKUNA_MATATA_RY).where('qvid', '==', qvid).get()
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

export function validateQuiz(
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
        else if(req.method === "PATCH") {
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

export function validateQuizResponse(
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