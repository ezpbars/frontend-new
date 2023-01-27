import { ReactElement } from "react";
import { Controls } from "../resources/Controls";
import styles from "./ProgressBars.module.css";
import { ProgressBar } from "./useFetchProgressBars";

type ProgressBarFullProps = {
    pbar: ProgressBar;
};

export const ProgressBarFull = ({ pbar }: ProgressBarFullProps): ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.pbarName}>Progress Bar: {pbar.name}</div>
                <Controls onDelete={() => {}} onEdit={() => {}} editing={false} />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.uid}>UID: {pbar.uid}</div>
                <div className={styles.samplingMaxCount}>
                    <div>Sampling Max Count:</div>
                    <div>{pbar.samplingMaxCount}</div>
                </div>
                <div className={styles.samplingMaxAge}>
                    <div>Sampling Max Age:</div>
                    <div>{pbar.samplingMaxAgeSeconds} sec</div>
                </div>
                <div className={styles.technique}>
                    <div>Sampling Technique:</div>
                    <div>{pbar.samplingTechnique} sec</div>
                </div>
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
