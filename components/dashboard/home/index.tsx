import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

/* Main Components */
import { NewFormCard } from "./formCards/NewFormCard";
import { RegularFormCard } from "./formCards/RegularFormCard";
import { FormsList } from "../common/ListOfForms";

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
	const [forms, setForms] = useState([]);
	const [greeting, setGreeting] = useState<string>("");

	console.log(creatorData)

	const fetcher = (args) => fetch(args).then((res) => res.json());
	const { data: form, error } = useSWR(
		`/api/forms/${creatorData?.uid}`,
		fetcher
	);

	console.log(form)

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
		if (form) {
			setForms(form.data);
			console.log(forms)
			refreshData();
		}
	}, [form]);

	return (
		<>
			<h1 className="text-2xl text-gray-800 mb-6">{greeting}</h1>
			<h2 aria-hidden='true' className="sr-only">
				Recent
			</h2>
			<h3 className="text-xl text-gray-600 mb-4">Recent</h3>

			<div className="flex items-center justify-between pr-4 md:pr-0 lg:pr-0 lg:justify-start md:justify-start flex-wrap w-full">
				<NewFormCard />
				{forms && forms.length > 0
					? forms.map((item) => (
							<RegularFormCard
								key={item.fvid}
								fvid={item.fvid}
								quizTitle={item.title}
								responses={item.responses}
								refreshData={refreshData}
								updatedAt={item.lastUpdated}
							/>
						))
					: ""}
			</div>

			<div className={styles.quiz_list}>
				<h3 className={styles.quiz_list__heading}>Your Forms</h3>

				<ul className={styles.quiz_list__content}>
					{forms && forms.length > 0
						? forms.map((item) => (
								<FormsList
									key={item._id}
									quizTitle={item.title}
									updatedAt={item.lastUpdated}
									responses={item.responses}
									acceptingResponses={item.acceptingResponses}
								/>
						  ))
						: "No forms found!"}
				</ul>
			</div>
		</>
	);
};
