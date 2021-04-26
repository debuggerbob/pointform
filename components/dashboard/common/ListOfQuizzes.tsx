import Link from "next/link";
import styles from "../../../styles/dashboard/index.module.scss";

interface Props {
	quizTitle: string;
	updatedAt: number | string;
	responses: number;
	acceptingResponses: boolean;
}

export const QuizListItem: React.FC<Props> = ({
	quizTitle,
	updatedAt,
	responses,
	acceptingResponses,
}) => {
	return (
		<li className={styles.quiz_list__content__list_item}>
			<div className={`${styles.col} ${styles.col1}`}>
				<h4 className={styles.quiz__heading}>
					<Link href='/'>
						<a>{quizTitle}</a>
					</Link>
				</h4>
				<span className={styles.quiz__updated_at}>{updatedAt}</span>
			</div>

			<div className={`${styles.col} ${styles.col2}`}>
				<span className={styles.quiz_response__count}>{responses}</span>
				<span className={styles.quiz_response__text}>Responses</span>
			</div>

			<div className={`${styles.col} ${styles.col3}`}>
				{acceptingResponses ? (
					<>
						<svg width={20} height={20} fill='none'>
							<path
								d='M13.687 4.635a3.795 3.795 0 00-3.585-2.552A3.793 3.793 0 006.293 5.86V7.665'
								stroke='#24A148'
								strokeOpacity={0.73}
								strokeWidth={1.5}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								clipRule='evenodd'
								d='M13.277 17.5H6.91a3.16 3.16 0 01-3.16-3.16v-3.574a3.16 3.16 0 013.16-3.16h6.367a3.16 3.16 0 013.16 3.16v3.573a3.16 3.16 0 01-3.16 3.161z'
								stroke='#24A148'
								strokeOpacity={0.73}
								strokeWidth={1.5}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M10.094 11.627v1.852'
								stroke='#24A148'
								strokeOpacity={0.73}
								strokeWidth={1.5}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<span>Accpeting Responses</span>
					</>
				) : (
					<>
						<svg width={20} height={20} fill='none'>
							<path
								d='M13.686 7.873V6.084a3.793 3.793 0 00-3.792-3.792 3.792 3.792 0 00-3.809 3.775v1.807'
								stroke='#DA1E28'
								strokeOpacity={0.73}
								strokeWidth={1.5}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								clipRule='evenodd'
								d='M13.07 17.708H6.701a3.16 3.16 0 01-3.16-3.16v-3.574a3.16 3.16 0 013.16-3.16h6.367a3.16 3.16 0 013.16 3.16v3.574a3.16 3.16 0 01-3.16 3.16z'
								stroke='#DA1E28'
								strokeOpacity={0.73}
								strokeWidth={1.5}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M9.886 11.836v1.85'
								stroke='#DA1E28'
								strokeOpacity={0.73}
								strokeWidth={1.5}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<span>Only You</span>
					</>
				)}
			</div>
		</li>
	);
};
