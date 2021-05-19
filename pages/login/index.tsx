import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

// Auth
import { useAuth } from "@/context/AuthContext";
import Alert from "@/components/alert";

// Components
import { FormButton } from "@/components/button/FormButton";

export default function Login() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>();

    const { login, loginWithGoogle } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();

        setLoading(true);

        await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({ userToken: token }),
        })
        .then(async (res) => {
            if (res.ok) {
                await login(
                    emailRef.current?.value,
                    passRef.current?.value
                )
                .then(() => router.push("/dashboard"))
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
                <title>Login - Pointform</title>
            </Head>

            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                size="invisible"
                ref={recaptchaRef}
            />

            <div className="bg-white h-screen flex flex-col justify-center align-center text-center">
                <div className="text-left px-6 lg:w-1/3 md:w-9/12 lg:mx-auto lg:px-0 md:mx-auto">
                    <h2 className="text-4xl text-gray-800">
                        Log in to <span className="text-4xl font-bold text-indigo-600">Point</span>form
                    </h2>
                    <div className="mt-4">
                        <p className="text-gray-800">
                            Don't have an account ?{" "}
                            <Link href="/signup">
                                <a className="text-blue-500">Create one here</a>
                            </Link>
                        </p>
                    </div>
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
                            <div className="flex justify-between items-center">
                                <label htmlFor="user_password" className="text-black-800 font-medium">Password</label>
                                <div className="text-right">
                                    <p className="text-blue-500">
                                        <Link href="/password/reset">
                                            <a className="font-medium">Forgot Password?</a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
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
                                onClick={handleSubmit}
                                className="w-full bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75 font-semibold"
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-8 border-t border-gray-300">
                        <button
                            type="button"
                            onClick={() => loginWithGoogle('/dashboard')}
                            className="mt-8 w-full bg-gray-800 text-white p-4 rounded-md hover:bg-gray-900 delay-75 font-semibold"
                        >
                            {loading ? "Logging in..." : "Log in with Google"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
