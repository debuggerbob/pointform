import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// Components
import { QuizListItem } from "../common/ListOfQuizzes";

// Styles
import styles from "../../../styles/dashboard/index.module.scss";

interface Props {
	creatorData: {
		uid: string;
		email: string;
		name: string;
	};
}

export const Responses: React.FC<Props> = ({ creatorData }) => {
	const router = useRouter();
	const [forms, setForms] = useState([]);

	console.log('c', creatorData)
	
	const fetcher = (args) => fetch(args).then((res) => res.json());
	const { data: quiz, error } = useSWR(
		`/api/quizzes/${creatorData?.uid}`,
		fetcher
	);

	const refreshData = () => {
		router.replace(router.asPath);
	};

	useEffect(() => {
		if (quiz) {
			setForms(quiz.data);
			refreshData();
		}
	}, [quiz]);

	return (
		<>
			<h1 className="text-2xl text-gray-800">Your Quizzes</h1>

			<ul className={styles.quiz_list__content}>
				{forms && forms.length > 0
					? forms.map((quiz) => (
						<QuizListItem
							key={quiz.id}
							quizTitle={quiz.title}
							updatedAt={quiz.lastUpdated}
							responses={quiz.responses}
							acceptingResponses={quiz.acceptingResponses}
						/>
						))
					: "No forms found!"}
			</ul>
		</>
	);
};
