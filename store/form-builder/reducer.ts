import { State, Action, ActionType, QuestionType } from "@/types/form-builder";

export const InitialState: State = {
    formTitle: "untitled",
    questionList: [],
    showChooseQuestionScreen: false,
};

export const FormReducer = (state: State, { type, data }: Action): State => {
    switch (type) {
        //* All Toggle actions below
        // ------------------------------
        case ActionType.ToggleChooseQuestion: {
            return {
                ...state,
                showChooseQuestionScreen: !state.showChooseQuestionScreen,
            };
        }

        case ActionType.ToggleShowScore: {
            state.questionList[data.questionIndex].showScore =
                !state.questionList[data.questionIndex].showScore;

            return {
                ...state,
            };
        }

        case ActionType.ToggleIsRequired: {
            state.questionList[data.questionIndex].required =
                !state.questionList[data.questionIndex].required;

            return { ...state };
        }

        //* All Add actions below
        // ------------------------------
        case ActionType.AddQuestion: {
            const newQuestion = {
                questionId: Math.random(),
                questionType: data.questionType,
                question: "",
                options: [],
                showScore: false,
                required: false,
            };

            if (data.questionType === QuestionType.Mcq) {
                newQuestion.options = [
                    {
                        optionId: Math.random(),
                        value: "",
                        score: 0,
                    },
                ];
            } else if (data.questionType === QuestionType.Tf) {
                newQuestion.options = [
                    { optionId: Math.random(), value: "true", score: 0 },
                    { optionId: Math.random(), value: "false", score: 0 },
                ];
            }

            if (data.questionIndex !== undefined) {
                state.questionList.splice(data.questionIndex, 0, newQuestion);
            } else {
                state.questionList = [...state.questionList, newQuestion];
            }

            return { ...state };
        }

        case ActionType.AddMcqOption: {
            let currentQuestion = state.questionList[data.questionIndex];

            currentQuestion.options = [
                ...currentQuestion.options,
                { optionId: Math.random(), value: "", score: 0 },
            ];

            return { ...state };
        }

        // * All Update actions below
        // ------------------------------
        case ActionType.UpdateFormTitle: {
            localStorage.setItem("form_title", data.value);

            return { ...state, formTitle: data.value };
        }

        case ActionType.UpdateQuestion: {
            state.questionList[data.questionIndex].question = data.value;

            return { ...state };
        }

        case ActionType.UpdateOption: {
            state.questionList[data.questionIndex].options[
                data.optionIndex
            ].value = data.value;
        }

        //* All Delete actions below
        // ------------------------------
        case ActionType.DeleteQuestion: {
            state.questionList = state.questionList.filter((item) => {
                return item.questionId !== data.questionId;
            });

            return { ...state };
        }

        case ActionType.DeleteMcqOption: {
            state.questionList[data.questionIndex].options = state.questionList[
                data.questionIndex
            ].options.filter((item) => {
                return item.optionId !== data.optionId;
            });

            return { ...state };
        }

        default:
            return state;
    }
};
