import { ReactElement, useContext, useState, useMemo, useEffect } from "react";
import { BillingRecord } from "./BillingRecord";
import styles from "./BillingHistory.module.css";
import { LoginContext } from "../../../../shared/LoginContext";
import { BillingHistoryItem, useFetchHistory } from "./useFetchHistory";
import { Listing } from "../../../../shared/resources/Listing";
import { BillingHistoryFilters, newBillingHistoryFilters } from "./BillingHistoryFilters";
import { BillingHistorySort, SortOptions } from "./BillingHistorySort";
import { BillingHistoryFilterController } from "./BillingHistoryFilterController";

export const BillingHistory = (): ReactElement => {
    const loginContext = useContext(LoginContext);
    const [filters, setFilters] = useState<BillingHistoryFilters>(newBillingHistoryFilters({}));
    const [sort, setSort] = useState<BillingHistorySort>(SortOptions[0].val);
    const { history: fetchedHistory, error, records } = useFetchHistory({ loginContext, sort, filters, limit: 3 });
    const [history, setHistory] = useState<BillingHistoryItem[]>([]);

    useEffect(() => {
        setHistory(fetchedHistory);
    }, [fetchedHistory]);

    const itemsView = useMemo(() => {
        return (
            <div className={styles.itemsView}>
                {history.map((record) => (
                    <BillingRecord key={record.uid} record={record} />
                ))}
            </div>
        );
    }, [history]);

    const filterSectionView = useMemo(() => {
        return (
            <div>
                <BillingHistoryFilterController
                    filters={filters}
                    setFilters={setFilters}
                    sort={sort}
                    setSort={setSort}
                />
            </div>
        );
    }, [filters, sort]);

    return records ? (
        <div className={styles.historyContainer}>
            <div className={styles.historyHeader}>Your Billing History</div>
            {error}
            <div className={styles.listContainer}>
                <Listing itemsSection={itemsView} createSection={<></>} filterSection={filterSectionView} />
            </div>
        </div>
    ) : (
        <div className={styles.historyContainer}>
            <div className={styles.historyHeader}>Your Billing History</div>
            <div className={styles.noRecords}>No History Yet</div>
        </div>
    );
};
