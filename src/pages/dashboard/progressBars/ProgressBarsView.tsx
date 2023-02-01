import { Dispatch, ReactElement, SetStateAction, useCallback, useContext } from "react";
import { ProgressBarFull } from "./ProgressBarFull";
import { ProgressBar } from "./useFetchProgressBars";
import styles from "./ProgressBars.module.css";
import { apiFetch } from "../../../shared/ApiConstants";
import { LoginContext } from "../../../shared/LoginContext";

type ProgressBarsViewProps = {
    /**
     * The progress bars to display.
     */
    progressBars: ProgressBar[];

    /**
     * Called when the list of progress bars changes because
     * one of them was edited or deleted.
     *
     * @param progressBars The new list of progress bars
     */
    setProgressBars: Dispatch<SetStateAction<ProgressBar[]>>;
};

/**
 * Displays a list of progress bars, allowing the user to edit or delete them.
 */
export const ProgressBarsView = ({ progressBars, setProgressBars }: ProgressBarsViewProps): ReactElement => {
    const loginContext = useContext(LoginContext);

    const onSetPbar = useCallback(
        (pbar: ProgressBar) => {
            setProgressBars((oldPbars) => {
                let pbars = [];
                for (let i = 0; i < oldPbars.length; i++) {
                    if (oldPbars[i].uid === pbar.uid) {
                        pbars.push(pbar);
                    } else {
                        pbars.push(oldPbars[i]);
                    }
                }
                return pbars;
            });
        },
        [setProgressBars]
    );

    const onDeletePbar = useCallback(
        async (pbar: ProgressBar) => {
            if (loginContext.state !== "logged-in") {
                return;
            }
            const response = await apiFetch(
                "/api/1/progress_bars/?" + new URLSearchParams({ name: pbar.name }).toString(),
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json; charset=utf-8",
                    },
                },
                loginContext
            );
            if (!response.ok) {
                throw response;
            }

            setProgressBars((oldPbars) => {
                let pbars = [];
                for (let i = 0; i < oldPbars.length; i++) {
                    if (oldPbars[i].uid === pbar.uid) {
                        continue;
                    } else {
                        pbars.push(oldPbars[i]);
                    }
                }
                return pbars;
            });
        },
        [setProgressBars, loginContext]
    );

    return (
        <div className={styles.list}>
            {progressBars.map((pbar) => (
                <ProgressBarFull key={pbar.uid} pbar={pbar} setPbar={onSetPbar} onDeleted={onDeletePbar} />
            ))}
        </div>
    );
};
