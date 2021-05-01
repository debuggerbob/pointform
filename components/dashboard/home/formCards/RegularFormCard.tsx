import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import styles from "@/styles/dashboard/index.module.scss";

interface Props {
	fvid: string;
	quizTitle: string;
	responses: number;
	refreshData: () => void;
	updatedAt: string;
}

export const RegularFormCard: React.FC<Props> = ({
	fvid,
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

		let res = await fetch(`/api/form`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fvid: fvid,
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
			<div ref={ref} className="relative my-4 lg:my-0 md:my-0">
				<div className="flex flex-col bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 text-white w-150 h-200 rounded-md p-4 lg:mr-4 md:mr-4 mb-4">
					<div className="flex justify-center items-center h-3/4">
						<h3 className="text-lg">{quizTitle.substring(0, 25)}...</h3>
					</div>
					<div className="h-1/4 flex justify-end">
						<button onClick={handleFooterMenuClick} className="text-white w-10 h-10 flex items-center justify-center focus:outline-none">
							<svg width={4} height={15}>
								<path
									d='M1.59 9.09a1.59 1.59 0 100-3.181 1.59 1.59 0 000 3.182zM1.59 3.182A1.59 1.59 0 101.59 0a1.59 1.59 0 000 3.182zM1.59 15a1.59 1.59 0 100-3.182 1.59 1.59 0 000 3.182z'
									fill='#ffffff'
								/>
							</svg>
						</button>
					</div>
				</div>
				
				<div className="absolute left-0 shadow z-30">
					<ul ref={footer_menu} className="bg-white opacity-0 w-0 h-200 list-none p-0 shadow rounded-md">
						<li className="my-2">
							<button className="border-0 bg-transparent cursor-pointer text-gray-800">
								<span>Rename</span>
							</button>
						</li>

						<li className="my-2">
							<Link href='/share'>
								<a className="text-gray-800">
									<span>Share</span>
								</a>
							</Link>
						</li>

						<li className="my-2">
							<Link href='/results'>
								<a className="text-gray-800">
									<span>Results</span>
								</a>
							</Link>
						</li>

						<li className="my-2">
							<button onClick={handleFooterMenuDelete} className="border-0 bg-transparent cursor-pointer text-gray-800">
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
