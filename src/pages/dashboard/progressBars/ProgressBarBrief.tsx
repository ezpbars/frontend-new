import { ReactElement } from "react";
import { ProgressBar } from "./useFetchProgressBars";
import styles from "./ProgressBar.module.css";

type ProgressBarBriefProps = {
    pbar: ProgressBar;
};

export const ProgressBarBrief = ({ pbar }: ProgressBarBriefProps): ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.pbarName}>Progress Bar: {pbar.name}</div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.createdAt}>
                    <div>Created at:</div>
                    <div>{pbar.createdAt}</div>
                </div>
                <div className={styles.version}>
                    <div>Version:</div>
                    <div>{pbar.version}</div>
                </div>
            </div>
        </div>
    );
};
