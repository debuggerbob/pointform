import Link from "next/link";

import styles from "./checkbox.module.scss";

interface Props {
    name: string;
    id: string;
    text: string;
    toLink?: string;
    checked?: boolean;
    linkText?: string;
    onChangeFn?: any;
}

export const Checkbox: React.FC<Props> = ({
    name,
    id,
    text,
    toLink,
    checked,
    linkText,
    onChangeFn,
}) => {
    return (
        <div className={styles.checkbox}>
            {onChangeFn != undefined ? (
                <input
                    type="checkbox"
                    name={name}
                    id={id}
                    checked={checked}
                    onChange={() => onChangeFn()}
                />
            ) : (
                <input checked={checked} type="checkbox" name={name} id={id} />
            )}

            <span className="checkbox">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.0375 12.9313L1.58125 8.49875C1.55555 8.4732 1.53515 8.44281 1.52123 8.40935C1.50732 8.37588 1.50015 8.34 1.50015 8.30375C1.50015 8.26751 1.50732 8.23162 1.52123 8.19816C1.53515 8.16469 1.55555 8.13431 1.58125 8.10875L2.70625 6.9825C2.81375 6.875 2.9875 6.875 3.095 6.9825L6.02875 9.89875C6.13625 10.0063 6.31125 10.005 6.41875 9.8975L12.9012 3.3525C13.0087 3.24375 13.1837 3.24375 13.2925 3.35125L14.4187 4.4775C14.5262 4.585 14.5262 4.75875 14.42 4.86625L7.3575 11.9925L7.35875 11.9938L6.4275 12.93C6.32 13.0375 6.145 13.0375 6.0375 12.9313Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.75"
                        strokeMiterlimit="10"
                    />
                </svg>
            </span>

            <label htmlFor={id}>
                {text}
                {linkText ? (
                    <Link href={toLink}>
                        <a>{linkText}</a>
                    </Link>
                ) : null}
            </label>
        </div>
    );
};
