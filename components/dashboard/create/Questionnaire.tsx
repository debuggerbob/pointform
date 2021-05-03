export const Questionnarie = () => {
	return (
		<div className=''>
			{/* Screen1 
			------------------ */}
			<div className='screen1 hidden'>
				<div className='mb-12'>
					<button className='p-4 flex items-center bg-white transition rounded-full focus:bg-indigo-100'>
						<svg
							width={22}
							height={22}
							fill='none'
							style={{ minWidth: "30px" }}>
							<circle
								className='fill-current text-indigo-500'
								cx={11}
								cy={11}
								r={11}
							/>
							<path
								d='M11 6.111v9.769M15.889 10.995H6.11'
								stroke='#F7FAFC'
								strokeWidth={1.3}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						<p className='font-medium text-gray-500 text-lg ml-3 sm:text-xl'>
							Add question
						</p>
					</button>
				</div>

				<div className='mb-8'>
					<p className=' pb-2 font-body text-gray-800'>
						Congratulations, you have successfully created your form
						🎉.
					</p>
					<p className=' font-body text-gray-800'>
						Now lets add a few questions to complete your form.
					</p>
				</div>

				<div className=' flex items-start'>
					<div className='mr-2'>
						<svg width={22} height={22} fill='none'>
							<path
								className='stroke-current text-gray-600 cursor-pointer'
								clipRule='evenodd'
								d='M12.918 3.3H8.212C6.755 3.3 5.5 4.634 5.5 6.28v8.561c0 1.74 1.173 3.126 2.712 3.126h5.65c1.457 0 2.638-1.479 2.638-3.126V7.516L12.918 3.3z'
								strokeWidth={1.3}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								className='stroke-current text-gray-600 cursor-pointer'
								d='M11.423 4.53v2.51c0 1.224.972 2.218 2.173 2.22 1.114.003 2.254.004 2.331-.001'
								strokeWidth={1.3}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								className='stroke-current text-gray-600 cursor-pointer'
								d='M11.423 4.53v2.51c0 1.224.972 2.218 2.173 2.22 1.114.003 2.254.004 2.331-.001'
								strokeWidth={1.3}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>

					<p className='font-body text-gray-800'>
						Insert a Question block to your form using the{" "}
						<span className='font-bold pt-0 pb-1 px-2 text-indigo-500 bg-indigo-100'>
							+
						</span>{" "}
						button.
					</p>
				</div>
			</div>

			{/* Main Question Screen 
			-------------------------------*/}
			<div className='screen2'>
				<div className='question_container'>
					{/* Question Container
					------------------------- */}
					<div className='group relative mb-3.5 w-max'>
						{/* Buttons container */}
						<div
							className=' absolute -top-2 bg-white flex justify-end transition duration-150 md:opacity-0 group-hover:opacity-100'
							style={{ width: "100px", left: "-100px" }}>
							<div className='add px-1 py-2 hidden md:block'>
								<svg
									width={24}
									height={24}
									fill='none'
									className='stroke-current text-gray-500 cursor-pointer transition hover:text-gray-900'>
									<path
										d='M12 5v14M5 12h14'
										strokeWidth={1.5}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>

							<div className='settings px-1 py-2 hidden md:block'>
								<svg
									width={24}
									height={24}
									fill='none'
									className='stroke-current text-gray-500 cursor-pointer transition hover:text-gray-900'>
									<path
										clipRule='evenodd'
										d='M20.806 7.624l-.622-1.08a1.913 1.913 0 00-2.609-.705v0a1.904 1.904 0 01-2.608-.678 1.83 1.83 0 01-.257-.915v0a1.913 1.913 0 00-1.913-1.968h-1.254A1.904 1.904 0 009.64 4.191v0a1.913 1.913 0 01-1.913 1.886 1.83 1.83 0 01-.915-.257v0a1.913 1.913 0 00-2.609.705l-.668 1.099a1.913 1.913 0 00.696 2.608v0a1.913 1.913 0 010 3.314v0a1.904 1.904 0 00-.696 2.6v0l.632 1.089a1.913 1.913 0 002.608.741v0a1.895 1.895 0 012.6.696c.164.277.253.593.256.915v0c0 1.056.857 1.913 1.913 1.913h1.254c1.053 0 1.908-.85 1.913-1.904v0a1.904 1.904 0 011.913-1.913c.322.009.636.097.916.256v0a1.913 1.913 0 002.608-.695v0l.66-1.099a1.904 1.904 0 00-.696-2.608v0a1.904 1.904 0 01-.696-2.61c.166-.289.406-.529.696-.695v0a1.913 1.913 0 00.695-2.6v0-.008z'
										strokeWidth={1.5}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<circle
										cx={12.175}
										cy={11.889}
										r={2.636}
										strokeWidth={1.5}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>

							<div className='menu px-1 py-2'>
								<svg
									width={24}
									height={24}
									fill='none'
									className='fill-current text-gray-500 cursor-pointer transition hover:text-gray-900'>
									<path d='M15.75 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' />
								</svg>
							</div>
						</div>

						{/* Question container */}
						<div
							contentEditable='true'
							tabIndex={0}
							className='font-medium text-xl leading-5 sm:text-2xl sm:leading-5 text-black w-max'>
							mast question
						</div>
					</div>

					<div
						contentEditable='true'
						tabIndex={0}
						className='text-sm font-body text-gray-700 mb-8 md:text-base'>
						Description (optional)
					</div>

					<div className='answer_container'>
						<div className='options'>
							<div
								className='option flex items-center pl-2.5 pr-4 py-2 mb-3 border border-gray-300 rounded w-max transition focus-within:border-gray-600'
								style={{ minHeight: "35px" }}>
								<div
									className='flex items-center justify-center mr-4 font-bold text-xs text-white bg-gray-800 rounded'
									style={{ width: "20px", height: "20px" }}>
									A
								</div>

								<div
									className='font-body text-gray-500 tracking-wide'
									contentEditable='true'
									placeholder='Choice 1'>
									Choice 1
								</div>
							</div>

							<div
								className='option group flex items-center pl-2.5 pr-4 py-2 mb-3 border border-gray-200 rounded w-max cursor-pointer transition hover:border-gray-500'
								style={{ minHeight: "35px" }}>
								<div
									className='flex items-center justify-center mr-4 font-bold text-xs text-white bg-gray-400 rounded transition group-hover:bg-gray-800'
									style={{ width: "20px", height: "20px" }}>
									{String.fromCharCode("A".charCodeAt(0) + 1)}
								</div>

								<div className='font-body text-gray-400 tracking-wide transition group-hover:text-gray-800'>
									Add option
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
