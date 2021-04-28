import Link from "next/link";

export const NewQuizCard: React.FC = () => {
	return (
		<div className="relative w:1/2 lg:w-1/6 lg:h-full mr-4">
			<Link href='/dashboard/create'>
				<a className="flex flex-col justify-start align-center bg-indigo-500 h-100 rounded-md cursor-pointer p-8 no-underline delay-75 shadow-sm hover:bg-indigo-600 foucs:bg-indigo-600">
					<h4 className="w-full my-8 text-white">
						<span className="block text-lg font-medium mb-2">Create a</span>
						<span className="text-xl font-semibold">New Quiz</span>
					</h4>

					<svg width={19} height={19} fill='none' className="block mt-6">
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
