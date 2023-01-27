import { ReactElement, useState } from "react";
import styles from "./Menu.module.css";

export const Menu = (): ReactElement => {
    const [activeSection, setActiveSection] = useState(window.location.pathname.split("/")[2]);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <a href="/dashboard" className={styles.menuTitle}>
                    Dashboard
                </a>
            </div>
            <ol className={styles.menuOptions}>
                <li className={`${styles.menuOption} ${activeSection === "billing" ? styles.active : ""}`}>
                    <a href="/dashboard/billing" className={styles.menuLink}>
                        Billing
                    </a>
                </li>
                <li className={`${styles.menuOption} ${activeSection === "tokens" ? styles.active : ""}`}>
                    <a href="/dashboard/tokens" className={styles.menuLink}>
                        User Tokens
                    </a>
                </li>
                <li className={`${styles.menuOption} ${activeSection === "pbars" ? styles.active : ""}`}>
                    <a href="/dashboard/pbars" className={styles.menuLink}>
                        Progress Bars
                    </a>
                </li>
                <li className={`${styles.menuOption} ${activeSection === "pbar-steps" ? styles.active : ""}`}>
                    <a href="/dashboard/pbar-steps" className={styles.menuLink}>
                        Progress Bar Steps
                    </a>
                </li>
                <li className={`${styles.menuOption} ${activeSection === "traces" ? styles.active : ""}`}>
                    <a href="/dashboard/traces" className={styles.menuLink}>
                        Traces
                    </a>
                </li>
                <li className={`${styles.menuOption} ${activeSection === "trace-steps" ? styles.active : ""}`}>
                    <a href="/dashboard/trace-steps" className={styles.menuLink}>
                        Trace Steps
                    </a>
                </li>
            </ol>
        </div>
    );
};
