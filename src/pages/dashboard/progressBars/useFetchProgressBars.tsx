import { ReactElement, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../../shared/ApiConstants";
import { describeResponseError } from "../../../shared/errors/describeResponseError";
import { ErrorFetchFailed } from "../../../shared/errors/ErrorFetchFailed";
import { ErrorUnknown } from "../../../shared/errors/ErrorUnkown";
import { LoginContextValue } from "../../../shared/LoginContext";

export type ProgressBar = {
    uid: string;
    name: string;
    samplingMaxCount: number;
    samplingMaxAgeSeconds: number;
    samplingTechnique: string;
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
                    items: {
                        uid: string;
                        name: string;
                        sampling_max_count: number;
                        sampling_max_age_seconds: number;
                        sampling_technique: string;
                        version: number;
                        created_at: number;
                        default_step_config: {
                            uid: string;
                            name: string;
                            position: number;
                            iterated: boolean;
                            one_off_technique: "percentile" | "harmonicMean" | "geometricMean" | "arithmeticMean";
                            one_off_percentile: number;
                            iterated_technique:
                                | "bestFit.linear"
                                | "percentile"
                                | "harmonicMean"
                                | "geometricMean"
                                | "arithmeticMean";
                            iterated_percentile: number;
                            created_at: number;
                        };
                    }[];
                } = await progressBarsResponse.json();
                if (!active) {
                    return;
                }
                setProgressBars(
                    progressBarsData.items.map((item) => ({
                        uid: item.uid,
                        name: item.name,
                        samplingMaxCount: item.sampling_max_count,
                        samplingMaxAgeSeconds: item.sampling_max_age_seconds,
                        samplingTechnique: item.sampling_technique,
                        version: item.version,
                        createdAt: item.created_at,
                        defaultStepConfig: {
                            uid: item.default_step_config.uid,
                            name: item.default_step_config.name,
                            position: item.default_step_config.position,
                            iterated: item.default_step_config.iterated,
                            oneOffTechnique: item.default_step_config.one_off_technique,
                            oneOffPercentile: item.default_step_config.one_off_percentile,
                            iteratedTechnique: item.default_step_config.iterated_technique,
                            iteratedPercentile: item.default_step_config.iterated_percentile,
                            createdAt: item.default_step_config.created_at,
                        },
                    }))
                );
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
