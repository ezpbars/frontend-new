import { PropsWithChildren, ReactElement } from "react";
import styles from "./NavMobileMenuLink.module.css";

type NavMobileMenuLinkProps = {
    /**
     * The path the link should go to, null if using the child
     * to handle the anchor/button
     */
    path: string | null;
};

export const NavMobileMenuLink = ({ path, children }: PropsWithChildren<NavMobileMenuLinkProps>): ReactElement => {
    const active = window.location.pathname === path;

    return (
        <li className={`${styles.container} ${active ? styles.active : styles.inactive}`}>
            <span className={styles.childWrapper}>
                {path !== null ? (
                    <a className={styles.link} href={path}>
                        {children}
                    </a>
                ) : (
                    children
                )}
            </span>
        </li>
    );
};
