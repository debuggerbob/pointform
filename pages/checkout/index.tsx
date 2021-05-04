import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Head from 'next/head'

function Plan() {

    const router = useRouter()
    const { currentUser } = useAuth()
    const [username, setUsername] = useState("test user")
    const [email, setEmail] = useState("testuser@email.com")
    const plan = router.query.plan

    const bringInScript = (uri) => {
        return new Promise(resolve => {
            const script = document.createElement('script')
            script.src = uri
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const displayRazorpay = async () => {
        try {
            const res = await bringInScript('https://checkout.razorpay.com/v1/checkout.js')
            if(!res)
                throw new Error("Failed to load paymemt SDK")

            const { amount, id: order_id, currency } = await fetch(`/api/razorpay/orders`, { 
                method: 'POST'
            })
            .then(res => res.json())
            .catch(error => console.log(error))

            const options = {
                key: process.env.RAZORPAY_TEST_KEY_ID,
                amount: amount,
                currency: currency,
                name: 'Pointform',
                description: 'Thanks for choosing pointforms, ',
                image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Stellar_Symbol.png',
                order_id: order_id,
                handler: async (response) => {
                    console.log(response)
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    }

                    const verified = await fetch(`/api/razorpay/verify`, {
                        method: 'POST',
                        headers: {
                            accept: 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .catch(error => console.log(error))
                    if(verified.data)
                        router.push(`/dashboard?status=true`)

                },
                prefill: {
                    name: username,
                    email: email
                }
            }
            const _window = (window as any)
            const obj = new _window.Razorpay(options)
            obj.open()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>

            <div className="bg-white h-screen flex flex-col justify-center align-center text-center">
                <div className="text-left px-6 lg:w-1/3 md:w-9/12 lg:mx-auto lg:px-0 md:mx-auto">
                    <div className="text-center">
                        <h3 className="text-gray-800 my-4 text-3xl">You're all set!</h3>
                        <h5 className="my-4 text-sm text-gray-500 w-3/4 mx-auto">Proceed to Checkout after verifying the following details to continue to dashboard</h5>
                        <ul className="px-4 my-4">
                            <li className="border-2 border-gray-300 rounded-md flex justify-between items-center my-4 p-4">
                                <span className="block font-semibold text-gray-900">Picked Plan</span> 
                                <span>{plan}</span> 
                            </li>
                            <li className="border-2 border-gray-300 rounded-md flex justify-between items-center my-4 p-4">
                                <span className="block font-semibold text-gray-900">Plan Price</span> 
                                <span>{"$1499/mo"}</span> 
                            </li>
                            <li className="border-2 border-gray-300 rounded-md flex justify-between items-center my-4 p-4">
                                <span className="block font-semibold text-gray-900">Email address</span> 
                                <span>{"testuser@email.com"}</span> 
                            </li>
                        </ul>
                        <button onClick={displayRazorpay} className="bg-gray-900 px-8 py-6 my-4 rounded-md text-white">Check out</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Plan
