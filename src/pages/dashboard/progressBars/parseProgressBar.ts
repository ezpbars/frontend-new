import { ProgressBar } from "./useFetchProgressBars";

/**
 * Converts the representation of a ProgressBar from the server to
 * our internal representation. Primarily, this just switches to
 * camelCase and adds type hints.
 *
 * @param item The ProgressBar as returned from the server
 * @returns The ProgressBar in our internal representation
 */
export const parseProgressBar = (item: {
    uid: string;
    name: string;
    sampling_max_count: number;
    sampling_max_age_seconds: number;
    sampling_technique: "systematic" | "simpleRandom";
    version: number;
    created_at: number;
    default_step_config: {
        uid: string;
        name: string;
        position: number;
        iterated: boolean;
        one_off_technique: "percentile" | "harmonicMean" | "geometricMean" | "arithmeticMean";
        one_off_percentile: number;
        iterated_technique: "bestFit.linear" | "percentile" | "harmonicMean" | "geometricMean" | "arithmeticMean";
        iterated_percentile: number;
        created_at: number;
    };
}): ProgressBar => {
    return {
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
    };
};
