import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import styles from "@/styles/dashboard/index.module.scss";

interface Props {
	qvid: string;
	quizTitle: string;
	responses: number;
	refreshData: () => void;
	updatedAt: string;
}

export const RegularQuizCard: React.FC<Props> = ({
	qvid,
	quizTitle,
	responses,
	refreshData,
	updatedAt,
}) => {
	const ref = useRef(null);
	const footer_menu = useRef();
	const [showFooterMenu, setShowFooterMenu] = useState<boolean>(false);
	const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
	const [deletingStatus, setDeletingStatus] = useState<boolean>(false);

	const handleFooterMenuClick = () => {
		showFooterMenu === false
			? setShowFooterMenu(true)
			: setShowFooterMenu(false);
	};

	const footer_menu_animation = (
		node1: string,
		width: number,
		opacity: number,
		padding: string | number
	) => {
		return gsap.to(node1, {
			duration: 0.35,
			ease: "power3",
			width: width,
			opacity: opacity,
			padding: padding,
		});
	};

	useEffect(() => {
		if (showFooterMenu) {
			footer_menu_animation(
				footer_menu.current,
				150,
				1,
				"24px 26px 15px"
			);
		} else if (!showFooterMenu) {
			footer_menu_animation(footer_menu.current, 0, 0, 0);
		}

		// Check for any outside clicks
		const handleClickOutside = (e: { target: any }) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setShowFooterMenu(false);
			}
		};
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showFooterMenu]);

	/* Hiding footer menu if delete button is clicked
    ---------------------------------------------------------- */
	const handleFooterMenuDelete = () => {
		setShowFooterMenu(false);
		setShowDeletePopup(true);

		document.body.style.overflow = "hidden";
	};

	/* Function to delete quiz 
    -------------------------------------*/
	const handleFormDelete = async () => {
		setDeletingStatus(true);

		let res = await fetch("http://localhost:3000/api/quiz", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				qvid: qvid,
			}),
		});

		if ((await res.status) === 200) {
			setDeletingStatus(false);
			setShowDeletePopup(false);

			refreshData();
		}

		document.body.style.overflow = "auto";
	};

	return (
		<>
			<div ref={ref} className={styles.quiz_card}>
				<div className={styles.quiz}>
					<div className={styles.quiz__top}>
						<h4 className={styles.quiz__top__quiz_title}>
							{quizTitle}
						</h4>

						<div className={styles.quiz__top__image}>
							<Image
								src='/images/background.jpg'
								alt='My Cool quiz'
								width={125}
								height={120}
							/>
						</div>
						<span className={styles.quiz__top__overlay}></span>
					</div>

					<div className={styles.quiz__bottom}>
						<div className={styles.section1}>
							<h5 className={styles.section1__responses}>
								<span
									className={
										styles.section1__responses__count
									}>
									{responses}
								</span>
								Responses
							</h5>

							<span className={styles.section1__updated_at}>
								{updatedAt}
							</span>
						</div>

						<div className={styles.section_btn}>
							<button onClick={handleFooterMenuClick}>
								<svg width={4} height={15} fill='none'>
									<path
										d='M1.59 9.09a1.59 1.59 0 100-3.181 1.59 1.59 0 000 3.182zM1.59 3.182A1.59 1.59 0 101.59 0a1.59 1.59 0 000 3.182zM1.59 15a1.59 1.59 0 100-3.182 1.59 1.59 0 000 3.182z'
										fill='#878787'
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Footer menu
                -------------------*/}
				<div className={styles.footer_menu}>
					<ul ref={footer_menu} className={styles.footer_menu__list}>
						<li>
							<button>
								<span>Rename</span>
							</button>
						</li>

						<li>
							<Link href='/share'>
								<a>
									<span>Share</span>
								</a>
							</Link>
						</li>

						<li>
							<Link href='/results'>
								<a>
									<span>Results</span>
								</a>
							</Link>
						</li>

						<li>
							<button onClick={handleFooterMenuDelete}>
								<span>Delete</span>
							</button>
						</li>
					</ul>
				</div>
			</div>

			{/* Delete Popup
            --------------------- */}
			<div
				className={
					showDeletePopup
						? `${styles.delete_popup} ${styles.show}`
						: styles.delete_popup
				}>
				<div className={styles.container}>
					<h3>Delete this form ?</h3>
					<h4>
						You are about to delete{" "}
						<span className={styles.form_name}>{quizTitle}</span>
					</h4>
					<p>
						It will be{" "}
						<span className={styles.highlight}>gone forever</span>{" "}
						and we won't be able to recover it.
					</p>

					<div className={styles.form_bottom}>
						<button
							className={styles.cancel}
							onClick={() => setShowDeletePopup(false)}>
							Cancel
						</button>
						<button
							className={styles.delete}
							onClick={handleFormDelete}>
							{deletingStatus ? "Deleting..." : "Yes, delete it"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
