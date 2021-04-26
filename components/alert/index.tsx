import styles from "./index.module.scss";
import { useState } from 'react'

interface Props {
    alertText: string;
    alertType: string;
}

export const Alert: React.FC<Props> = ({ alertText, alertType }) => {
    const [show, setShow] = useState(true)
    let type, display
    { alertType === "error" ? type = styles.error : type = styles.default }
    { show ? display = styles.show : display = styles.none }
    return (
        <div className={`${styles.alert} ${type} ${display}`}>
            <h3 className={styles.alert__text}>{alertText}</h3>
            <button className={styles.alert__close} onClick={() => setShow(false)} >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#333c48"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </button>
        </div>
    )
}

export default Alert
