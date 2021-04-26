import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

// Auth
import { useAuth } from "@/context/AuthContext";
import Alert from "@/components/alert";

// Styles
import styles from "@/styles/auth/login.module.scss";

// Components
import { FormButton } from "@/components/button/FormButton";

export default function Login() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>();

    const { login } = useAuth();

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
                    );
                    router.push("/dashboard");
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

            <div className={styles.login_form}>
                <div className={styles.login_form__wrapper}>
                    <h2 className={styles.login_form__wrapper__heading}>
                        Log in to Pointform
                    </h2>

                    {message ? (
                        <Alert alertText={message} alertType={"error"} />
                    ) : (
                        <></>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.form__field}>
                            <label htmlFor="user_email">Email</label>
                            <input
                                type="email"
                                id="user_email"
                                name="user_email"
                                ref={emailRef}
                            />
                        </div>

                        <div className={styles.form__field}>
                            <label htmlFor="user_password">Password</label>
                            <input
                                type="password"
                                id="user_password"
                                name="user_password"
                                ref={passRef}
                            />
                        </div>

                        <FormButton
                            text={loading ? "Logging in..." : "Log in"}
                            clickEvent={handleSubmit}
                        />
                    </form>
                </div>

                <div className={styles.login_form__link}>
                    <p>
                        Don't have an account ?{" "}
                        <Link href="/signup">
                            <a>Create one here</a>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
