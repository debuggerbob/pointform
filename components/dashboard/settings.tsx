import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext"
import Alert from "@/components/alert";

interface Props {
	creatorData: {
		uid: string;
		email: string;
		name: string;
	};
}

export const Settings: React.FC<Props> = ({ creatorData }) => {
	const router = useRouter();
	const { updateEmail, updatePassword } = useAuth()
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleUpdateEmail = async (e) => {
        e.preventDefault();
		await updateEmail(emailRef.current?.value)
			.then(() =>  {
				setMessage("Your Email has been updated successfully!")
			})
			.catch(error => {
				setLoading(false)
				setMessage(error.message)
			})
	}

	const handleUpdatePassword = async (e) => {
        e.preventDefault();
		await updatePassword(passwordRef.current?.value)
			.then(() =>  {
				setMessage("Your Password has been updated successfully!")
			})
			.catch(error => {
				setLoading(false)
				setMessage(error.message)
			})
	}

	return (
		<>
			<h1 className="text-2xl text-gray-800">Account Settings</h1>
			{message ?
				<Alert alertText={message} alertType="error" />
			: (
				<></>
			)}
			<h1 className="text-xl text-gray-600 mt-6">Update Email</h1>
			<form onSubmit={handleUpdatePassword}>
				<div className="flex flex-col align-center lg:flex-row md:flex-row">
					<div className="mt-4">
						<input
							type="email"
							id="user_email"
							name="user_email"
							defaultValue={creatorData.email}
							placeholder="Email address"
							className="p-4 border-2 border-gray-200 rounded-md outline-none focus:border-indigo-600"
							ref={emailRef}
						/>
					</div>
					<div className="mt-4 lg:ml-4 md:ml-4">
						<button
							type="submit"
							onClick={handleUpdateEmail}
							className="bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75"
						>
							{loading ? "Updating..." : "Update Email"}
						</button>
					</div>
				</div>
			</form>

			<h1 className="text-xl text-gray-600 mt-6">Update Password</h1>
			<form onSubmit={handleUpdatePassword}>
				<div className="flex flex-col align-center lg:flex-row md:flex-row">
					<div className="mt-4">
						<input
							type="password"
							id="update_password"
							name="update_password"
							placeholder="New password"
							className="p-4 border-2 border-gray-200 rounded-md outline-none focus:border-indigo-600"
							ref={passwordRef}
						/>
					</div>
					<div className="mt-4 lg:ml-4 md:ml-4">
						<button
							type="submit"
							onClick={handleUpdatePassword}
							className="bg-gray-900 text-white p-4 rounded-md hover:bg-gray-800 delay-75"
						>
							{loading ? "Updating..." : "Update Password"}
						</button>
					</div>
				</div>
			</form>
		</>
	);
};
