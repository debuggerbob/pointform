import { addUserInfo } from '@/lib/db'
// I have to find someway to add a middleware to this api route, as the api is being used during signup the auth cookie isn't created yet but this api is being called causing an unauthorized access error
import { withAuth } from '@/middleware/withAuth'

const handle = async (req, res) => {
    if(req.method === 'POST') {
        try {
            req.body = JSON.parse(req.body)
            addUserInfo({
                uid: req.body.uid,
                name: req.body.name
            })
            return res.status(200).json({ status: "success", message: "Registered successfully!" })
        } catch (error) {
            console.log(error)
        }
    }
}

export default (handle)