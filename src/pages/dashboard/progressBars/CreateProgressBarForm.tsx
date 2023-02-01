import { ReactElement, useCallback, useContext, useState } from "react";
import { apiFetch } from "../../../shared/ApiConstants";
import { describeError } from "../../../shared/errors/describeError";
import { LoginContext } from "../../../shared/LoginContext";
import formStyles from "../resources/Form.module.css";
import { parseProgressBar } from "./parseProgressBar";
import { ProgressBar } from "./useFetchProgressBars";

type CreateProgressBarFormProps = {
    /**
     * Called after the server confirms that a new progress bar has
     * been created. Passed the new progress bar, usually used to
     * show the progress bar somewhere on the page.
     */
    onCreated: (progressBar: ProgressBar) => void;
};

/**
 * Shows a form where the user can create a progress bar with
 * mostly default settings.
 */
export const CreateProgressBarForm = ({ onCreated }: CreateProgressBarFormProps): ReactElement => {
    const loginContext = useContext(LoginContext);
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<ReactElement | null>(null);

    const onNameChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    const onFormSubmitted = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (loginContext.state !== "logged-in") {
                setError(<p>You need to be logged in to do that.</p>);
                return;
            }

            setDisabled(true);
            setError(null);
            try {
                const response = await apiFetch(
                    "/api/1/progress_bars/",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            name: name,
                        }),
                    },
                    loginContext
                );

                if (!response.ok) {
                    throw response;
                }

                const data = await response.json();
                const progressBar = parseProgressBar(data);
                onCreated(progressBar);
            } catch (e) {
                setError(await describeError(e));
            } finally {
                setDisabled(false);
            }
        },
        [name, loginContext, onCreated]
    );

    return (
        <form className={formStyles.container} onSubmit={onFormSubmitted}>
            <div className={formStyles.title}>Create a new progress bar</div>
            <div className={formStyles.row}>
                <input
                    className={formStyles.nameInput}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={onNameChanged}
                    required
                />
                {error}
                <button className={formStyles.submitButton} type="submit" disabled={disabled}>
                    Submit
                </button>
            </div>
        </form>
    );
};
