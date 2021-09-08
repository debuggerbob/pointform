import { auth } from '@/firebase/firebaseAdmin'

export function withAuth(handler) {
    return async (req, res) => {
        const authHeader = req.headers.cookie;
        if (!authHeader) {
            return res.status(401).end('Unauthorized');
        }

        const token = authHeader.split('token=')[1];
        let decoded;
        try {
            decoded = await auth.verifyIdToken(token);
            if (!decoded || !decoded.uid)
                return res.status(401).end('Unauthorized');
                req.uid = decoded.uid;
        } catch (error) {
            const errorCode = error.errorInfo.code;
            error.status = 401;
            if (errorCode === 'auth/internal-error') {
                error.status = 500;
            }
            return res.status(error.status).json({ error: errorCode });
        }

        return handler(req, res);
    }
}