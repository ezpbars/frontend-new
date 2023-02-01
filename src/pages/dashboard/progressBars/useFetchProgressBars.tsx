import { ReactElement, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../../shared/ApiConstants";
import { describeResponseError } from "../../../shared/errors/describeResponseError";
import { ErrorFetchFailed } from "../../../shared/errors/ErrorFetchFailed";
import { ErrorUnknown } from "../../../shared/errors/ErrorUnknown";
import { LoginContextValue } from "../../../shared/LoginContext";
import { parseProgressBar } from "./parseProgressBar";

export type ProgressBar = {
    uid: string;
    name: string;
    samplingMaxCount: number;
    samplingMaxAgeSeconds: number;
    samplingTechnique: "systematic" | "simpleRandom";
    version: number;
    createdAt: number;
    defaultStepConfig: ProgressBarStep;
};

export type ProgressBarStep = {
    uid: string;
    name: string;
    position: number;
    iterated: boolean;
    oneOffTechnique: "percentile" | "harmonicMean" | "geometricMean" | "arithmeticMean";
    oneOffPercentile: number;
    iteratedTechnique: "bestFit.linear" | "percentile" | "harmonicMean" | "geometricMean" | "arithmeticMean";
    iteratedPercentile: number;
    createdAt: number;
};

type FetchProgressBarsState = {
    progressBars: ProgressBar[];
    error: ReactElement | null;
};
export const useFetchProgressBars = ({
    loginContext,
    limit = 10,
}: {
    loginContext: LoginContextValue;
    limit?: number;
}): FetchProgressBarsState => {
    const [progressBars, setProgressBars] = useState<ProgressBar[]>([]);
    const [error, setError] = useState<ReactElement | null>(null);

    useEffect(() => {
        let active = true;
        fetchProgressBars();
        return () => {
            active = false;
        };

        async function fetchProgressBars() {
            if (loginContext.state !== "logged-in") {
                return;
            }
            try {
                const progressBarsResponse = await apiFetch(
                    "/api/1/progress_bars/search",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            sort: [
                                {
                                    key: "created_at",
                                    dir: "desc",
                                },
                            ],
                            limit: limit,
                        }),
                    },
                    loginContext
                );
                if (!active) {
                    return;
                }
                if (!progressBarsResponse.ok) {
                    throw progressBarsResponse;
                }
                const progressBarsData: {
                    items: any[];
                } = await progressBarsResponse.json();
                if (!active) {
                    return;
                }
                setProgressBars(progressBarsData.items.map(parseProgressBar));
            } catch (e) {
                if (!active) {
                    return;
                }

                if (e instanceof TypeError) {
                    setError(<ErrorFetchFailed hint="fetching progress bars" />);
                } else if (e instanceof Response) {
                    const error = await describeResponseError(e);
                    if (!active) {
                        return;
                    }
                    setError(error);
                } else {
                    console.error(e);
                    setError(<ErrorUnknown context={e} />);
                }
            }
        }
    }, [loginContext, limit]);
    const result = useMemo(() => ({ progressBars, error }), [progressBars, error]);
    return result;
};
