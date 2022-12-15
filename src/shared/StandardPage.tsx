import { PropsWithChildren, ReactElement } from "react";
import { LoginProvider } from "./LoginContext";
import { NavDesktopHeader } from "./nav/desktop/NavDesktopHeader";
import styles from "./StandardPage.module.css";

type StandardPageProps = {
    /**
     * The banner, which is shown beneath the header but on top
     * of the header background image
     */
    banner?: ReactElement | undefined | null;
};
/**
 * Standard page wrapper which shows the children in the appropriate
 * spot, such that navigation works for desktop and mobile
 */
export const StandardPage = ({ children, banner = undefined }: PropsWithChildren<StandardPageProps>): ReactElement => {
    return (
        <LoginProvider>
            <div className={styles.container}>
                <NavDesktopHeader banner={banner} />
                {children}
            </div>
        </LoginProvider>
    );
};
