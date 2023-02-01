import { ReactElement, useContext, useState, useMemo, useEffect } from "react";
import { BillingRecord } from "./BillingRecord";
import styles from "./BillingHistory.module.css";
import { LoginContext } from "../../../../shared/LoginContext";
import { BillingHistoryItem, useFetchHistory } from "./useFetchHistory";
import { Listing } from "../../../../shared/resources/Listing";

export const BillingHistory = (): ReactElement => {
    const loginContext = useContext(LoginContext);
    const { history: fetchedHistory, error, records } = useFetchHistory({ loginContext });
    const [history, setHistory] = useState<BillingHistoryItem[]>([]);

    useEffect(() => {
        setHistory(fetchedHistory);
    }, [fetchedHistory]);

    const itemsView = useMemo(() => {
        return (
            <div>
                {history.map((record) => (
                    <BillingRecord key={record.uid} record={record} />
                ))}
            </div>
        );
    }, [history]);

    const createSectionView = useMemo(() => {
        return <></>;
    }, []);

    const filterSectionView = useMemo(() => {
        return <></>;
    }, []);

    return records ? (
        <div className={styles.historyContainer}>
            <div className={styles.historyHeader}>Your Billing History</div>
            {error}
            <div className={styles.listContainer}>
                <Listing itemsSection={itemsView} createSection={createSectionView} filterSection={filterSectionView} />
            </div>
        </div>
    ) : (
        <div className={styles.historyContainer}>
            <div className={styles.historyHeader}>Your Billing History</div>
            <div className={styles.noRecords}>No History Yet</div>
        </div>
    );
};
