import { ReactElement, useCallback, useContext, useState } from "react";
import { apiFetch } from "../../../shared/ApiConstants";
import { LoginContext } from "../../../shared/LoginContext";
import { Controls } from "../resources/Controls";
import styles from "./ProgressBar.module.css";
import { ProgressBar } from "./useFetchProgressBars";

type ProgressBarFullProps = {
    /**
     * The progress bar to show
     */
    pbar: ProgressBar;

    /**
     * The function to call when the user changes the progress bar. This
     * is called after the change has already been confirmed by the server
     * @param pbar The new progress bar after editing
     */
    setPbar: (pbar: ProgressBar) => void;

    /**
     * The function to call when the user deletes the progress bar. This
     * is called after the deletion has already been confirmed by the server
     * @param pbar The progress bar that was deleted
     */
    onDeleted: (pbar: ProgressBar) => void;
};

/**
 * used to convert the sampling technique fetched from the backend to a more
 * appealing string for display purposes
 */
const samplingTechniqueToPretty = {
    systematic: "Systematic",
    simpleRandom: "Simple Random",
};

/**
 * Renders a progress bar with controls to edit or delete.
 */
export const ProgressBarFull = ({ pbar, setPbar, onDeleted }: ProgressBarFullProps): ReactElement => {
    const loginContext = useContext(LoginContext);
    const [uidSeen, setUidSeen] = useState(false);
    const [editing, setEditing] = useState(false);
    const onDeletedPressed = useCallback(() => {
        onDeleted(pbar);
    }, [onDeleted, pbar]);

    const onEditPressed = useCallback(async () => {
        if (editing) {
            const response = await apiFetch(
                "/api/1/progress_bars/?" + new URLSearchParams({ name: pbar.name }).toString(),
                {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(pbar),
                },
                loginContext
            );
            if (!response.ok) {
                throw response;
            }
            setPbar(pbar);
        }
        setEditing(!editing);
    }, [editing, loginContext, setPbar, pbar]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.pbarName}>Progress Bar: {pbar.name}</div>
                <Controls onDelete={onDeletedPressed} onEdit={onEditPressed} editing={editing} />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.row}>
                    <div>UID:</div>
                    <div>{pbar.uid}</div>
                </div>
                <div className={styles.row}>
                    <div>Sampling Max Count:</div>
                    {editing ? (
                        <input
                            type="number"
                            value={pbar.samplingMaxCount}
                            onChange={(e) => {
                                setPbar({ ...pbar, samplingMaxCount: parseInt(e.target.value) });
                            }}
                        />
                    ) : (
                        <div>{pbar.samplingMaxCount}</div>
                    )}
                </div>
                <div className={styles.row}>
                    <div>Sampling Max Age (seconds):</div>
                    {editing ? (
                        <input
                            type="number"
                            min="60"
                            max="604800"
                            value={pbar.samplingMaxAgeSeconds}
                            onChange={(e) => {
                                setPbar({ ...pbar, samplingMaxAgeSeconds: parseInt(e.target.value) });
                            }}
                        />
                    ) : (
                        <div>{pbar.samplingMaxAgeSeconds}</div>
                    )}
                </div>
                <div className={styles.row}>
                    <div>Sampling Technique:</div>
                    {editing ? (
                        <select
                            value={pbar.samplingTechnique}
                            onChange={(e) => {
                                if (e.target.value !== "systematic" && e.target.value !== "simpleRandom") {
                                    throw new Error("Invalid sampling technique");
                                }
                                setPbar({ ...pbar, samplingTechnique: e.target.value });
                            }}
                        >
                            <option value="systematic">Systematic</option>
                            <option value="simpleRandom">Simple Random</option>
                        </select>
                    ) : (
                        <div>{samplingTechniqueToPretty[pbar.samplingTechnique]}</div>
                    )}
                </div>
                <div className={styles.row}>
                    <div>Created at:</div>
                    <div>{new Date(pbar.createdAt * 1000).toLocaleDateString()}</div>
                </div>
                <div className={styles.row}>
                    <div>Version:</div>
                    <div>{pbar.version}</div>
                </div>
            </div>
        </div>
    );
};
