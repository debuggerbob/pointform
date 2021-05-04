import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

// Auth
import { useAuth } from "@/context/AuthContext";

// Components
import Alert from "@/components/alert";

export default function Signup() {
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const planRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [paidUser, setPaidUser] = useState(false)
    const availablePlans = ["edu-elite", "busi-suite"]
    const recaptchaRef = useRef<ReCAPTCHA>();

    const { signup } = useAuth();
    const plan = router.query.plan.toString()


    useEffect(() => {
        if(plan)
            setPaidUser(true)
    }, [])

    const formSubmit = async (e) => {
        e.preventDefault()

        const token = await recaptchaRef.current.executeAsync()
        recaptchaRef.current.reset();

        setLoading(true);

        await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({ userToken: token }),
        })
            .then(async (res) => {
                if (res.ok) {
                    await signup(
                        emailRef.current?.value,
                        passRef.current?.value
                    )
                    .then((reg) => {
                        const data = {
                            uid: reg.user.uid,
                            name: usernameRef.current?.value,
                        };

                        fetch("/api/user", {
                            method: "POST",
                            headers: {
                                accept: "application/json",
                            },
                            body: JSON.stringify(data),
                        })
                        .then(() => {
                            if(paidUser)
                                router.push(`/checkout?plan=${plan}`)
                            else
                                router.push("/dashboard")
                        })
                        .catch((error) => {
                            console.log(error);
                            setMessage(error.message);
                        });
                    })
                    .catch(error => {
                        setLoading(false)
                        setMessage(error.message)
                    })
                }
            })
            .catch(error => {
                setLoading(false)
                setMessage(error.message)
            });
    };

    return (
        <>
            <Head>
                <title>Sign up - Pointform</title>
            </Head>

            <div className="bg-white h-screen flex flex-col justify-center align-center text-center">
                <div className="text-left px-6 lg:w-1/3 md:w-9/12 lg:mx-auto lg:px-0 md:mx-auto">
                    <h2 className="text-4xl text-gray-800">
                        Sign up to <span className="text-4xl font-bold text-indigo-600">Point</span>form
                    </h2>
                    <div className="mt-4">
                        <p className="text-gray-800">
                            Already have an account ?{" "}
                            <Link href="/login">
                                <a className="text-blue-500">Login</a>
                            </Link>
                        </p>
                    </div>

                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        size="invisible"
                        ref={recaptchaRef}
                    />

                    {message ?
                        <Alert alertText={message} alertType="error" />
                    : (
                        <></>
                    )}

                    <form onSubmit={formSubmit}>
                        {
                            !availablePlans.includes(plan)
                            ?
                            <div className="mt-6">
                                <label htmlFor="user_plan" className="text-gray-900 font-medium">Choosen Plan</label>
                                <select className="p-4 mt-3 border-2 bg-white border-gray-200 rounded-md w-full outline-none focus:border-indigo-600" name="user_plan" id="user_plan">
                                    {
                                        availablePlans.map(availablePlan => <option className="bg-white w-full text-dark py-4 border-gray-200" value={availablePlan} key={availablePlan}>{availablePlan}</option>)
                                    }
                                </select>
                            </div>
                            :
                            <></>
                        }
                        <div className="mt-6">
                            <label htmlFor="username" className="text-gray-900 font-medium">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="p-4 mt-3 border-2 border-gray-200 rounded-md w-full outline-none focus:border-indigo-600"
                                ref={usernameRef}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="user_email" className="text-gray-900 font-medium">Email address</label>
                            <input
                                type="email"
                                id="user_email"
                                name="user_email"
                                className="p-4 mt-3 border-2 border-gray-200 rounded-md w-full outline-none focus:border-indigo-600"
                                ref={emailRef}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="user_password" className="text-black-800 font-medium">Password</label>
                            <input
                                type="password"
                                id="user_password"
                                name="user_password"
                                className="p-4 mt-3 border-2 border-gray-200 rounded-md w-full outline-none focus:border-indigo-600"
                                ref={passRef}
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                onClick={formSubmit}
                                className="w-full bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75"
                            >
                                {loading ? "Signing up..." : paidUser ? "Sign up and Upgrade" : "Sign up" }
                            </button>
                        </div>
                        <div className="mt-8 text-sm text-gray-600 text-center">
                            By clicking ‘Create an account’, you agree to our 
                            <Link href="/login">
                                <a className="text-sm text-blue-500 ml-1">Terms & Privacy Policy</a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}