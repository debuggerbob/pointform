import { firestore as db } from '@/firebase/firebaseAdmin'

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