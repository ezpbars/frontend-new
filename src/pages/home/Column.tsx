import { ReactElement } from "react";
import styles from "./Column.module.css";

type ColumnProps = {
    header: string;
    subheader: string;
    image: boolean;
};

export const Column = ({ header, subheader, image }: ColumnProps): ReactElement => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{header}</h1>
            <h2 className={styles.subheader}>{subheader}</h2>
        </div>
    );
};
