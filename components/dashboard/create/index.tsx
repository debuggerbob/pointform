import { useState, useReducer, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import gsap from "gsap";

/* Main Components */
import { ProfileMenu } from "@/components/profileMenu";
import { FirstScreen } from "./FirstScreen";
import { Questionnarie } from "./Questionnaire";
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
	const container = useRef<HTMLDivElement>();
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
			gsap.to(container.current, {
				opacity: 1,
				duration: 0.4,
				ease: "power0",
			});
		}, 150);
	}, []);

	let isCompleted = true;

	const [showLinks, setShowLinks] = useState(false);

	return (
		<div ref={container}>
			{/* Popup Start 
            ------------------*/}
			{showTitlePopup
				? // <div className={styles.quiz_title_popup}>
				  // 	<div className={styles.container}>
				  // 		<div className={styles.container__head}>
				  // 			<h3 className={styles.container__head__heading}>
				  // 				Create a New Survey
				  // 			</h3>
				  // 			<Link href='/dashboard'>
				  // 				<a className={styles.container__head__close}>
				  // 					{/* Sorry that i used unicode, it is just for temp :( - programmer2 */}
				  // 					&#10005;
				  // 				</a>
				  // 			</Link>
				  // 		</div>

				  // 		<form onSubmit={handlePopupFormSubmit}>
				  // 			<div className={styles.container__form}>
				  // 				<label
				  // 					className={styles.container__form__label}
				  // 					htmlFor='quiz_title'>
				  // 					Give it a name
				  // 				</label>

				  // 				<input
				  // 					className={styles.container__form__input}
				  // 					id='quiz_title'
				  // 					type='text'
				  // 					value={superState.quizTitle}
				  // 					onChange={(e) =>
				  // 						dispatch({
				  // 							type: "changeQuizTitle",
				  // 							title: e.target.value,
				  // 						})
				  // 					}
				  // 				/>
				  // 			</div>

				  // 			<span
				  // 				className={
				  // 					superState.quizTitle.length === 0 ||
				  // 					superState.quizTitle.length < 3
				  // 						? `${styles.container__form__input__error} ${styles.show}`
				  // 						: styles.container__form__input__error
				  // 				}>
				  // 				{superState.quizTitle.length < 3
				  // 					? "Title should be a minimum 3 letters"
				  // 					: "Title field is empty"}
				  // 			</span>

				  // 			<div className={styles.container__submit}>
				  // 				<button
				  // 					type='submit'
				  // 					className={
				  // 						superState.quizTitle.length < 3
				  // 							? `${styles.container__submit__btn} ${styles.disabled}`
				  // 							: styles.container__submit__btn
				  // 					}>
				  // 					{creatingQuiz ? "Creating..." : "Create"}
				  // 				</button>
				  // 			</div>
				  // 		</form>
				  // 	</div>
				  // </div>
				  null
				: null}
			{/* Popup end
            ------------------*/}

			{/* Header Start 
            ------------------*/}
			<header className='fixed top-0 left-0 w-full  bg-white flex justify-between items-center border-b border-gray-200 z-50 md:h-px70'>
				{/* Col1
            	------------------*/}
				<div className='col1 pl-percent5 py-4 w-2/4 max-w-xs'>
					{!isCompleted ? (
						<h1 className='text-base font-medium'>Pointform</h1>
					) : (
						<>
							{/* Form title container */}
							<div className='flex items-center'>
								<Link href='/dashboard'>
									<a className='mr-4'>
										<svg width={24} height={24} fill='none'>
											<path
												d='M4.25 12.274h15M10.3 18.299l-6.05-6.024L10.3 6.25'
												stroke='#4A5568'
												strokeWidth={1.5}
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</a>
								</Link>

								<input
									type='text'
									name='forrTitle'
									placeholder='Form title'
									className='px-2 py-1 w-full text-gray-800 placeholder-gray-500 border rounded border-tra transition focus:border-indigo-500'
								/>
							</div>
						</>
					)}
				</div>

				{/* Col2
            	------------------*/}
				<div className='col2 relative'>
					{/* Toggle Button */}
					<button
						className='p-4 md:hidden'
						onClick={() => {
							setShowLinks(!showLinks);
						}}>
						<svg width={24} height={24} fill='none'>
							<path
								clipRule='evenodd'
								d='M16.286 2h3.266A2.46 2.46 0 0122 4.47v3.294c0 1.363-1.096 2.47-2.448 2.47h-3.266a2.46 2.46 0 01-2.45-2.47V4.47A2.46 2.46 0 0116.287 2zM4.449 2h3.265a2.46 2.46 0 012.45 2.47v3.294a2.46 2.46 0 01-2.45 2.47H4.45A2.46 2.46 0 012 7.764V4.47A2.46 2.46 0 014.449 2zM4.449 13.766h3.265a2.46 2.46 0 012.45 2.47v3.294A2.46 2.46 0 017.713 22H4.45A2.46 2.46 0 012 19.53v-3.293a2.46 2.46 0 012.449-2.471zM16.286 13.766h3.266c1.352 0 2.448 1.106 2.448 2.47v3.294A2.46 2.46 0 0119.552 22h-3.266a2.46 2.46 0 01-2.45-2.47v-3.293a2.46 2.46 0 012.45-2.471z'
								stroke='#200E32'
								strokeWidth={1.5}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>

					{/* Link container */}
					<div
						className={`absolute h-0 bg-white top-14 right-4 border rounded transition duration-300 overflow-hidden border-gray-300 z-20 ${
							showLinks
								? "opacity-100 h-36 px-1 py-4"
								: "opacity-0"
						} md:relative md:opacity-100 md:flex md:h-full md:top-0 md:right-0 md:border-none `}>
						{/* Item1
						-------------- */}
						<div className='flex align-center px-6 py-4 cursor-pointer group md:py-3 md:flex-col md:items-center  hover:bg-gray-100'>
							<svg
								width={20}
								height={20}
								fill='none'
								className='mr-3 md:mr-0 md:mb-1'>
								<path
									className='stroke-current text-gray-600 transition group-hover:text-gray-900'
									d='M10 4.167v11.666M4.167 10h11.666'
									strokeWidth={1.5}
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>

							<span className='text-gray-500 font-normal transition tracking-wide group-hover:text-gray-900 md:text-sm'>
								Insert
							</span>
						</div>

						{/* Item2
						-------------- */}
						<div className='flex align-center px-6 py-4 cursor-pointer group md:py-3 md:flex-col md:items-center  hover:bg-gray-100'>
							<svg
								width={20}
								height={20}
								fill='none'
								className='mr-3 md:mr-0 md:mb-1'>
								<path
									className='stroke-current text-gray-600 transition group-hover:text-gray-900'
									d='M13.213 6.768l-4.72 4.751m0 0L2.967 8.118c-.724-.446-.577-1.546.239-1.782L16.252 2.54c.742-.215 1.428.48 1.206 1.226l-3.871 13.032c-.243.816-1.33.957-1.77.23l-3.324-5.509z'
									strokeWidth={1.5}
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>

							<span className='text-gray-500 font-normal transition tracking-wide group-hover:text-gray-900 md:text-sm'>
								Publish
							</span>
						</div>
					</div>
				</div>

				{/* Col3
            	------------------*/}
				<div className='col3 pr-percent5'>
					<ProfileMenu currentUsername='Nostalgia' />
				</div>
			</header>
			{/* Header End
            ------------------ */}

			<main className='pt-px70 mx-10 xs:mx-auto xs:max-w-400 xs:px-4 sm:mx-auto sm:px-8 sm:max-w-540  md:max-w-680 md:px-24 lg:max-w-900 lg:px-20'>
				<DummyContainer />

				{/* <FirstScreen /> */}
				<Questionnarie />

				<DummyContainer />
			</main>
		</div>
	);
};

const DummyContainer = () => {
	return <div className='h-12 xs:h-16 sm:h-24 md:h-32 lg:h-38'></div>;
};
