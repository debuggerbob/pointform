import { Dispatch, useEffect, useRef } from "react";
import gsap, { Power1 } from "gsap";

import { Add, Toggle } from "@/store/form-builder/action";
import {
    Action,
    AddType,
    QuestionType,
    ToggleType,
} from "@/types/form-builder";

interface Props {
    dispatch: Dispatch<Action>;
    showScreen: boolean;
}

export const Popup: React.FC<Props> = ({ dispatch, showScreen }) => {
    const question_container = useRef<HTMLDivElement>();

    useEffect(() => {
        gsap.set(question_container.current, {
            translateY: "100%",
            opacity: 0,
        });

        gsap.to(question_container.current, {
            translateY: 0,
            opacity: 1,
            duration: 0.43,
            ease: Power1.easeInOut,
        });
    }, [showScreen]);

    const addQuestion = (questionType: QuestionType) => {
        dispatch(Add({ type: AddType.Question, questionType: questionType }));

        dispatch(Toggle(ToggleType.ChooseQuestion));
    };

    return (
        <div
            className={`${
                !showScreen ? "hidden" : null
            } fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-70 z-50`}
        >
            <div
                ref={question_container}
                className="question_type_container w-full max-w-sm py-4 mx-6 bg-white rounded "
            >
                {/* Search bar (hidden for time being)
                -------------------- */}
                <div className="hidden items-center px-6 pb-2 mb-10 border-b border-gray-300 ">
                    <svg width={18} height={18} fill="none">
                        <circle
                            cx={8.835}
                            cy={8.825}
                            stroke="#718096"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            r={6.741}
                        />
                        <path
                            d="M13.523 13.864l2.643 2.636"
                            stroke="#718096"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search questions..."
                        className="text-base ml-4 placeholder-gray-400 font-body text-900"
                    />
                </div>

                {/* Question types
                ---------------- */}
                <div className="px-3">
                    <h3 className="text-gray-400 mb-3 px-3 text-xs font-bold ">
                        QUESTION TYPE
                    </h3>

                    <div
                        className=" group flex items-center px-3 py-3 cursor-pointer trnasition rounded hover:bg-indigo-50"
                        onClick={() => addQuestion(QuestionType.Mcq)}
                    >
                        <svg
                            width={18}
                            height={17}
                            fill="none"
                            className="fill-current text-gray-700 group-hover:text-indigo-700"
                        >
                            <path d="M0 3.95v1.196a1 1 0 001 1h4.146a1 1 0 001-1V.999a1 1 0 00-1-1H1a1 1 0 00-1 1v2.952zm5.268 0v.318a1 1 0 01-1 1h-2.39a1 1 0 01-1-1V1.877a1 1 0 011-1h2.39a1 1 0 011 1v2.074zM16.359 3.512H8.342a.439.439 0 000 .878h8.017a.439.439 0 100-.878zM17.561.439h-9.22a.439.439 0 000 .878h9.22a.439.439 0 100-.878zM0 14.487v1.195a1 1 0 001 1h4.146a1 1 0 001-1v-4.146a1 1 0 00-1-1H1a1 1 0 00-1 1v2.951zm5.268 0v.317a1 1 0 01-1 1h-2.39a1 1 0 01-1-1v-2.39a1 1 0 011-1h2.39a1 1 0 011 1v2.073zM16.359 14.048H8.342a.439.439 0 100 .878h8.017a.439.439 0 100-.878zM17.561 10.975h-9.22a.439.439 0 000 .878h9.22a.439.439 0 100-.878z" />
                        </svg>

                        <span className="ml-5 font-base text-gray-700 group-hover:text-indigo-700">
                            Multiple Choice
                        </span>
                    </div>

                    <div
                        className=" group flex items-center px-3 py-3 cursor-pointer trnasition rounded hover:bg-indigo-50"
                        onClick={() => addQuestion(QuestionType.Tf)}
                    >
                        <svg
                            width={19}
                            height={18}
                            fill="none"
                            className="fill-current text-gray-700 group-hover:text-indigo-700"
                        >
                            <path d="M12.385 7.5l-2.25-2.25.682-.712 1.59 1.59 3.18-3.18.548.802-3.75 3.75zM8.26 5.25H1.51v1.125h6.75V5.25zm6.75 5.25l-.75-.75-1.5 1.5-1.563-1.302-.75.682L12.01 12l-1.563 1.563.75.75 1.563-1.563 1.562 1.563.75-.75L13.51 12l1.5-1.5zm-6.75 1.125H1.51v1.125h6.75v-1.125z" />
                        </svg>

                        <span className="ml-5 font-base text-gray-700 group-hover:text-indigo-700">
                            True or False
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
