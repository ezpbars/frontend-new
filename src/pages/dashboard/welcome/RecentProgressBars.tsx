import { ReactElement, useContext } from "react";
import styles from "./RecentProgressBars.module.css";
import { useFetchProgressBars } from "../progressBars/useFetchProgressBars";
import { LoginContext } from "../../../shared/LoginContext";

export const RecentProgressBars = (): ReactElement => {
    const loginContext = useContext(LoginContext);
    const { progressBars, error } = useFetchProgressBars({ loginContext, limit: 5 });

    return (
        <div className={styles.container}>
            <div className={styles.header}>Recent Progress Bars</div>
            <div className={styles.pbarsContainer}>
                {progressBars.map((pbar) => (
                    <div className={styles.pbar} key={pbar.uid}>
                        <div className={styles.pbarName}>{pbar.name}</div>
                        <div className={styles.pbarVersion}>{pbar.version}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
