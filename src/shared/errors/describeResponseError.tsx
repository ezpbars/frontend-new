import { ReactElement } from "react";

/**
 * Attempts to describe the error indicated in the given response, which
 * is presumably an unexpected status code for the given endpoint. This
 * checks if teh response looks like one of the expected standard error
 * responses (for the given status code).
 *
 * @param response The response object with the unexpected status code
 * @returns A react element which can be presented to the user describing
 *   the response
 */
export const describeResponseError = async (response: Response): Promise<ReactElement> => {
    try {
        if (response.status === 401) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            return <>You must be logged in to do that.</>;
        } else if (response.status === 403) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            return <>You are not authorized to access this resource.</>;
        } else if (response.status === 404) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            return <>The requested resource does not exist.</>;
        } else if (response.status === 409) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            return <>The requested operation conflicts with the state of the resource.</>;
        } else if (response.status === 422) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            if (body.hasOwnProperty("detail")) {
                const guessedBody = body as { detail: { loc: string[]; msg: string; type: string }[] };

                if (guessedBody.detail.length === 0) {
                    return <>The request was invalid. Contact support.</>;
                }

                return (
                    <>
                        The request was invalid. This is our fault, so contact support. To help resolve the issue,
                        include the following information:
                        <ul>
                            {guessedBody.detail.map((error, index) => (
                                <li key={index}>
                                    {error.loc.join(".")} {error.type}: {error.msg}
                                </li>
                            ))}
                        </ul>
                    </>
                );
            }

            return <>The request was invalid. Contact support.</>;
        } else if (response.status === 429) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            return <>You have exceeded the rate limit for this endpoint.</>;
        } else if (response.status === 500) {
            const bodyText = await response.text();

            try {
                const body = JSON.parse(bodyText);
                if (body.hasOwnProperty("message")) {
                    return <>{body.message}</>;
                }
            } catch (e) {
                return <>The server has encountered an error. Contact support</>;
            }

            return <>The server has encountered an error. Contact support</>;
        } else if (response.status === 501) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            return <>The requested operation has not been implemented yet.</>;
        } else if (response.status === 503) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }
            if (response.headers.has("Retry-After")) {
                const retry = response.headers.get("Retry-After");
                return (
                    <>
                        The server is currently unavailable. It may be down temporarily for maintenance. Please try
                        again in {retry} seconds.
                    </>
                );
            }

            return <>The server is currently unavailable. It may be down temporarily for maintenance.</>;
        } else if (response.status === 504) {
            const body = await response.json();
            if (body.hasOwnProperty("message")) {
                return <>{body.message}</>;
            }

            return <>The server is currently unavailable. Please try again.</>;
        }
    } catch (e) {
        console.error(e);
        return <>An error occurred while trying to determine what the error was. Contact support.</>;
    }

    return <>An unexpected error occurred. Contact support.</>;
};
