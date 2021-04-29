import Link from "next/link";
import { useState } from "react"

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

	const [showResponses, setShowResponses] = useState(false)
	
	const handleResponsesContainer = () => {
		setShowResponses(!showResponses)
	}

	return (
		<li className="flex flex-wrap justify-between align-center w-full border-b border-gray-200">
			<div className="w-1/3 my-4">
				<h4 className="text-xl text-gray-800">
					<Link href='/'>
						<a>{quizTitle.substring(0, 25)}</a>
					</Link>
				</h4>
				<span className="text-xs text-gray-400">{updatedAt}</span>
			</div>

			<div className="hidden justify-end w-1/3 my-4 lg:flex md:flex">
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
				<span className="ml-1">Only You</span>
			</div>

			<div className="w-1/3 my-4 flex justify-end">
				<button onClick={handleResponsesContainer} className="flex justify-between rounded-md p-2 focus:outline-none text-sm">
					View Responses
					<svg className="h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
					</svg>
				</button>
			</div>

			{
				showResponses ? 
				<div className="flex justify-between align-center w-full bg-gray-50 p-4 mb-4 mt-2">No Responses found!</div> : 
				<></>
			}

		</li>
	);
};
