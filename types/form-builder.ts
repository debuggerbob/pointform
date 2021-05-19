export interface Question {
    questionId: number;
    questionType: QuestionType;
    question: string;
    required: boolean;
    options: {
        optionId: number;
        value: string;
        score: number;
    }[];
    showScore: boolean;
}

export interface State {
    formTitle: string;
    questionList: Question[] | [];
    showChooseQuestionScreen: boolean;
}

export interface Action {
    type: ActionType;
    data?: any;
}

export enum ActionType {
    ToggleChooseQuestion = "ToggleShowChooseQuestion",
    UpdateFormTitle = "UpdateFormTitle",
    AddQuestion = "AddNewQuestion",
    DeleteQuestion = "DeleteQueston",

    UpdateQuestion = "UpdateQuestion",
    AddMcqOption = "AddMcqOption",
    DeleteMcqOption = "DeleteMcqOption",
    UpdateOption = "UpdateOptionValue",

    ToggleShowScore = "ToggleShowScore",
    UpdateScore = "UpdateScoreValue",

    ToggleIsRequired = "ToggleIsRequired",
}

export enum QuestionType {
    Mcq = "MCQ",
    Tf = "TF",
}

export enum ToggleType {
    ChooseQuestion = "ShowChooseQuestion",
    ShowScore = "ShowScore",
    IsRequired = "IsRequired",
}

export enum AddType {
    Question = "AddNewQuestion",
    McqOption = "AddMcqOption",
}

export enum UpdateType {
    FormTitle = "UpdateFormTitle",
    Question = "UpdateQuestion",
    Mcq = "UpdateMcqOption",
    Description = "UpdateDescription",
}

export enum DeleteType {
    Question = "DeleteQuestion",
    Mcq = "DeleteMcqOption",
}
