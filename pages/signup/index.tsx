import { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

// Auth
import { useAuth } from "@/context/AuthContext";

// Styles
import styles from "../../styles/auth/signup.module.scss";

// Components
import { Checkbox } from "../../components/checkbox";
import { FormButton } from "../../components/button/FormButton";
import Alert from "@/components/alert";

export default function Signup() {
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>();

    const { signup } = useAuth();

    const formSubmit = async (e) => {
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
                    await signup(
                        emailRef.current?.value,
                        passRef.current?.value
                    ).then((reg) => {
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
                            .then(() => router.push("/dashboard"))
                            .catch((error) => {
                                console.log(error);
                                setMessage(error.message);
                            });
                    });
                }
            })
            .catch((error) => setMessage(error.message));
    };

    return (
        <>
            <Head>
                <title>Sign up - Pointform</title>
            </Head>

            <main className={styles.main}>
                <section className={styles.sidebar}>
                    <div className={styles.sidebar__top_section}>
                        <h1>
                            <Link href="/">
                                <a>Pointform</a>
                            </Link>
                        </h1>

                        <h2>
                            <span className={styles.top_text}>Create your</span>
                            <span className={styles.bottom_text}>
                                <span>Pointform</span> Account
                            </span>
                        </h2>
                        <p>
                            Get real time data for your quizzes forms & more for
                            free
                        </p>
                    </div>

                    <div className={styles.sidebar__img}>
                        <Image
                            src="/images/create-account.svg"
                            alt="Create your Pointform Account"
                            layout="responsive"
                            width={324}
                            height={358}
                        />
                    </div>
                </section>

                <section className={styles.content}>
                    <div className={styles.content__top_section}>
                        <h3>Sign up to Pointform</h3>
                        <h4>
                            Already have an account?{" "}
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </h4>
                    </div>

                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        size="invisible"
                        ref={recaptchaRef}
                    />

                    {message ? (
                        <Alert alertText={message} alertType={"error"} />
                    ) : (
                        <></>
                    )}

                    <div className={styles.content__form_wrapper}>
                        <form className={styles.form}>
                            <div className={styles.form__field}>
                                <label htmlFor="username">Your Name</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    ref={usernameRef}
                                />
                            </div>

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

                            <Checkbox
                                id="terms-notice"
                                name="terms-notice"
                                text="I agree to Pointform's"
                                toLink="/terms-of-service"
                                linkText="Terms of Service"
                            />

                            <Checkbox
                                id="privacy-notice"
                                name="privacy-notice"
                                text="I accept Pointform's use of my data for
								the service as described in"
                                toLink="/privacy-policy"
                                linkText="Privacy Policy"
                            />

                            <FormButton
                                text={
                                    !loading
                                        ? "Create my account"
                                        : "Creating..."
                                }
                                clickEvent={formSubmit}
                            />
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}
