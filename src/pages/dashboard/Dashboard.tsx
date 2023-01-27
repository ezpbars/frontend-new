import { ReactElement } from "react";
import { StandardPage } from "../../shared/StandardPage";
import { Menu } from "./Menu";
import styles from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import { Welcome } from "./welcome/Welcome";

export const Dashboard = (): ReactElement => {
    return (
        <StandardPage>
            <div className={styles.container}>
                <div className={styles.navContainer}>
                    <Menu />
                </div>
                <div className={styles.dashContentContainer}>
                    {window.location.pathname === "/dashboard" ? <Welcome /> : <Outlet />}
                </div>
            </div>
        </StandardPage>
    );
};
