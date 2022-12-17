import { ReactElement, useState } from "react";
import styles from "./NavMobileHeader.module.css";
import { NavMobileMenu } from "./NavMobileMenu";
import assistiveStyles from "../../assistive.module.css";
import img from "../desktop/assets/header-background.jpg";

type NavMobileHeaderProps = {
    /**
     * The banner to show below the mobile nav but on top of the background image
     */
    banner: ReactElement | undefined | null;
};

export const NavMobileHeader = ({ banner = undefined }: NavMobileHeaderProps): ReactElement => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} width={5184} height={3240} src={img} alt=""></img>
                </div>
                <div className={`${styles.titlebarOuterContainer} ${menuOpen ? styles.open : styles.closed}`}>
                    <div className={styles.titlebarContainer}>
                        <div className={styles.toggleContainer}>
                            <button
                                className={styles.toggleButton}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMenuOpen(!menuOpen);
                                }}
                            >
                                <div className={assistiveStyles.srOnly}>{menuOpen ? "Close menu" : "Open menu"}</div>
                                <div className={menuOpen ? styles.toggleCloseIcon : styles.toggleOpenIcon}></div>
                            </button>
                        </div>
                        <div className={styles.logoContainer}>EZPBARS</div>
                    </div>
                    <div className={styles.navMobileMenuContainer}>
                        <NavMobileMenu />
                    </div>
                </div>
            </div>
            {banner && <div className={styles.bannerContainer}>{banner}</div>}
        </div>
    );
};
