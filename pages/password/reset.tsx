import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

// Auth
import { useAuth } from "@/context/AuthContext";

// Components
import Alert from "@/components/alert";
import { baseApiUrl } from "@/lib/config";

export default function Reset() {
    const emailRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>();

    const { passwordReset } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();

        setLoading(true);

        await fetch(`${baseApiUrl}/auth`, {
            method: "POST",
            body: JSON.stringify({ userToken: token }),
        })
        .then(async (res) => {
            if (res.ok) {
                await passwordReset(emailRef.current?.value)
                .then(() =>  {
                    setMessage("Email has been sent, please check your inbox")
                })
                .catch(error => {
                    setLoading(false)
                    setMessage(error.message)
                })
            }
        })
        .catch((error) => {
            setLoading(false);
            setMessage(error.message);
        });
    };

    return (
        <>
            <Head>
                <title>Password Reset - Pointform</title>
            </Head>

            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                size="invisible"
                ref={recaptchaRef}
            />

            <div className="bg-white h-screen flex flex-col justify-center align-center text-center">
                <div className="text-left px-6 lg:w-1/3 md:w-9/12 lg:mx-auto lg:px-0 md:mx-auto">
                    <h2 className="text-4xl text-gray-800">
                        Reset your <span className="text-4xl font-bold text-indigo-600">Point</span>form password
                    </h2>
                    {message ?
                        <Alert alertText={message} alertType="error" />
                    : (
                        <></>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6">
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
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75"
                            >
                                {loading ? "Sending..." : "Send Password Reset Email"}
                            </button>
                        </div>
                        <div className="mt-8 text-sm text-gray-600 text-center">
                            <Link href="/login">
                                <a className="text-blue-500">Back to Login</a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
