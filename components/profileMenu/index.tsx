import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import * as ani from "animations/Dashboard";

import styles from "./Styles.module.scss";

// Auth
import { useAuth } from '@/context/AuthContext'
import { useRouter } from "next/router";

interface Props {
	currentUsername: string;
}

export const ProfileMenu: React.FC<Props> = ({ currentUsername }) => {
	const menu_link_container = useRef();
	const arrow = useRef();
	const router = useRouter()
	const ref = useRef<HTMLDivElement>(null);
	const [clicked, setClicked] = useState<boolean>(false);

	const [firstName, ...second] = currentUsername.split(" ");
	const { logout } = useAuth()

	const handleClick = () => {
		clicked === false ? setClicked(true) : setClicked(false);
	};

	const handleLogout = async () => {  
		await logout()
		router.push('/')
	}

	useEffect(() => {
		if (clicked) {
			ani.toggle_menu(menu_link_container.current, 325, 1);
			ani.toggleArrow(arrow.current, 180);
		} else if (!clicked) {
			ani.toggle_menu(menu_link_container.current, 0, 0);
			ani.toggleArrow(arrow.current, 0);
		}

		// Check for any outside clicks
		const handleClickOutside = (e: { target: any }) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setClicked(false);
			}
		};
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [clicked]);

	return (
		<div ref={ref} className={styles.menu}>
			<button className={styles.menu__profile} onClick={handleClick}>
				<div className={styles.menu__profile__picture}>
					<Image
						src='/images/background.jpg'
						width={34}
						height={34}
						alt={currentUsername}
					/>
				</div>
				<span className={styles.menu__profile__name}>{firstName}</span>

				<svg
					ref={arrow}
					width='25'
					height='24'
					viewBox='0 0 25 24'
					fill='none'>
					<path
						d='M6.44635 9L12.6309 15L18.8155 9'
						stroke='#262627'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			<ul ref={menu_link_container} className={styles.menu__links}>
				<li className={styles.link__profile_wrapper}>
					<div className={styles.menu__profile__picture}>
						<Image
							src='/images/background.jpg'
							width={32}
							height={32}
							alt='RuthvikasGod Gaaru'
						/>
					</div>

					<div className={styles.profile__ns}>
						<span className={styles.profile__ns__name}>
							{currentUsername}
						</span>

						{/* ---Link to be worked on--- */}
						<Link href='/settings'>
							<a className={styles.profile__ns__settings}>
								Settings
							</a>
						</Link>
					</div>
				</li>

				<li className={styles.link}>
					{/* ---Link to be worked on--- */}
					<Link href='/contact-us'>
						<a>Contact us</a>
					</Link>
				</li>

				<li className={styles.link}>
					{/* ---Link to be worked on--- */}
					<Link href='/about-us'>
						<a>About us</a>
					</Link>
				</li>

				<li className={styles.link}>
					{/* ---Link to be worked on--- */}
					<Link href='/terms-and-conditions'>
						<a>Terms and Conditions</a>
					</Link>
				</li>

				<button className={styles.link__logout} onClick={handleLogout}>
					Logout
				</button>
			</ul>
		</div>
	);
};
