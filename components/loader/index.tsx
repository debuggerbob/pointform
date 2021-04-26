import styles from "./index.module.scss";

interface Props {
    text: string;
}

export const Loader: React.FC<Props> = ({ text }) => {
    return (
        <div className={styles.loader}>
            <h3 className={styles.loader__text}>{text}</h3>
        </div>
    )
}