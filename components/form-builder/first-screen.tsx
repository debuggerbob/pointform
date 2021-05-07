import { useRef } from "react";
import gsap from "gsap";

export const FirstScreen = () => {
	const container = useRef<HTMLDivElement>();
	const main = useRef<HTMLDivElement>();

	const handleSubmit = (e) => {
		e.preventDefault();

		gsap.to(container.current, {
			height: 0,
			duration: 0.25,
			ease: "power0",
		});
	};

	return (
		<div
			ref={container}
			className='wrapper flex flex-col justify-center max-w-400 overflow-hidden'>
			<p className='text-gray-700 font-body md:text-lg'>
				Before we start let’s give your form a{" "}
				<span className='text-indigo-500'>name</span> for people to
				identify it easily.
			</p>

			<form className='mt-16' onSubmit={handleSubmit}>
				<div className='mb-12'>
					<label
						htmlFor='title'
						className='font-medium text-gray-900'>
						Title
					</label>

					<input
						type='text'
						id='title'
						placeholder='Your form name'
						className='mt-4 pb-1 w-full text-3xl font-body border-b border-gray-400 text-black placeholder-gray-300 transition focus:border-gray-600'
						autoFocus
					/>
				</div>

				<div className='flex items-center'>
					<button
						className='mr-5 px-5 py-3 rounded bg-gray-900 text-white font-normal tracking-wider transition transform hover:bg-black hover:-translate-y-2 focus:bg-black focus:-translate-y-2'
						type='submit'>
						Create
					</button>

					<div className='flex items-center'>
						<span className='mr-2 text-gray-600'>
							press <span className='font-medium'>Enter</span>
						</span>

						<svg width={16} height={16} fill='none'>
							<path
								d='M4.74 8.333l2.07-2.069a.583.583 0 00-.783-.863l-.042.038-3.064 3.064a.583.583 0 00-.038.784l.038.041 3.064 3.064a.584.584 0 00.863-.783l-.038-.041L4.742 9.5h2.591c1.114 0 2.152-.248 3.053-.722l.134-.073a5.672 5.672 0 002.185-2.185c.522-.931.795-2.017.795-3.187a.583.583 0 00-1.167 0c0 .974-.223 1.863-.646 2.616a4.504 4.504 0 01-1.738 1.738c-.712.4-1.544.621-2.454.645l-.162.001H4.741z'
								fill='#555'
							/>
						</svg>
					</div>
				</div>
			</form>
		</div>
	);
};
