import { ReactElement, useContext, useState } from "react";
import { apiFetch } from "../../../shared/ApiConstants";
import { LoginContext } from "../../../shared/LoginContext";
import formStyles from "../resources/Form.module.css";
import { ProgressBarStep } from "./useFetchProgressBars";

type CreateProgressBarFormProps = {
    onCreated: Function;
};

export const CreateProgressBarForm = ({ onCreated }: CreateProgressBarFormProps): ReactElement => {
    const loginContext = useContext(LoginContext);
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);

    return (
        <form className={formStyles.container}>
            <input
                className={formStyles.nameInput}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                className={formStyles.submitButton}
                type="submit"
                disabled={disabled}
                onSubmit={async () => {
                    setDisabled(true);
                    if (loginContext.state !== "logged-in") {
                        return;
                    }
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
                        const pbar: {
                            uid: string;
                            name: string;
                            samplingMaxCount: number;
                            samplingMaxAgeSeconds: number;
                            samplingTechnique: string;
                            version: number;
                            createdAt: number;
                            defaultStepConfig: ProgressBarStep;
                        } = await response.json();

                        onCreated(pbar);
                    } finally {
                        setDisabled(false);
                    }
                }}
            >
                Submit
            </button>
        </form>
    );
};
