import { addUserInfo } from '@/lib/db'
import { handle200, handle400, handle404 } from "@/lib/handler"
import { sanitizer } from '@/lib/helpers'

// I have to find someway to add a middleware to this api route, as the api is being used during signup the auth cookie isn't created yet but this api is being called causing an unauthorized access error
import { withAuth } from '@/middleware/withAuth'

const handle = async (req, res) => {
    if(req.method === 'POST') {
        try {
            req.body = JSON.parse(req.body)
            addUserInfo({
                uid: sanitizer(req.body.uid),
                name: sanitizer(req.body.name)
            })
            handle200(res, { message: "Registered successfully" })
            return
        } catch (error) {
            handle400(res)
            return
        }
    }
}

export default (handle)