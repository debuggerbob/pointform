import { useEffect, useReducer } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { UserForm } from "@/components/participant/form";
import { Quiz } from "@/components/participant/Quiz";
import { FinalPage } from "@/components/participant/FinalPage";

type ApiResData = {
    _id: string;
    timestamps: string;
    status: string;
    questions: {
        question: string;
        questionId: number;
        questionType: string;
        options: { optionId: number; value: string; score: number }[];
    }[];
    creatorId: string;
    fvid: string;
    title: string;
};

type State = {
    name: string;
    institute: string;
    basicDetails: boolean;
    questionsList: {
        question: string;
        questionId: number;
        questionType: string;
        options: { optionId: number; value: string; score: number }[];
    }[];
    userAnswers: {
        questionId: number;
        choosenAnswer: any;
    }[];
    currentIdx: number;
    quizCompleted: boolean;
    score: number;
};

type Action =
    | { type: "changeName"; name: string }
    | { type: "changeInstitute"; institute: string }
    | { type: "setBasicDetails" }
    | {
          type: "changeUserAnswers";
          index: number;
          questionId: number;
          optionId: number;
      }
    | {
          type: "changeUserAnsText";
          index: number;
          questionId: number;
          optionValue: string;
      }
    | { type: "changeCurrentIdx"; toIndex: number }
    | { type: "increaseCurrentIdx" }
    | { type: "incrementScore"; incrementValue: number };

export default function ParticipantPage({ resData }: { resData: ApiResData }) {
    const reducer = (state: State, action: Action) => {
        switch (action.type) {
            case "changeName": {
                localStorage.setItem("username", action.name);
                return {
                    ...state,
                    name: action.name,
                };
            }

            case "changeInstitute": {
                localStorage.setItem("institute", action.institute);
                return {
                    ...state,
                    institute: action.institute,
                };
            }

            case "setBasicDetails": {
                return {
                    ...state,
                    basicDetails: !state.basicDetails,
                };
            }

            case "changeUserAnswers": {
                state.userAnswers[action.index] = {
                    questionId: action.questionId,
                    choosenAnswer: action.optionId,
                };

                return { ...state };
            }

            case "changeUserAnsText": {
                state.userAnswers[action.index] = {
                    questionId: action.questionId,
                    choosenAnswer: action.optionValue,
                };

                return { ...state };
            }

            case "changeCurrentIdx": {
                return {
                    ...state,
                    currentIdx: action.toIndex,
                };
            }

            case "increaseCurrentIdx": {
                return {
                    ...state,
                    currentIdx: state.currentIdx + 1,
                };
            }

            case "incrementScore": {
                return {
                    ...state,
                    score: state.score + action.incrementValue,
                };
            }

            default: {
                return state;
            }
        }
    };

    const [superState, dispatch] = useReducer(reducer, {
        name: "",
        institute: "",
        basicDetails: false,
        questionsList: resData.questions,
        userAnswers: [],
        currentIdx: 0,
        quizCompleted: false,
        score: 0,
    });

    useEffect(() => console.log(superState), [superState]);

    useEffect(() => {
        if (
            localStorage.getItem("username") &&
            localStorage.getItem("institute")
        ) {
            dispatch({
                type: "changeName",
                name: localStorage.getItem("username"),
            });
            dispatch({
                type: "changeInstitute",
                institute: localStorage.getItem("institute"),
            });
            dispatch({ type: "setBasicDetails" });
        }
    }, []);

    return (
        <>
            <Head>
                <title>{resData.title} - Pointform</title>
            </Head>

            <main>
                {superState.basicDetails === false ? (
                    <UserForm
                        name={superState.name}
                        institute={superState.institute}
                        dispatchFn={dispatch}
                    />
                ) : superState.currentIdx < superState.questionsList.length ? (
                    <Quiz
                        currentIndex={superState.currentIdx}
                        quizTitle={resData.title}
                        questionsList={superState.questionsList}
                        userAnswers={superState.userAnswers}
                        dispatchFn={dispatch}
                    />
                ) : (
                    <FinalPage
                        finalData={{
                            participantId: localStorage.getItem("userId"),
                            fvid: resData.fvid,
                            name: superState.name,
                            institute: superState.institute,
                            questions: superState.userAnswers,
                            finalScore: superState.score,
                        }}
                    />
                )}
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let data: ApiResData;

    try {
        data = 
        await fetch(`/api/participant/form`,{
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
            body: JSON.stringify({
                fvid: context.params.fvid,
            })
        }).then(res => res.json())
        console.log(data.questions[0].options);
    } catch (e) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }

    if (data === undefined) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    } else {
        return {
            props: {
                resData: data,
            },
        };
    }
};
