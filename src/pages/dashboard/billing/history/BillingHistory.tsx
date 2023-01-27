import { describeResponseError } from "../../../../shared/errors/describeResponseError";
import { ErrorFetchFailed } from "../../../../shared/errors/ErrorFetchFailed";
import { ReactElement, useEffect, useContext, useState } from "react";
import { ErrorUnknown } from "../../../../shared/errors/ErrorUnkown";
import { LoginContext } from "../../../../shared/LoginContext";
import { apiFetch } from "../../../../shared/ApiConstants";
import { BillingRecord } from "./BillingRecord";

import styles from "./BillingHistory.module.css";

export type BillingHistoryItem = {
    userSub: string;
    uid: string;
    hostedInvoiceUrl?: string;
    periodStart: number;
    periodEnd: number;
    traces: number;
    cost: number;
};

export const BillingHistory = (): ReactElement => {
    const [error, setError] = useState<ReactElement | null>(null);
    const [history, setHistory] = useState<BillingHistoryItem[]>([]);
    const [records, setRecords] = useState(false);
    const loginContext = useContext(LoginContext);

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
                    setError(<ErrorFetchFailed hint="fetching billing history" />);
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

    return records ? (
        <div className={styles.historyContainer}>
            <div className={styles.historyHeader}>Your Billing History</div>
            <div className={styles.recordsContainer}>
                {history.map((record) => (
                    <BillingRecord key={record.uid} record={record} />
                ))}
            </div>
        </div>
    ) : (
        <div className={styles.historyContainer}>
            <div className={styles.historyHeader}>Your Billing History</div>
            <div className={styles.noRecords}>No History Yet</div>
        </div>
    );
};
