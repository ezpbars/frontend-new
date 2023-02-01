import { ReactElement, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../../../shared/ApiConstants";
import { describeResponseError } from "../../../../shared/errors/describeResponseError";
import { ErrorFetchFailed } from "../../../../shared/errors/ErrorFetchFailed";
import { ErrorUnknown } from "../../../../shared/errors/ErrorUnknown";
import { LoginContextValue } from "../../../../shared/LoginContext";

export type BillingHistoryItem = {
    /**
     * the sub of the user the usage record belongs to
     */
    userSub: string;

    /**
     * the uid of the usage record
     */
    uid: string;

    /**
     * The url for the hosted invoice page, for more information see
     * https://stripe.com/docs/invoicing/hosted-invoice-page
     */
    hostedInvoiceUrl?: string;

    /**
     * when the billing period started in seconds since the unix epoch
     */
    periodStart: number;

    /**
     * when the billing period ended in seconds since the unix epoch
     */
    periodEnd: number;

    /**
     * the number of traces used in the billing period
     */
    traces: number;

    /**
     * how much the user was charged for this billing period
     */
    cost: number;
};

type FetchHistoryState = {
    /**
     * the list of billing records
     */
    history: BillingHistoryItem[];

    /**
     * the error, if any, that occurred while fetching the billing records
     */
    error: ReactElement | null;

    /**
     * whether or not any billing records were actually received from the fetch
     */
    records: boolean;
};

export const useFetchHistory = ({ loginContext }: { loginContext: LoginContextValue }): FetchHistoryState => {
    const [records, setRecords] = useState(false);
    const [history, setHistory] = useState<BillingHistoryItem[]>([]);
    const [error, setError] = useState<ReactElement | null>(null);

    useEffect(() => {
        let active = true;
        fetchHistory();
        return () => {
            active = false;
        };

        async function fetchHistory() {
            if (loginContext.state !== "logged-in") {
                return;
            }
            try {
                const historyResponse = await apiFetch(
                    "/api/1/user_usages/search",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            sort: [
                                {
                                    key: "period_started_at",
                                    dir: "asc",
                                },
                            ],
                        }),
                    },
                    loginContext
                );
                if (!active) {
                    return;
                }
                if (!historyResponse.ok) {
                    throw historyResponse;
                }
                const historyData: {
                    items: {
                        user_sub: string;
                        uid: string;
                        hosted_invoice_url?: string;
                        period_started_at: number;
                        period_ended_at: number;
                        traces: number;
                        cost: number;
                    }[];
                } = await historyResponse.json();
                if (!active) {
                    return;
                }
                if (historyData.items.length > 0) {
                    setRecords(true);
                    setHistory(
                        historyData.items.map((item) => ({
                            userSub: item.user_sub,
                            uid: item.uid,
                            hostedInvoiceUrl: item.hosted_invoice_url,
                            periodStart: item.period_started_at,
                            periodEnd: item.period_ended_at,
                            traces: item.traces,
                            cost: item.cost,
                        }))
                    );
                } else {
                    setRecords(false);
                }
            } catch (e) {
                if (!active) {
                    return;
                }
                if (e instanceof TypeError) {
                    setError(<ErrorFetchFailed hint="fetching tiers" />);
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
    }, [loginContext]);

    const result = useMemo(() => ({ history, error, records }), [history, error, records]);
    return result;
};
