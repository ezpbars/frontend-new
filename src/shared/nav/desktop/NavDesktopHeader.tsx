import { ReactElement, useContext } from "react";
import "../../../assets/fonts.css";
import styles from "./NavDesktopHeader.module.css";
import { NavDesktopHeaderLink } from "./NavDesktopHeaderLink";
import img from "./assets/header-background.jpg";
import linkStyles from "./NavDesktopHeaderLink.module.css";
import { LoginButton } from "../../LoginButton";
import { LoginContext } from "../../LoginContext";

type NavDesktopHeaderProps = {
    /**
     * The banner to show below the desktop nav but on top of the background image
     */
    banner: ReactElement | undefined | null;
};

/**
 * The header component for navigation for desktop
 */
export const NavDesktopHeader = ({ banner = undefined }: NavDesktopHeaderProps): ReactElement => {
    const loginContext = useContext(LoginContext);
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.image} width={5184} height={3240} src={img} alt=""></img>
            </div>
            <div className={styles.navOuterContainer}>
                <div className={styles.logoContainer}>EZPBARS</div>
                <div className={styles.navContainer}>
                    <NavDesktopHeaderLink path="/">Home</NavDesktopHeaderLink>
                    <NavDesktopHeaderLink path="/getting-started">Getting Started</NavDesktopHeaderLink>
                    <NavDesktopHeaderLink path="/how-to">How To</NavDesktopHeaderLink>
                    <NavDesktopHeaderLink path="/explanation">Explanation</NavDesktopHeaderLink>
                    <NavDesktopHeaderLink path="/references">References</NavDesktopHeaderLink>
                    {loginContext.state === "logged-in" ? (
                        <NavDesktopHeaderLink path="/dashboard">Dashboard</NavDesktopHeaderLink>
                    ) : (
                        <NavDesktopHeaderLink path="/pricing">Pricing</NavDesktopHeaderLink>
                    )}
                    <NavDesktopHeaderLink path={null}>
                        <LoginButton buttonClassName={linkStyles.link} anchorClassName={linkStyles.link} />
                    </NavDesktopHeaderLink>
                </div>
            </div>
            {banner && <div className={styles.bannerContainer}>{banner}</div>}
        </div>
    );
};
