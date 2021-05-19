import { useState, useReducer, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import gsap from "gsap";

/* Main Components */
import { ProfileMenu } from "@/components/profileMenu";
import { FirstScreen } from "./first-screen";
import { Questionnarie } from "./questionnaire";
import { Popup } from "./popup";
import generateFVID from "@/lib/generateFVID";

/* Styles */
import styles from "@/styles/createForm/index.module.scss";

import { ToggleType, UpdateType } from "@/types/form-builder";
import { Toggle, Update } from "@/store/form-builder/action";
import { FormReducer, InitialState } from "@/store/form-builder/reducer";

interface Props {
    quizTitle?: string;
    userAgent: string;
    creatorData: {
        uid: string;
        email: string;
        name: string;
    };
}

export const Create: React.FC<Props> = ({
    userAgent,
    creatorData,
    quizTitle,
}) => {
    const router = useRouter();

    const [superState, dispatch] = useReducer(FormReducer, InitialState);

    const [showTitlePopup, setShowTitlePopup] = useState(false);
    const container = useRef<HTMLDivElement>();
    const [creatingQuiz, setCreatingQuiz] = useState(false);
    const [formPublishStatus, setFormPublishStatus] = useState("Publish");

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

        if (superState.formTitle.length > 0) {
            setShowTitlePopup(false);
        }
    };

    // const handleTitleChange = (e: { target: { value: string } }) => {
    //     dispatch({ type: "changeQuizTitle", title: e.target.value });
    // };

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
        superState.formTitle === "untitled"
            ? setShowTitlePopup(true)
            : setShowTitlePopup(false);

        setTimeout(() => {
            gsap.to(container.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power0",
            });
        }, 150);
    }, []);

    useEffect(() => console.log(superState), [superState]);

    const [showLinks, setShowLinks] = useState(false);

    const handleFormTitleChange = (e) => {
        dispatch(
            Update({ type: UpdateType.FormTitle, updatedValue: e.target.value })
        );
    };

    const addQuestion = () => {
        dispatch(Toggle(ToggleType.ChooseQuestion));
    };

    return (
        <div ref={container}>
            {/* Header Start 
            ------------------*/}
            <header className="fixed top-0 left-0 w-full  bg-white flex justify-between items-center border-b border-gray-200 z-50 md:h-px70">
                {/* Col1
            	------------------*/}
                <div className="col1 pl-percent5 py-4 w-2/4 max-w-xs">
                    {superState.formTitle === "untitled" ? (
                        <h1 className="text-base font-medium">Pointform</h1>
                    ) : (
                        <>
                            {/* Form title container */}
                            <div className="flex items-center">
                                <Link href="/dashboard">
                                    <a className="mr-4">
                                        <svg width={24} height={24} fill="none">
                                            <path
                                                d="M4.25 12.274h15M10.3 18.299l-6.05-6.024L10.3 6.25"
                                                stroke="#4A5568"
                                                strokeWidth={1.5}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </Link>

                                <input
                                    type="text"
                                    name="forrTitle"
                                    placeholder="Form title here..."
                                    value={superState.formTitle}
                                    onChange={handleFormTitleChange}
                                    className="px-2 py-1 w-full text-gray-800 placeholder-gray-500 border rounded border-tra transition focus:border-indigo-500"
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Col2
            	------------------*/}
                <div className="col2 relative">
                    {/* Toggle Button */}
                    <button
                        className="p-4 md:hidden"
                        onClick={() => {
                            setShowLinks(!showLinks);
                        }}
                    >
                        <svg width={24} height={24} fill="none">
                            <path
                                clipRule="evenodd"
                                d="M16.286 2h3.266A2.46 2.46 0 0122 4.47v3.294c0 1.363-1.096 2.47-2.448 2.47h-3.266a2.46 2.46 0 01-2.45-2.47V4.47A2.46 2.46 0 0116.287 2zM4.449 2h3.265a2.46 2.46 0 012.45 2.47v3.294a2.46 2.46 0 01-2.45 2.47H4.45A2.46 2.46 0 012 7.764V4.47A2.46 2.46 0 014.449 2zM4.449 13.766h3.265a2.46 2.46 0 012.45 2.47v3.294A2.46 2.46 0 017.713 22H4.45A2.46 2.46 0 012 19.53v-3.293a2.46 2.46 0 012.449-2.471zM16.286 13.766h3.266c1.352 0 2.448 1.106 2.448 2.47v3.294A2.46 2.46 0 0119.552 22h-3.266a2.46 2.46 0 01-2.45-2.47v-3.293a2.46 2.46 0 012.45-2.471z"
                                stroke="#200E32"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Link container */}
                    <div
                        className={`absolute h-0 bg-white top-14 right-4 border rounded transition duration-300 overflow-hidden border-gray-300 z-20 ${
                            showLinks
                                ? "opacity-100 h-36 px-1 py-4"
                                : "opacity-0"
                        } md:relative md:opacity-100 md:flex md:h-full md:top-0 md:right-0 md:border-none `}
                    >
                        {/* Insert Button
						-------------- */}
                        <div
                            className="flex align-center px-6 py-4 cursor-pointer group md:py-3 md:flex-col md:items-center  hover:bg-gray-100"
                            onClick={addQuestion}
                        >
                            <svg
                                width={20}
                                height={20}
                                fill="none"
                                className="mr-3 md:mr-0 md:mb-1"
                            >
                                <path
                                    className="stroke-current text-gray-600 transition group-hover:text-gray-900"
                                    d="M10 4.167v11.666M4.167 10h11.666"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="text-gray-500 font-normal transition tracking-wide group-hover:text-gray-900 md:text-sm">
                                Insert
                            </span>
                        </div>

                        {/* Publish button
						-------------- */}
                        <div className="flex align-center px-6 py-4 cursor-pointer group md:py-3 md:flex-col md:items-center  hover:bg-gray-100">
                            <svg
                                width={20}
                                height={20}
                                fill="none"
                                className="mr-3 md:mr-0 md:mb-1"
                            >
                                <path
                                    className="stroke-current text-gray-600 transition group-hover:text-gray-900"
                                    d="M13.213 6.768l-4.72 4.751m0 0L2.967 8.118c-.724-.446-.577-1.546.239-1.782L16.252 2.54c.742-.215 1.428.48 1.206 1.226l-3.871 13.032c-.243.816-1.33.957-1.77.23l-3.324-5.509z"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="text-gray-500 font-normal transition tracking-wide group-hover:text-gray-900 md:text-sm">
                                Publish
                            </span>
                        </div>
                    </div>
                </div>

                {/* Col3
            	------------------*/}
                <div className="col3 pr-percent5">
                    <ProfileMenu currentUsername={creatorData.name} />
                </div>
            </header>
            {/* Header End
            ------------------ */}

            <main className="pt-px70 mx-10 xs:mx-auto xs:max-w-400 xs:px-4 sm:mx-auto sm:px-8 sm:max-w-540  md:max-w-680 md:px-24 lg:max-w-900 lg:px-20">
                <Popup
                    showScreen={superState.showChooseQuestionScreen}
                    dispatch={dispatch}
                />

                <DummyContainer />

                {/* Add Question Screen  */}
                {superState.questionList.length === 0 &&
                superState.formTitle !== "untitled" ? (
                    <div className={"mt-10 md:mt-0"}>
                        <button
                            className="px-5 py-4 mb-8 flex items-center text-lg text-indigo-700 bg-indigo-50 border border-indigo-50 rounded-full transition duration-100 hover:border-indigo-400 hover:bg-indigo-100 focus:border-indigo-400 focus:bg-indigo-100"
                            onClick={() =>
                                dispatch(Toggle(ToggleType.ChooseQuestion))
                            }
                        >
                            <svg
                                width={24}
                                height={24}
                                fill="none"
                                className="mr-4 stroke-current text-indigo-500"
                            >
                                <path
                                    d="M12 5v14M5 12h14"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <p className="font-medium">Add question</p>
                        </button>

                        <div className="flex items-center animate-bounce">
                            <svg
                                width={24}
                                height={24}
                                fill="none"
                                className="mr-4"
                            >
                                <circle cx={12} cy={12} r={12} fill="#F68B5C" />
                                <path
                                    d="M13.64 17.14h-3.28a.11.11 0 00-.11.11v.438c0 .242.195.437.438.437h2.624a.437.437 0 00.438-.438v-.437a.11.11 0 00-.11-.11zM12 5.876a4.485 4.485 0 00-2.242 8.369v1.584c0 .242.195.438.437.438h3.61a.437.437 0 00.437-.438v-1.584A4.485 4.485 0 0012 5.875zm1.749 7.517l-.491.284v1.605h-2.516v-1.605l-.49-.284a3.5 3.5 0 113.497 0z"
                                    fill="#fff"
                                />
                            </svg>

                            <span className="text-gray-500 font-body">
                                Add a question to begin
                            </span>
                        </div>
                    </div>
                ) : null}

                {/* First Screen */}
                {superState.formTitle === "untitled" ? (
                    <FirstScreen dispatch={dispatch} />
                ) : null}

                {/* Main  screen*/}
                {superState.questionList.length > 0 &&
                superState.formTitle !== "untitled" ? (
                    <Questionnarie
                        questionList={superState.questionList}
                        dispatch={dispatch}
                    />
                ) : null}

                <DummyContainer />
            </main>
        </div>
    );
};

const DummyContainer = () => {
    return <div className="h-12 xs:h-16 sm:h-24 md:h-32 lg:h-38"></div>;
};
