import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";

interface Props {
    creatorData: {
        uid: string;
        email: string;
        name: string;
    };
}

export const Home: React.FC<Props> = ({ creatorData }) => {
    const router = useRouter();
    const [forms, setForms] = useState([]);
    const [greeting, setGreeting] = useState<string>("");

    console.log(creatorData);

    const fetcher = (args) => fetch(args).then((res) => res.json());
    const { data: form, error } = useSWR(
        `/api/forms/${creatorData?.uid}`,
        fetcher
    );

    console.log(form);

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const setGreetings = (): void => {
        let myDate, hrs, greet: string;

        myDate = new Date();
        hrs = myDate.getHours();

        if (hrs < 12) {
            greet = "Good Morning";
        } else if (hrs >= 12 && hrs <= 17) {
            greet = "Good Afternoon";
        } else if (hrs >= 17 && hrs <= 24) {
            greet = "Good Evening";
        }

        setGreeting(greet);
    };

    useEffect(() => {
        setGreetings();
        if (form) {
            setForms(form.data);
            console.log(forms);
            refreshData();
        }
    }, [form]);

    return (
        <>
            {/* <h1 className="text-2xl text-gray-800 mb-6">{greeting}</h1>
			<h2 aria-hidden='true' className="sr-only">
				Recent
			</h2>
			<h3 className="text-xl text-gray-600 mb-4">Recent</h3>

			<div className="flex items-center justify-between pr-4 md:pr-0 lg:pr-0 lg:justify-start md:justify-start flex-wrap w-full">
				<NewFormCard />
				{forms && forms.length > 0
					? forms.map((item) => (
							<RegularFormCard
								key={item.fvid}
								fvid={item.fvid}
								quizTitle={item.title}
								responses={item.responses}
								refreshData={refreshData}
								updatedAt={item.lastUpdated}
							/>
						))
					: ""}
			</div>

			<div className={styles.quiz_list}>
				<h3 className={styles.quiz_list__heading}>Your Forms</h3>

				<ul className={styles.quiz_list__content}>
					{forms && forms.length > 0
						? forms.map((item) => (
								<FormsList
									key={item._id}
									quizTitle={item.title}
									updatedAt={item.lastUpdated}
									responses={item.responses}
									acceptingResponses={item.acceptingResponses}
								/>
						  ))
						: "No forms found!"}
				</ul>
			</div> */}

            <section className="border-b border-gray-200 mb-6 md:border-none md:mb-8">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 md:mx-10 md:px-0 md:pt-10 lg:mx-16">
                    <h2 className="text-2xl font-bold md:text-3xl">My Forms</h2>

                    <button className="text-indigo-600 bg-indigo-400 bg-opacity-30 px-4 py-2 rounded transition hover:bg-opacity-20">
                        Create Form
                    </button>
                </div>

                <div className="mx-6 py-5 md:mx-10 md:py-6 lg:mx-16">
                    <form className="search flex items-center border border-gray-300 rounded bg-gray-100 p-2 max-w-xs focus-within:bg-gray-50">
                        <svg
                            width={16}
                            height={16}
                            fill="none"
                            viewBox="0 0 16 16"
                            className="mr-3 stroke-current text-gray-500 w-4"
                        >
                            <circle
                                cx={7.844}
                                cy={7.844}
                                r={5.992}
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12.012 12.323l2.35 2.344"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search for forms..."
                            className="border-none bg-transparent placeholder-gray-500"
                        />
                    </form>
                </div>
            </section>

            <section>
                {forms && forms.length > 0
                    ? forms.map((item) => (
                          <div>
                              <Link href="/">
                                  <a
                                      key={item._id}
                                      className="block mx-6 my-2 py-4 rounded-md hover:bg-gray-100 md:px-6 md:mx-4 md:mb-0 lg:mx-10"
                                  >
                                      <span className="inline-block text-xs font-medium px-3 py-1 mb-3 rounded-3xl bg-red-500 bg-opacity-20 text-red-500">
                                          hashtag
                                      </span>

                                      <div>
                                          <h4 className="text-xl font-semibold mb-1">
                                              {item.title}
                                          </h4>
                                          <p className="flex items-center flex-wrap text-gray-500 text-sm">
                                              <span>
                                                  {item.responses ===
                                                      undefined ||
                                                  item.responses === ""
                                                      ? "No responses yet"
                                                      : item.responses}
                                              </span>
                                              <span className="block w-1 h-1 rounded-full bg-gray-500 mx-2"></span>
                                              <span>Updated 10hrs ago</span>
                                          </p>
                                      </div>
                                  </a>
                              </Link>
                          </div>
                      ))
                    : "No forms found!"}
            </section>
        </>
    );
};
