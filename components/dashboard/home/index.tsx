import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

/* Main Components */
import { NewQuizCard } from "./quizCards/NewQuizCard";
import { RegularQuizCard } from "./quizCards/RegularQuizCard";
import { QuizListItem } from "../common/ListOfQuizzes";

/* Styles */
import styles from "@/styles/dashboard/index.module.scss";
interface Props {
	creatorData: {
		uid: string;
		email: string;
		name: string;
	};
}

export const Home: React.FC<Props> = ({ creatorData }) => {
	const router = useRouter();
	const [quizzes, setQuizzes] = useState([]);
	const [greeting, setGreeting] = useState<string>("");

	console.log(creatorData)

	const fetcher = (args) => fetch(args).then((res) => res.json());
	const { data: quiz, error } = useSWR(
		`/api/quizzes/${creatorData?.uid}`,
		fetcher
	);

	console.log(quiz)

	const refreshData = () => {
		router.replace(router.asPath);
	};

	const setGreetings = (): void => {
		let myDate, hrs, greet: string;

		myDate = new Date();
		hrs = myDate.getHours();

		if (hrs < 12) {
			greet = "Good Morning";
		} else if (hrs >= 12 && hrs <= 17) {
			greet = "Good Afternoon";
		} else if (hrs >= 17 && hrs <= 24) {
			greet = "Good Evening";
		}

		setGreeting(greet);
	};

	useEffect(() => {
		setGreetings();
		if (quiz) {
			setQuizzes(quiz.data);
			console.log(quizzes)
			refreshData();
		}
	}, [quiz]);

	return (
		<>
			<h1 className={styles.heading}>{greeting}</h1>
			<div className={styles.recents_container}>
				<h2 aria-hidden='true' className={styles.aria_hidden}>
					Quizzes
				</h2>
				<h3 className={styles.recents_container__heading}>Recent</h3>

				<div className={styles.recents_container__quizzes}>
					<NewQuizCard />
					{quizzes && quizzes.length > 0
						? quizzes.map((item) => (
								<RegularQuizCard
									key={item.qvid}
									qvid={item.qvid}
									quizTitle={item.title}
									responses={item.responses}
									refreshData={refreshData}
									updatedAt={item.lastUpdated}
								/>
						  ))
						: ""}
				</div>
			</div>

			<div className={styles.quiz_list}>
				<h3 className={styles.quiz_list__heading}>Your Quizzes</h3>

				<ul className={styles.quiz_list__content}>
					{quizzes && quizzes.length > 0
						? quizzes.map((item) => (
								<QuizListItem
									key={item._id}
									quizTitle={item.title}
									updatedAt={item.lastUpdated}
									responses={item.responses}
									acceptingResponses={item.acceptingResponses}
								/>
						  ))
						: "No quizzes found!"}
				</ul>
			</div>
		</>
	);
};
