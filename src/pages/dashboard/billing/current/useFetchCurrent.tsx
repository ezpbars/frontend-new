import { ReactElement, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../../../shared/ApiConstants";
import { describeResponseError } from "../../../../shared/errors/describeResponseError";
import { ErrorFetchFailed } from "../../../../shared/errors/ErrorFetchFailed";
import { ErrorUnknown } from "../../../../shared/errors/ErrorUnkown";
import { LoginContextValue } from "../../../../shared/LoginContext";

type FetchCurrentState = {
    /**
     *the number of traces that have been used so far in the current pay period
     */
    traces: number;
    /**
     *the date and time when the current pay period started
     */
    start: number;
    /**
     * the error message to display, if any
     */
    error: ReactElement | null;
};

/**
 * Fetches the current usage data from the server for the user who is logged in.
 */
export const useFetchCurrent = ({ loginContext }: { loginContext: LoginContextValue }): FetchCurrentState => {
    const [traces, setTraces] = useState(0);
    const [start, setStart] = useState(0);
    const [error, setError] = useState<ReactElement | null>(null);

    useEffect(() => {
        let active = true;
        fetchCurrent();
        return () => {
            active = false;
        };
        async function fetchCurrent() {
            if (loginContext.state !== "logged-in") {
                return;
            }
            try {
                const response = await apiFetch(
                    "/api/1/user_usages/get_current",
                    {
                        method: "GET",
                        headers: {
                            "content-type": "application/json; charset=utf-8",
                        },
                    },
                    loginContext
                );
                if (!active) {
                    return;
                }
                if (!response.ok) {
                    throw response;
                }
                const data = await response.json();
                if (!active) {
                    return;
                }
                setTraces(data.traces);
                setStart(data.period_start_at);
            } catch (e) {
                if (e instanceof TypeError) {
                    setError(<ErrorFetchFailed hint="fetching current" />);
                } else if (e instanceof Response) {
                    const description = await describeResponseError(e);
                    if (!active) {
                        return;
                    }
                    setError(<div>{description}</div>);
                } else {
                    setError(<ErrorUnknown context={e} />);
                }
            }
        }
    }, [loginContext]);

    const result = useMemo(() => ({ traces, start, error }), [traces, start, error]);
    return result;
};
