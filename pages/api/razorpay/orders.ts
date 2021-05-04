import Razorpay from 'razorpay'
import { v4 as receiptId } from 'uuid'
import { withAuth } from "@/middleware/withAuth"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY_ID,
    key_secret: process.env.RAZORPAY_TEST_KEY_SECRET
})

const handle = async (req, res) => {
    if(req.method === 'POST') {
        const amount = 499
        const currency = 'INR'
        
        const options = {
            amount: amount*100,
            currency: currency,
            receipt: receiptId()
        }

        try {
            const order = await razorpay.orders.create(options)
            res.status(200).json({ id: order.id, currency: order.currency, amount: order.amount })
        } catch (error) {
            res.status(500).json({ status: "error", message: "Something went wrong while placing the order!" })
        }
    }
}

export default withAuth(handle)