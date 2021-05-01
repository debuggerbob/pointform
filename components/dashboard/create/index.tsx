import { useState, useReducer, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import gsap from "gsap";

/* Main Components */
import { ProfileMenu } from "@/components/profileMenu";
import generateFVID from "@/lib/generateFVID";

/* Styles */
import styles from "@/styles/createForm/index.module.scss";

const MobileComponent = dynamic(
    () => import("./Mobile/Index").then((module) => module.Mobile),
    { loading: () => <p>...</p> }
);

const DesktopComponent = dynamic(
    () => import("./Desktop/Index").then((module) => module.Desktop),
    { loading: () => <p>...</p> }
);

interface Props {
    quizTitle?: string;
    userAgent: string;
    creatorData: {
        uid: string;
        email: string;
        name: string;
    };
}

export type State = {
    quizTitle: string;
    questionList: {
        questionId: number;
        questionType: string;
        question: string;
        required: boolean;
        options: {
            optionId: number;
            value: string;
            score: number;
        }[];
        showScore: boolean;
    }[];
    currentQuestionId: number;
    showChooseQuestionScreen: boolean;
};

type Action =
    | { type: "changeQuizTitle"; title: string }
    | { type: "addQuestion"; questionType: string }
    | { type: "addQuestionAtIndex"; index: number; questionType: string }
    | { type: "deleteQuestion"; questionId: number }
    | { type: "showChooseQuestion" }
    | { type: "addMcqOption"; currentIdx: number }
    | { type: "deleteMcqOption"; currentIdx: number; optionId: number }
    | { type: "showScore"; currentIdx: number }
    | { type: "isRequired"; currentIdx: number }
    | { type: "changeQuestionValue"; currentIdx: number; value: string }
    | {
          type: "changeOptionValue";
          currentIdx: number;
          optionIdx: number;
          value: string;
      }
    | {
          type: "changeScoreValue";
          currentIdx: number;
          optionIdx: number;
          score: number;
      }
    | { type: "setCurrentQuestionId"; id: number };

export const Create: React.FC<Props> = ({
    userAgent,
    creatorData,
    quizTitle,
}) => {
    const router = useRouter();

    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "changeQuizTitle": {
                // Store title to localstorage
                localStorage.setItem("quiz_title", action.title);

                return {
                    ...state,
                    quizTitle: action.title,
                };
            }

            case "addQuestion": {
                const questionData = {
                    questionId: Math.random(),
                    questionType: action.questionType,
                    question: "",
                    options: [],
                    showScore: false,
                    required: false,
                };

                if (action.questionType === "MCQ") {
                    questionData.options = [
                        ...questionData.options,
                        {
                            optionId: Math.random(),
                            value: "",
                            score: 0,
                        },
                    ];
                } else if (action.questionType === "TF") {
                    questionData.options = [
                        { optionId: Math.random(), value: "true", score: 0 },
                        { optionId: Math.random(), value: "false", score: 0 },
                    ];
                }

                return {
                    ...state,
                    questionList: [...state.questionList, questionData],
                };
            }

            case "addQuestionAtIndex": {
                state.questionList.splice(action.index, 0, {
                    questionId: Math.random(),
                    questionType: action.questionType,
                    question: "",
                    options: [{ optionId: Math.random(), value: "", score: 0 }],
                    showScore: false,
                    required: false,
                });

                return { ...state };
            }

            case "deleteQuestion": {
                state.questionList = state.questionList.filter((item) => {
                    return item.questionId != action.questionId;
                });

                if (state.currentQuestionId != 0) {
                    state.currentQuestionId -= 1;
                }

                return { ...state };
            }

            case "showChooseQuestion": {
                return {
                    ...state,
                    showChooseQuestionScreen: !state.showChooseQuestionScreen,
                };
            }

            case "addMcqOption": {
                let quesObject = state.questionList[action.currentIdx];

                quesObject.options = [
                    ...quesObject.options,
                    { optionId: Math.random(), value: "", score: 0 },
                ];

                return { ...state };
            }

            case "deleteMcqOption": {
                let quesObject = state.questionList[action.currentIdx];

                quesObject.options = quesObject.options.filter((item) => {
                    return item.optionId != action.optionId;
                });

                return { ...state };
            }

            case "showScore": {
                let quesObject = state.questionList[action.currentIdx];

                quesObject.showScore = !quesObject.showScore;

                return { ...state };
            }

            case "isRequired": {
                let quesObject = state.questionList[action.currentIdx];

                quesObject.required = !quesObject.required;

                return { ...state };
            }

            case "changeQuestionValue": {
                let quesObject = state.questionList[action.currentIdx];

                quesObject.question = action.value;

                return { ...state };
            }

            case "changeOptionValue": {
                let quesObject = state.questionList[action.currentIdx];

                quesObject.options[action.optionIdx].value = action.value;

                return { ...state };
            }

            case "changeScoreValue": {
                let quesObject = state.questionList[action.currentIdx];

                quesObject.options[action.optionIdx].score = action.score;

                return { ...state };
            }

            case "setCurrentQuestionId": {
                return {
                    ...state,
                    currentQuestionId: action.id,
                };
            }

            default: {
                return state;
            }
        }
    };

    const [showTitlePopup, setShowTitlePopup] = useState(false);
    const main_container = useRef<HTMLDivElement>();
    const [creatingQuiz, setCreatingQuiz] = useState(false);
    const [formPublishStatus, setFormPublishStatus] = useState("Publish");

    const [superState, dispatch] = useReducer(reducer, {
        quizTitle: "untitled",
        questionList: [],
        currentQuestionId: 0,
        showChooseQuestionScreen: false,
    });

    useEffect(() => console.log(superState), [superState]);

    const handlePopupFormSubmit = async (e) => {
        e.preventDefault();

        setCreatingQuiz(true);

        let title = localStorage.getItem("quiz_title");
        let fvid = generateFVID();
        localStorage.setItem(`${title}`, fvid);
        let uid = creatorData.uid;
        let data = {
            title: title,
            fvid: fvid,
            userId: uid,
        };

        await fetch(`/api/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).catch((error) => console.log(error));

        if (superState.quizTitle.length > 0) {
            setShowTitlePopup(false);
        }
    };

    const handleTitleChange = (e: { target: { value: string } }) => {
        dispatch({ type: "changeQuizTitle", title: e.target.value });
    };

    const handlePublish = async () => {
        setFormPublishStatus("Publishing...");

        let title = localStorage.getItem("quiz_title");
        let fvid = localStorage.getItem(title);
        let uid = creatorData.uid;
        let status = "published";
        let data = {
            title: title,
            fvid: fvid,
            userId: uid,
            questions: superState.questionList,
            status: status,
        };

        await fetch(`/api/form`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status === 200) {
                    router.push("/dashboard");
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        superState.quizTitle === "untitled"
            ? setShowTitlePopup(true)
            : setShowTitlePopup(false);

        setTimeout(() => {
            gsap.to(main_container.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power0",
            });
        }, 150);
    }, []);

    return (
        <div ref={main_container} className={styles.main_container}>
            {/* Popup Start 
            ------------------*/}
            {showTitlePopup ? (
                <div className={styles.quiz_title_popup}>
                    <div className={styles.container}>
                        <div className={styles.container__head}>
                            <h3 className={styles.container__head__heading}>
                                Create a New Survey
                            </h3>
                            <Link href="/dashboard">
                                <a className={styles.container__head__close}>
                                    {/* Sorry that i used unicode, it is just for temp :( - programmer2 */}
                                    &#10005;
                                </a>
                            </Link>
                        </div>

                        <form onSubmit={handlePopupFormSubmit}>
                            <div className={styles.container__form}>
                                <label
                                    className={styles.container__form__label}
                                    htmlFor="quiz_title"
                                >
                                    Give it a name
                                </label>

                                <input
                                    className={styles.container__form__input}
                                    id="quiz_title"
                                    type="text"
                                    value={superState.quizTitle}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "changeQuizTitle",
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <span
                                className={
                                    superState.quizTitle.length === 0 ||
                                    superState.quizTitle.length < 3
                                        ? `${styles.container__form__input__error} ${styles.show}`
                                        : styles.container__form__input__error
                                }
                            >
                                {superState.quizTitle.length < 3
                                    ? "Title should be a minimum 3 letters"
                                    : "Title field is empty"}
                            </span>

                            <div className={styles.container__submit}>
                                <button
                                    type="submit"
                                    className={
                                        superState.quizTitle.length < 3
                                            ? `${styles.container__submit__btn} ${styles.disabled}`
                                            : styles.container__submit__btn
                                    }
                                >
                                    {creatingQuiz ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
            {/* Popup end
            ------------------*/}

            {/* Header Start 
            ------------------*/}
            <header className={styles.header}>
                <div className={styles.header__wrapper}>
                    <div className={styles.header__wrapper__col_1}>
                        <div
                            className={styles.header__wrapper__col_1__back_btn}
                        >
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

                        <div
                            className={
                                styles.header__wrapper__col_1__quiz_title
                            }
                        >
                            <input
                                placeholder="Your Quiz Title"
                                name="quiz_title"
                                id="quiz_title"
                                value={superState.quizTitle}
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
                                        <span
                                            className={styles.underline}
                                        ></span>
                                    </a>
                                </li>
                                <li className={styles.item}>
                                    <a className={`${styles.item__btn} `}>
                                        <span className={styles.step_indicator}>
                                            Share
                                        </span>
                                        <span
                                            className={styles.underline}
                                        ></span>
                                    </a>
                                </li>
                                <li className={styles.item}>
                                    <a className={`${styles.item__btn} `}>
                                        <span className={styles.step_indicator}>
                                            Results
                                        </span>
                                        <span
                                            className={styles.underline}
                                        ></span>
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
                            <button
                                className={styles.publish_btn}
                                onClick={handlePublish}
                            >
                                {formPublishStatus}
                            </button>
                        </div>

                        <div
                            className={
                                styles.header__wrapper__col_3__profile_btn
                            }
                        >
                            <ProfileMenu currentUsername={creatorData.name} />
                        </div>
                    </div>
                </div>
            </header>
            {/* Header End
            ------------------ */}

            {userAgent === "mobile" ? (
                <MobileComponent superState={superState} dispatch={dispatch} />
            ) : (
                <DesktopComponent superState={superState} dispatch={dispatch} />
            )}
        </div>
    );
};
