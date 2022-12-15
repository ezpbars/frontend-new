import { ReactElement } from "react";
import styles from "./NavMobileMenu.module.css";

export const NavMobileMenu = (): ReactElement => {
    return (
        <nav>
            <div className={styles.container}>
                <div className={styles.menuItem}>Home</div>
                <div className={styles.menuItem}>Getting Started</div>
                <div className={styles.menuItem}>How to</div>
                <div className={styles.menuItem}>Explanation</div>
                <div className={styles.menuItem}>Pricing</div>
                <div className={styles.menuItem}>Sign In</div>
            </div>
        </nav>
    );
};
