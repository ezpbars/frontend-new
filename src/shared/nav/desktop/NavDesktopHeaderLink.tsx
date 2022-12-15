import { PropsWithChildren, ReactElement } from "react";
import styles from "./NavDesktopHeaderLink.module.css";

type NavDesktopHeaderLinkProps = {
    /**
     * The path the link should go to, null if using the child
     * to handle the anchor/button
     */
    path: string | null;
};

/**
 * The component for a single link in the desktop header
 */
export const NavDesktopHeaderLink = ({
    path,
    children,
}: PropsWithChildren<NavDesktopHeaderLinkProps>): ReactElement => {
    const active = window.location.pathname === path;

    return (
        <div className={`${styles.container} ${active ? styles.active : styles.inactive}`}>
            {path !== null ? (
                <a className={styles.link} href={path}>
                    {children}
                </a>
            ) : (
                children
            )}
        </div>
    );
};
