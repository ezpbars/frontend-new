import { ReactElement } from "react";
import styles from "./Banner.module.css";
import "../../assets/fonts.css";

export const Banner = (): ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h1 className={styles.header}>
                    <strong className={styles.logo}>ezpbars:</strong>
                    Easy, accurate progress bars
                </h1>
            </div>
            <div className={styles.getStartedContainer}>
                <div className={styles.getStarted}>Get started with ezpbars now!</div>
                <a href="#" className={styles.getStartedButton}>
                    Get Started
                </a>
            </div>
        </div>
    );
};
