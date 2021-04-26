import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./index.module.scss";

interface Props {
	activePage: string;
}

export const CreatorHeader: React.FC<Props> = ({ activePage }) => {
	const router = useRouter();
	const [quizName, setQuizName] = useState<string>("");

	const handleChange = (e: { target: { value: string } }) => {
		setQuizName(e.target.value);
	};

	console.log(router.query.pageId);
	return (
		<header className={styles.header}>
			<div
				className={`${styles.header__col} ${styles.header__col__col1}`}>
				<Link href='/dashboard/home'>
					<a>Go back</a>
				</Link>

				<input type='text' value={quizName} onChange={handleChange} />
			</div>

			<div
				className={`${styles.header__col} ${styles.header__col__col2}`}>
				<ul>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<div
				className={`${styles.header__col} ${styles.header__col__col3}`}></div>
		</header>
	);
};
