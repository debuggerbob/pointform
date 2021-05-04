import crypto from 'crypto'

const handle = async (req, res) => {
    if(req.method === 'POST') {
        req.body = JSON.parse(req.body)
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body

        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_TEST_KEY_SECRET)
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`)
        const digest = shasum.digest('hex')
        if (digest === razorpaySignature) {
            res.status(200).json({ status: "success", data: { orderId: razorpayOrderId, paymentId: razorpayPaymentId}})
        } else {
            res.status(400).json({ status: "error", message: "Invalid Request", errorType: "PaymentError" })
        }
    }
}

export default handle