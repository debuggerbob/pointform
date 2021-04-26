import Link from "next/link";

import styles from "../../../../styles/dashboard/index.module.scss";

export const NewQuizCard: React.FC = () => {
	return (
		<div className={styles.quiz_card}>
			<Link href='/dashboard/create'>
				<a className={styles.new_quiz}>
					<h4>
						<span className={styles.sub_heading__1}>Create a</span>
						<span className={styles.sub_heading__2}>New Quiz</span>
					</h4>

					<svg width={19} height={19} fill='none'>
						<path
							d='M9.5 2v14.986M17 9.493H2'
							stroke='#fff'
							strokeWidth={3.068}
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</a>
			</Link>
		</div>
	);
};
