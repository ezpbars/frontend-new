import { ReactElement } from "react";
import errorStyles from "./Errors.module.css";

type ErrorUnknownProps = {
    context: any;
};

export const ErrorUnknown = ({ context }: ErrorUnknownProps): ReactElement => {
    return (
        <div className={errorStyles.container}>
            <p className={errorStyles.description}>An unknown error has occurred. Contact support.</p>
            <div className={errorStyles.context}></div>
        </div>
    );
};
