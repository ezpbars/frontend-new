import { ReactElement } from "react";
import { LoginButton } from "../../LoginButton";
import styles from "./NavMobileMenu.module.css";
import { NavMobileMenuLink } from "./NavMobileMenuLink";
import linkStyles from "./NavMobileMenuLink.module.css";

export const NavMobileMenu = (): ReactElement => {
    return (
        <nav>
            <menu className={styles.container}>
                <NavMobileMenuLink path="/">Home</NavMobileMenuLink>
                <NavMobileMenuLink path="/getting-started">Getting Started</NavMobileMenuLink>
                <NavMobileMenuLink path="/how-to">How to</NavMobileMenuLink>
                <NavMobileMenuLink path="/explanation">Explanation</NavMobileMenuLink>
                <NavMobileMenuLink path="/pricing">Pricing</NavMobileMenuLink>
                <NavMobileMenuLink path={null}>
                    <LoginButton buttonClassName={linkStyles.link} anchorClassName={linkStyles.link} />
                </NavMobileMenuLink>
            </menu>
        </nav>
    );
};
