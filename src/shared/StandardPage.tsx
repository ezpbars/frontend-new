import { PropsWithChildren, ReactElement } from "react";
import { LoginProvider } from "./LoginContext";
import { NavDesktopHeader } from "./nav/desktop/NavDesktopHeader";
import { NavMobileHeader } from "./nav/mobile/NavMobileHeader";
import { Footer } from "../pages/home/Footer";
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
                <div className={styles.desktopHeaderContainer}>
                    <NavDesktopHeader banner={banner} />
                </div>
                <div className={styles.mobileHeaderContainer}>
                    <NavMobileHeader banner={banner} />
                </div>
                {children}
                <div className={styles.footerContainer}>
                    <Footer />
                </div>
            </div>
        </LoginProvider>
    );
};
