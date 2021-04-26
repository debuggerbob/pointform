import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'

import styles from "./header.module.scss";

// Auth
import { useAuth } from '@/context/AuthContext'

export const Nav = () => {

	const [user, setUser] = useState(null)
	const router = useRouter()

	const { logout, currentUser } = useAuth()

	const handleLogout = async () => { 
          await logout()
		  router.reload()
	}

	useEffect(() => {
		if(currentUser?.uid) setUser(currentUser.uid)
	}, [user])
	
	return (
		<nav className={styles.nav}>
			<ul role='navigation' className={styles.nav__links}>
				<li className={styles.nav__links__link}>
					<Link href='/about-us'>
						<a>
							<span className={styles.link_number}>01</span>
							<span className={styles.link_name}>About us</span>
						</a>
					</Link>
				</li>

				<li className={styles.nav__links__link}>
					<Link href='/contact-us'>
						<a>
							<span className={styles.link_number}>02</span>
							<span className={styles.link_name}>Contact us</span>
						</a>
					</Link>
				</li>

				{
					user ?
					<>
						<li className={styles.nav__links__link}>
							<Link href='/dashboard'>
								<a className={styles.dashboard}>
									<span className={styles.link_number}>03</span>
									<span className={styles.link_name}>Dashboard</span>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 20'
										fill='none'>
										<path
											d='M5.83325 14.1667L14.1666 5.83334'
											stroke='#7D7C7C'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M5.83325 5.83334H14.1666V14.1667'
											stroke='#7D7C7C'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</a>
							</Link>
						</li>

						<li className={styles.nav__links__link}>
							<button className={styles.logout} onClick={handleLogout}>
								<span className={styles.link_number}>04</span>
								<span className={styles.link_name}>Logout</span>
								<svg
									width='20'
									height='20'
									viewBox='0 0 20 20'
									fill='none'>
									<path
										d='M5.83325 14.1667L14.1666 5.83334'
										stroke='#7D7C7C'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M5.83325 5.83334H14.1666V14.1667'
										stroke='#7D7C7C'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</li>
					</>
					:
					<>
						<li className={styles.nav__links__link}>
							<Link href='/login'>
								<a className={styles.login}>
									<span className={styles.link_number}>03</span>
									<span className={styles.link_name}>Log in</span>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 20'
										fill='none'>
										<path
											d='M5.83325 14.1667L14.1666 5.83334'
											stroke='#7D7C7C'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M5.83325 5.83334H14.1666V14.1667'
											stroke='#7D7C7C'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</a>
							</Link>
						</li>

						<li className={styles.nav__links__link}>
							<Link href='/signup'>
								<a className={styles.signup}>
									<span className={styles.link_number}>04</span>
									<span className={styles.link_name}>Sign up</span>
									<svg
										width='20'
										height='20'
										viewBox='0 0 20 20'
										fill='none'>
										<path
											d='M5.83325 14.1667L14.1666 5.83334'
											stroke='#7D7C7C'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M5.83325 5.83334H14.1666V14.1667'
											stroke='#7D7C7C'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</a>
							</Link>
						</li>
					</>
				}
			</ul>
		</nav>
	);
};