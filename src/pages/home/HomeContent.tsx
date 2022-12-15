import { ReactElement, useContext } from "react";
import { LoginContext } from "../../shared/LoginContext";
import styles from "./HomeContent.module.css";

export const HomeContent = (): ReactElement => {
    const loginContext = useContext(LoginContext);

    return (
        <div>
            <div className={styles.container}>This is the home content! {loginContext.userAttributes?.givenName}</div>
        </div>
    );
};
