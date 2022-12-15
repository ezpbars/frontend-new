import { ReactElement } from "react";
import styles from "./NavMobileHeader.module.css";

export const NavMobileHeader = (): ReactElement => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.toggleContainer}>
                    <div className={styles.toggle}></div>
                </div>
                <div className={styles.logoContainer}>EZPBARS</div>
            </div>
        </div>
    );
};
