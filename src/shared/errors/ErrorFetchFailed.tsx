import { ReactElement } from "react";
import errorStyles from "./Errors.module.css";

type ErrorFetchFailedProps = {
    hint: string;
};

export const ErrorFetchFailed = ({ hint }: ErrorFetchFailedProps): ReactElement => {
    return (
        <div className={errorStyles.container}>
            <p className={errorStyles.description}>Failed to fetch data from the server. {hint}</p>
        </div>
    );
};
