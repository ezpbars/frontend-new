import { ReactElement, useContext } from "react";
import { LoginContext } from "../../shared/LoginContext";
import styles from "./HomeContent.module.css";
import { HomeContentSection1 } from "./HomeContentSection1";

export const HomeContent = (): ReactElement => {
    const loginContext = useContext(LoginContext);

    return (
        <div>
            <div className={styles.container}>
                <HomeContentSection1 />
            </div>
        </div>
    );
};
