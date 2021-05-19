import { Dispatch, FormEvent } from "react";
import { Action, UpdateType } from "@/types/form-builder";
import { Update } from "@/store/form-builder/action";

export const handleInput = ({
    e,
    type,
    questionIndex,
    optionIndex,
    dispatch,
}: {
    e: FormEvent<HTMLElement>;
    type: UpdateType;
    questionIndex: number;
    optionIndex?: number;
    dispatch: Dispatch<Action>;
}) => {
    const currentTarget = e.target as Element;

    if (currentTarget.innerHTML === "<br>") {
        currentTarget.innerHTML = "";
    }

    switch (type) {
        case UpdateType.Question: {
            dispatch(
                Update({
                    type: UpdateType.Question,
                    updatedValue: (e.target as Element).innerHTML,
                    questionIndex: questionIndex,
                })
            );

            return;
        }

        case UpdateType.Mcq: {
            dispatch(
                Update({
                    type: UpdateType.Mcq,
                    updatedValue: (e.target as Element).innerHTML,
                    questionIndex: questionIndex,
                    optionIndex: optionIndex,
                })
            );

            return;
        }
    }
};
