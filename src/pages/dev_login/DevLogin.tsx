import { FormEvent, ReactElement, useCallback, useState } from "react";
import { HTTP_API_URL } from "../../shared/ApiConstants";
import styles from "./DevLogin.module.css";

/**
 * A screen used during development which accesses the development-only
 * trivial sign-in endpoint (which doesn't use a password). In production
 * they are directed to amazon cognito to login.
 */
export const DevLogin = (): ReactElement => {
    const [sub, setSub] = useState("obama");
    const [working, setWorking] = useState(false);
    const [error, setError] = useState<ReactElement | null>(null);

    const login = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setWorking(true);
            setError(null);
            try {
                let response: Response;
                try {
                    response = await fetch(`${HTTP_API_URL}/api/1/test/dev_login?${new URLSearchParams({ sub })}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                    });
                } catch (e) {
                    console.error(e);
                    setError(<>Failed to connect to server. Check your internet connection.</>);
                    return;
                }

                if (!response.ok) {
                    const text = await response.text();
                    setError(<>A problem occurred logging in: {text}</>);
                    return;
                }

                const data = await response.json();
                const idToken = data.id;
                const path = "/#" + new URLSearchParams({ id_token: idToken }).toString();
                window.location.href = path;
            } finally {
                setWorking(false);
            }
        },
        [sub]
    );

    return (
        <div className={styles.container}>
            <div className={styles.title}>Login (development only)</div>
            <form className={styles.form} onSubmit={login}>
                <input
                    type="text"
                    placeholder="sub"
                    className={styles.input}
                    value={sub}
                    onChange={(e) => setSub(e.target.value)}
                />
                {error}
                <button type="submit" className={styles.button} disabled={sub === "" || working}>
                    Login
                </button>
            </form>
        </div>
    );
};
