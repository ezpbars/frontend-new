import { ReactElement } from "react";
import { describeResponseError } from "./describeResponseError";
import { ErrorFetchFailed } from "./ErrorFetchFailed";
import { ErrorUnknown } from "./ErrorUnknown";

/**
 * Attempts to describe an error. Works best on errors that are a result
 * of an API call.
 *
 * @param e The error to describe.
 * @returns A React element describing the error.
 */
export const describeError = async (e: any): Promise<ReactElement> => {
    if (e instanceof TypeError) {
        return <ErrorFetchFailed hint="fetching tiers" />;
    } else if (e instanceof Response) {
        return await describeResponseError(e);
    } else {
        console.error(e);
        return <ErrorUnknown context={e} />;
    }
};
