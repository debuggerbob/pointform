import {
    Action,
    ActionType,
    ToggleType,
    AddType,
    DeleteType,
    QuestionType,
    UpdateType,
} from "@/types/form-builder";

export const Toggle = (type: ToggleType, questionIndex?: number): Action => {
    switch (type) {
        case ToggleType.ChooseQuestion: {
            return { type: ActionType.ToggleChooseQuestion };
        }

        case ToggleType.ShowScore: {
            return {
                type: ActionType.ToggleShowScore,
                data: { questionIndex: questionIndex },
            };
        }

        case ToggleType.IsRequired: {
            return {
                type: ActionType.ToggleIsRequired,
                data: { questionIndex: questionIndex },
            };
        }
    }
};

export const Add = ({
    type,
    questionType,
    questionIndex,
}: {
    type: AddType;
    questionType?: QuestionType;
    questionIndex?: number;
}): Action => {
    switch (type) {
        case AddType.Question: {
            return {
                type: ActionType.AddQuestion,
                data: {
                    questionType: questionType,
                    questionIndex: questionIndex,
                },
            };
        }

        case AddType.McqOption: {
            return {
                type: ActionType.AddMcqOption,
                data: { questionIndex: questionIndex },
            };
        }
    }
};

export const Update = ({
    type,
    updatedValue,
    questionIndex,
    optionIndex,
}: {
    type: UpdateType;
    updatedValue: string;
    questionIndex?: number;
    optionIndex?: number;
}): Action => {
    switch (type) {
        case UpdateType.FormTitle: {
            return {
                type: ActionType.UpdateFormTitle,
                data: { value: updatedValue },
            };
        }

        case UpdateType.Question: {
            return {
                type: ActionType.UpdateQuestion,
                data: {
                    value: updatedValue,
                    questionIndex: questionIndex,
                    optionIndex: optionIndex,
                },
            };
        }

        case UpdateType.Mcq: {
            return {
                type: ActionType.UpdateOption,
                data: {
                    value: updatedValue,
                    questionIndex: questionIndex,
                    optionIndex: optionIndex,
                },
            };
        }
    }
};

export const Delete = ({
    type,
    questionId,
    questionIndex,
    optionId,
}: {
    type: DeleteType;
    questionId: number;
    questionIndex?: number;
    optionId?: number;
}) => {
    switch (type) {
        case DeleteType.Question: {
            return {
                type: ActionType.DeleteQuestion,
                data: {
                    questionId: questionId,
                },
            };
        }

        case DeleteType.Mcq: {
            return {
                type: ActionType.DeleteMcqOption,
                data: {
                    questionIndex: questionIndex,
                    optionId: optionId,
                },
            };
        }
    }
};
