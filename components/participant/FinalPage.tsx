import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// import styles from "./styles/Finalpage.module.scss";
import styles from "./styles/FinalPage.module.scss";
import { baseApiUrl } from "@/lib/config";
interface Props {
    finalData: {
        participantId: string;
        fvid: string;
        name: string;
        institute: string;
        questions: { questionId: number; choosenAnswer: any }[];
        finalScore: number;
    };
}

export const FinalPage: React.FC<Props> = ({ finalData }) => {
    const [submittedData, setSubmittedData] = useState<boolean>(false);
    const main_container = useRef<HTMLDivElement>();

    console.log("Final Data", finalData);

    const submitData = async () => {
            await fetch(`${baseApiUrl}/participant/submit`, {
                method: 'POST',
                headers: {
                    accept: 'application/json'
                },
                body: JSON.stringify(finalData)
            })
            .then(res => 
                res.ok
                ? setSubmittedData(true)
                : setSubmittedData(false)
            )
            .catch(error => console.log(error))
    };

    useEffect(() => {
        gsap.to(main_container.current, {
            opacity: 1,
            duration: 0.7,
            ease: "power1",
        });

        console.log(finalData);

        submitData();
    }, []);

    return (
        <div ref={main_container} className={styles.container}>
            {submittedData ? (
                <>
                    <div className={styles.sidebar}></div>
                    <div className={styles.container__wrapper}>
                        <div className={styles.content}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 130.2 130.2"
                            >
                                <circle
                                    cx="65.1"
                                    cy="65.1"
                                    r="62.1"
                                    fill="none"
                                    stroke="#73AF55"
                                    strokeMiterlimit="10"
                                    strokeWidth="6"
                                    className={`${styles.path} ${styles.circle}`}
                                ></circle>
                                <path
                                    fill="none"
                                    stroke="#73AF55"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="6"
                                    d="M100.2 40.2L51.5 88.8 29.8 67.5"
                                    className={`${styles.path} ${styles.check}`}
                                ></path>
                            </svg>

                            <span className={styles.response_text}>
                                Your response has been recorded
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.loading_container}>
                    <span className={styles.text}>Submitting response...</span>
                </div>
            )}
        </div>
    );
};
