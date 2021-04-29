import Link from "next/link";

export const NewQuizCard: React.FC = () => {
	return (
		<div className="flex flex-col bg-gradient-to-br from-yellow-300 to-yellow-500 text-white w-200 h-200 rounded-md p-4 lg:mr-4 md:mr-4 mb-4">
			<div className="flex flex-col justify-center items-center h-3/4">
				<h4 className="text-lg font-medium mb-2">Create a</h4>
				<h3 className="text-xl font-semibold">New Quiz</h3>
			</div>
			<div className="h-1/4 flex justify-end">
				<Link href='/dashboard/create'>
					<a>
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
		</div>
	);
};
