import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import gsap from "gsap";

import { FormButton } from "../buttons/FormButton";
import styles from "./styles/Form.module.scss";

interface Props {
    name: string;
    institute: string;
    dispatchFn: any;
}

export const UserForm: React.FC<Props> = ({ name, institute, dispatchFn }) => {
    const main_container = useRef<HTMLDivElement>();

    const handleChange = (e: any) => {
        if (e.target.id === "username") {
            dispatchFn({ type: "changeName", name: e.target.value });
        } else {
            dispatchFn({
                type: "changeInstitute",
                institute: e.target.value,
            });
        }

        if (e.target.value.length === 0) {
            e.target.nextSibling.style.marginTop = "8px";
            e.target.nextSibling.style.opacity = 1;
        } else {
            e.target.nextSibling.style.marginTop = 0;
            e.target.nextSibling.style.opacity = 0;
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (name.length > 0 && institute.length > 0) {
            localStorage.setItem("userId", uuidv4());

            gsap.to(main_container.current, {
                opacity: 0,
                duration: 0.4,
                ease: "power0",
            });

            setTimeout(() => {
                dispatchFn({ type: "setBasicDetails" });
            }, 500);
        }
    };

    useEffect(() => {
        gsap.to(main_container.current, {
            opacity: 1,
            duration: 0.6,
            ease: "power1",
        });
    });

    return (
        <div ref={main_container} className={styles.container}>
            <div className={styles.sidebar}></div>
            <div className={styles.container__wrapper}>
                <div className={styles.top_container}>
                    <div className={styles.top_container__text}>
                        <svg
                            className={styles.heading}
                            width={115}
                            height={55}
                            fill="none"
                        >
                            <path d="M1.881 42h-1v1h1v-1zm7.332 0v1h1v-1h-1zm0-16.172v-1h-1v1h1zm17.088 0h1v-1h-1v1zM26.3 42h-1v1h1v-1zm7.385 0v1h1v-1h-1zm0-40.16h1v-1h-1v1zm-7.385 0v-1h-1v1h1zm0 17.52v1h1v-1h-1zm-17.088 0h-1v1h1v-1zm0-17.52h1v-1h-1v1zm-7.332 0v-1h-1v1h1zm0 41.16h7.332v-2H1.88v2zm8.332-1V25.828h-2V42h2zm-1-15.172H26.3v-2H9.213v2zm16.088-1V42h2V25.828h-2zM26.3 43h7.385v-2H26.3v2zm8.385-1V1.84h-2V42h2zm-1-41.16H26.3v2h7.385v-2zm-8.385 1v17.52h2V1.84h-2zm1 16.52H9.213v2H26.3v-2zm-16.088 1V1.84h-2v17.52h2zm-1-18.52H1.88v2h7.332v-2zm-8.332 1V42h2V1.84h-2zm61.666 38.812l.513.86.004-.003-.517-.857zm4.744-5.175l.918.396.377-.874-.855-.42-.44.898zm-5.714-2.803l.44-.898-.837-.41-.468.806.865.502zm-2.695 2.75l.522.852.008-.005-.53-.848zm-9.434-.917l.669-.743-.669.743zm-2.48-5.175v-1h-1.105l.11 1.1.995-.1zm21.132 0v1h.7l.24-.658-.94-.342zm.27-1.348l-.992-.132-.004.03-.002.031.997.071zm-1.564-8.786l.888-.46-.888.46zm-4.852-5.175l-.531.847.01.006.521-.853zm-15.201 0l-.513-.86-.006.005.519.855zm-5.23 5.444l-.87-.49-.003.005.874.485zm0 15.58l.881-.475-.88.474zm5.284 5.551l-.517.857.517-.857zm12.02-21.023l-.685.728.011.01.012.01.663-.748zm2.103 4.366v1h1.083l-.086-1.08-.997.08zm-13.8 0l-.98-.2-.244 1.2h1.224v-1zm2.48-4.474l.638.77.002-.002-.64-.768zm5.12 24.18c3.137 0 5.925-.7 8.33-2.136l-1.025-1.717c-2.051 1.224-4.474 1.853-7.304 1.853v2zm8.334-2.138c2.412-1.455 4.151-3.33 5.145-5.636l-1.836-.791c-.803 1.862-2.227 3.438-4.342 4.714l1.033 1.713zm4.667-6.93l-5.714-2.803-.88 1.796 5.714 2.803.88-1.795zm-7.019-2.407c-.56.966-1.34 1.766-2.36 2.403l1.06 1.696c1.28-.8 2.297-1.832 3.03-3.095l-1.73-1.004zm-2.353 2.399c-.923.566-2.098.877-3.574.877v2c1.758 0 3.314-.372 4.62-1.172l-1.046-1.705zm-3.574.877c-1.9 0-3.432-.572-4.668-1.684l-1.338 1.486c1.64 1.476 3.664 2.198 6.006 2.198v-2zm-4.668-1.684c-1.23-1.107-1.96-2.59-2.154-4.532l-1.99.2c.238 2.371 1.16 4.338 2.806 5.818l1.338-1.486zm-3.149-3.432H68.1v-2H46.968v2zm22.071-.658c.181-.498.286-1.04.328-1.618l-1.995-.143c-.03.429-.106.784-.212 1.077l1.88.684zm.321-1.558c.078-.582.117-1.165.117-1.749h-2c0 .495-.033.99-.1 1.485l1.983.264zm.117-1.749c0-2.77-.59-5.319-1.783-7.628l-1.777.918c1.035 2.003 1.56 4.233 1.56 6.71h2zm-1.783-7.628c-1.2-2.323-2.946-4.183-5.219-5.57l-1.042 1.707c1.968 1.201 3.456 2.791 4.484 4.78l1.777-.917zm-5.208-5.564c-2.312-1.45-5.093-2.147-8.294-2.147v2c2.908 0 5.302.632 7.231 1.842l1.063-1.694zm-8.294-2.147c-2.902 0-5.56.709-7.952 2.136l1.025 1.717c2.065-1.232 4.366-1.853 6.927-1.853v-2zm-7.958 2.14c-2.344 1.421-4.206 3.364-5.582 5.809l1.743.98c1.212-2.154 2.836-3.841 4.876-5.08l-1.037-1.71zm-5.584 5.814c-1.352 2.432-2.013 5.209-2.013 8.302h2c0-2.801.596-5.235 1.761-7.331l-1.748-.971zm-2.013 8.302c0 2.992.665 5.744 2.006 8.236l1.761-.948c-1.174-2.18-1.767-4.603-1.767-7.288h-2zm2.006 8.236a15.268 15.268 0 005.647 5.935l1.033-1.713a13.269 13.269 0 01-4.919-5.17l-1.76.948zm5.647 5.935c2.441 1.472 5.266 2.192 8.44 2.192v-2c-2.862 0-5.32-.646-7.407-1.905l-1.033 1.713zm7.902-22.605c1.645 0 2.936.498 3.95 1.453l1.371-1.456c-1.429-1.345-3.23-1.997-5.321-1.997v2zm3.973 1.474c1.049.929 1.644 2.137 1.768 3.697l1.994-.16c-.163-2.033-.97-3.736-2.436-5.035l-1.326 1.498zm2.765 2.617h-13.8v2h13.8v-2zm-12.82 1.2c.36-1.766 1.09-3.036 2.138-3.904l-1.276-1.54c-1.469 1.217-2.391 2.93-2.822 5.045l1.96.399zm2.14-3.906c1.105-.92 2.403-1.385 3.942-1.385v-2c-1.983 0-3.74.614-5.222 1.849l1.28 1.536zm34.038 31.306l-.637-.77-.008.006-.008.007.653.757zm4.474-6.576l-.93-.368v.003l.93.365zm12.776-32.29l.93.368.541-1.368h-1.471v1zm-7.655 0v-1h-.694l-.243.65.937.35zM86.336 32.89l-.936.352.94 2.498.933-2.5-.937-.35zm-7.6-20.215l.936-.352-.244-.648h-.692v1zm-7.601 0v-1h-1.47l.54 1.368.93-.368zM82.725 42l.924.382.154-.373-.148-.377-.93.368zm-.647 1.563l.905.426.01-.021.009-.022-.924-.383zm-1.995 2.965l-.707-.707-.008.009-.009.009.724.69zm-5.337.97l.165-.986-.027-.004-.027-.003-.11.993zm-1.724-.323l.274-.961-1.275-.365v1.326h1zm0 5.93h-1v.634l.574.27.425-.904zm2.048.593l.187-.983-.023-.004-.023-.003-.141.99zm2.318 1.215c2.97 0 5.513-.854 7.553-2.614l-1.306-1.515c-1.626 1.403-3.683 2.13-6.247 2.13v2zm7.537-2.6c2.03-1.679 3.608-4.026 4.768-6.983l-1.862-.73c-1.068 2.72-2.472 4.758-4.18 6.17l1.274 1.542zm4.767-6.98l12.776-32.29-1.86-.736-12.776 32.29 1.86.736zm11.846-33.658h-7.655v2h7.655v-2zm-8.592.65L85.4 32.54l1.873.7 7.547-20.215-1.874-.7zm-5.674 20.213l-7.6-20.215-1.873.704L85.4 33.242l1.872-.704zm-8.536-20.863h-7.601v2h7.6v-2zm-8.531 1.368l11.59 29.325 1.86-.736-11.59-29.325-1.86.736zM81.8 41.618l-.647 1.563 1.848.765.647-1.564-1.848-.764zm-.628 1.52c-.538 1.143-1.142 2.028-1.797 2.683l1.414 1.414c.855-.855 1.58-1.946 2.193-3.246l-1.81-.851zm-1.814 2.7c-.448.47-1.288.822-2.78.822v2c1.743 0 3.239-.403 4.228-1.442l-1.448-1.38zm-2.78.822c-.513 0-1.068-.048-1.668-.148l-.329 1.973c.694.115 1.36.175 1.997.175v-2zm-1.722-.155a9.578 9.578 0 01-1.56-.291l-.55 1.922c.568.163 1.2.28 1.89.356l.22-1.987zm-2.835.67v5.93h2v-5.93h-2zm.574 6.835a8.162 8.162 0 002.332.678l.283-1.98a6.169 6.169 0 01-1.764-.508l-.851 1.81zm2.287.67c.818.156 1.653.233 2.505.233v-2c-.73 0-1.44-.066-2.131-.198l-.374 1.965zm30.638-4.27h-1v1.232l1.207-.254-.207-.979zm8.194-15.957h1v-1h-1v1zm-7.115 0v-1h-1v1h1zm0 7.547h-1v1h1v-1zm3.288 0l.987.158.186-1.158h-1.173v1zm-4.367 4.96l-.239-.972-.761.188v.783h1zm.207 4.428c2.923-.615 5.21-1.958 6.749-4.085 1.527-2.11 2.238-4.882 2.238-8.214h-2c0 3.065-.655 5.379-1.858 7.041-1.192 1.648-3.002 2.766-5.542 3.3l.413 1.958zm8.987-12.299v-4.636h-2v4.636h2zm-1-5.636H106.6v2h7.115v-2zm-8.115 1V42h2v-7.547h-2zm1 8.547h3.288v-2H106.6v2zm2.3-1.158c-.192 1.206-.602 2.104-1.178 2.758-.572.65-1.365 1.124-2.44 1.388l.479 1.942c1.405-.346 2.579-1.005 3.462-2.008.88-.999 1.414-2.274 1.652-3.764l-1.975-.316zm-4.379 5.117v3.45h2v-3.45h-2z" />
                            <defs>
                                <linearGradient
                                    id="svg_gradient"
                                    x1={5.5}
                                    y1={-1}
                                    x2={87.5}
                                    y2={42}
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#0492A5" />
                                    <stop offset={0.472} stopColor="#327AC0" />
                                    <stop offset={1} stopColor="#213DF0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className={styles.description}>
                            <p className={styles.description__1}>
                                just a few things before we begin.
                            </p>
                            <p className={styles.description__2}>
                                Let's start by filling the form below:
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.form_container}>
                    <form className={styles.form} onSubmit={handleFormSubmit}>
                        <div className={styles.form__input}>
                            <label htmlFor="username">Name</label>
                            <input
                                required
                                type="text"
                                id="username"
                                value={name}
                                onChange={handleChange}
                            />
                            <span>* Required</span>
                        </div>

                        <div className={styles.form__input}>
                            <label htmlFor="institute">College/Institute</label>
                            <input
                                required
                                type="text"
                                id="institute"
                                value={institute}
                                onChange={handleChange}
                            />
                            <span>* Required</span>
                        </div>

                        <div className={styles.form__submit}>
                            <FormButton
                                text={"Begin"}
                                clickEvent={handleFormSubmit}
                                icon={
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.25 16.5L13.75 11L8.25 5.5"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
