import { ReactElement, useContext } from "react";
import { LoginContext } from "../../../shared/LoginContext";
import { ProgressBar, useFetchProgressBars } from "./useFetchProgressBars";
import styles from "./ProgressBars.module.css";
import { ProgressBarsView } from "./ProgressBarsView";
import { Listing } from "../../../shared/resources/Listing";
import { CreateProgressBarForm } from "./CreateProgressBarForm";

export const ProgressBars = (): ReactElement => {
    const loginContext = useContext(LoginContext);
    const { progressBars, error } = useFetchProgressBars({ loginContext });

    return (
        <div className={styles.container}>
            <div className={styles.header}>Your Progress Bars</div>
            {error}
            <Listing
                itemsSection={<ProgressBarsView progressBars={progressBars} />}
                createSection={
                    <CreateProgressBarForm
                        onCreated={(pbar: ProgressBar) => {
                            progressBars.push(pbar);
                        }}
                    />
                }
                filterSection={<></>}
            />
        </div>
    );
};
