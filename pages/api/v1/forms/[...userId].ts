import { getFormByCID } from '@/lib/db'
import { withAuth } from '@/middleware/withAuth'
import { handle200, handle400, handle404 } from '@/lib/handler'
import { arrayClipper } from '@/lib/clippers'
import { sanitizer } from '@/lib/helpers'

const handle = async (req, res) => {
    if (req.method === 'GET') {
        try {
            let userId = req.query.userId[0]
            userId = sanitizer(userId)
            let formsData = await getFormByCID(userId)
            let forms = arrayClipper(formsData, [
                'title',
                'fvid',
                'status',
                'category',
                'formType',
            ])
            if (forms) {
                handle200(res, { message: forms })
                return
            } else {
                handle404(res, { message: "User hasn't created any forms yet" })
                return
            }
        } catch (error) {
            handle400(res)
            return
        }
    }
}

export default handle
