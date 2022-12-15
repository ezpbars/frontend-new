import { useCallback, useContext, useEffect } from "react";
import { LoginContext } from "./LoginContext";
import styles from "./LoginButton.module.css";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

type LoginButtonProps = {
    /**
     * The class name to apply to the logout button
     */
    buttonClassName: string;

    /**
     * The class name to apply to the login anchor
     */
    anchorClassName: string;
};

/**
 * Creates a component which shows a login button (if the user is not logged in)
 * and a logout button otherwise. This expects to be within a login context.
 */
export const LoginButton = ({
    buttonClassName = styles.button,
    anchorClassName = styles.anchor,
}: LoginButtonProps): React.ReactElement => {
    const loginContext = useContext(LoginContext);

    const logout = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            loginContext.setAuthTokens.apply(undefined, [null]);
        },
        [loginContext.setAuthTokens]
    );

    useEffect(() => {
        localStorage.setItem("login-redirect", window.location.pathname);

        return () => {
            localStorage.removeItem("login-redirect");
        };
    }, []);

    return loginContext.state === "logged-in" ? (
        <button onClick={logout} className={buttonClassName}>
            Sign Out
        </button>
    ) : (
        <a href={LOGIN_URL} className={anchorClassName}>
            Sign In
        </a>
    );
};
