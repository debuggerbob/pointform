import { SVGProps } from "react";
import styles from "./button.module.scss";
interface Props {
    text: string;
    icon?: SVGProps<SVGElement>;
    clickEvent: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FormButton: React.FC<Props> = ({ text, clickEvent, icon }) => {
    return (
        <button className={styles.button} onClick={clickEvent}>
            <span>{text}</span>
            {icon}
        </button>
    );
};
