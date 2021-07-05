import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { baseApiUrl } from "@/lib/config";

interface Props {
    creatorData: {
        uid: string;
        email: string;
        name: string;
    };
}

export const Responses: React.FC<Props> = ({ creatorData }) => {
    const router = useRouter();
    const [forms, setForms] = useState([]);

    console.log("c", creatorData);

    const fetcher = (args) => fetch(args).then((res) => res.json());
    const { data: form, error } = useSWR(
        `${baseApiUrl}/forms/${creatorData?.uid}`,
        fetcher
    );

    const refreshData = () => {
        router.replace(router.asPath);
    };

    useEffect(() => {
        if (form) {
            setForms(form.data);
            refreshData();
        }
    }, [form]);

    return (
        <>
            <h1 className="text-2xl text-gray-800">Your Forms</h1>

            {/* <ul className={styles.quiz_list__content}>
                {forms && forms.length > 0
                    ? forms.map((form) => (
                          <FormsList
                              key={form.id}
                              quizTitle={form.title}
                              updatedAt={form.lastUpdated}
                              responses={form.responses}
                              acceptingResponses={form.acceptingResponses}
                          />
                      ))
                    : "No forms found!"}
            </ul> */}
        </>
    );
};
