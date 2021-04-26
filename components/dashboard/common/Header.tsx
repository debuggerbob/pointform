import Link from "next/link";

import { ProfileMenu } from "@/components/profileMenu";

export const Header = ({ styles, creator }) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__content}>
                <h1 className={styles.page_title}>
                    <Link href="/">
                        <a>Pointform</a>
                    </Link>
                </h1>

                <div>
                    <ProfileMenu currentUsername={creator?.name} />
                </div>
            </div>
        </header>
    );
};
