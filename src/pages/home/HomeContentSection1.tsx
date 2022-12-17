import { ReactElement } from "react";
import { Column } from "./Column";
import styles from "./HomeContentSection1.module.css";

export const HomeContentSection1 = (): ReactElement => {
    return (
        <div className={styles.container}>
            <h1 className={styles.sectionHeader}>Section 1</h1>
            <div className={styles.row}>
                <Column header="Header 1" subheader="Subheader 1" />
                <Column header="Header 2" subheader="Subheader 2" />
                <Column header="Header 3" subheader="Subheader 3" />
            </div>
            <p className={styles.footer}>Footer</p>
        </div>
    );
};
