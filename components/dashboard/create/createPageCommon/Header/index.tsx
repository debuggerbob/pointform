import { ProfileMenu } from "@/components/profileMenu";
import Link from "next/link";

/* Styles */
import styles from "./Styles.module.scss";

interface Props {
    quizTitle: string;
    username: string;
    dispatch: any;
}

export const CreatorPageHeader: React.FC<Props> = ({
    quizTitle,
    username,
    dispatch,
}) => {
    const handleTitleChange = (e: { target: { value: string } }) => {
        // Making a api call to change the title

        dispatch({ type: "changeQuizTitle", title: e.target.value });
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__wrapper__col_1}>
                    <div className={styles.header__wrapper__col_1__back_btn}>
                        <Link href="/dashboard">
                            <a>
                                <svg width={24} height={24} fill="none">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.293 12.823A.827.827 0 0021 12a.824.824 0 00-.818-.83H5.8l5.195-5.251.08-.093a.84.84 0 00-.077-1.082.81.81 0 00-1.157-.002L3.252 11.4a.84.84 0 00-.012 1.189l6.6 6.67.093.08a.81.81 0 001.065-.083.839.839 0 00-.003-1.175L5.8 12.831h14.383l.11-.008z"
                                        fill="#898989"
                                    />
                                </svg>
                            </a>
                        </Link>
                    </div>

                    <div className={styles.header__wrapper__col_1__quiz_title}>
                        <input
                            placeholder="Your Quiz Title"
                            name="quiz_title"
                            id="quiz_title"
                            value={quizTitle}
                            onChange={handleTitleChange}
                        />
                    </div>
                </div>

                <div className={styles.header__wrapper__col_2}>
                    <nav className={styles.header__wrapper__col_2__nav}>
                        <ul
                            className={
                                styles.header__wrapper__col_2__nav__item_wrapper
                            }
                        >
                            <li className={styles.item}>
                                <a
                                    className={`${styles.item__btn} ${styles.active}`}
                                >
                                    <span className={styles.step_indicator}>
                                        Create
                                    </span>
                                    <span className={styles.underline}></span>
                                </a>
                            </li>
                            <li className={styles.item}>
                                <a className={`${styles.item__btn} `}>
                                    <span className={styles.step_indicator}>
                                        Share
                                    </span>
                                    <span className={styles.underline}></span>
                                </a>
                            </li>
                            <li className={styles.item}>
                                <a className={`${styles.item__btn} `}>
                                    <span className={styles.step_indicator}>
                                        Results
                                    </span>
                                    <span className={styles.underline}></span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={styles.header__wrapper__col_3}>
                    <div
                        className={
                            styles.header__wrapper__col_3__publish_wrapper
                        }
                    >
                        <button className={styles.publish_btn}>Publish</button>
                    </div>

                    <div className={styles.header__wrapper__col_3__profile_btn}>
                        <ProfileMenu currentUsername={username} />
                    </div>
                </div>
            </div>
        </header>
    );
};
