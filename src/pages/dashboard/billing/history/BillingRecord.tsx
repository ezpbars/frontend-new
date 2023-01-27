import { ReactElement } from "react";
import { BillingHistoryItem } from "./BillingHistory";
import styles from "./BillingHistory.module.css";

type BillingRecordProps = {
    record: BillingHistoryItem;
};

export const BillingRecord = ({ record }: BillingRecordProps): ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.text}>Billing Period:</div>
                <div className={styles.rangeContainer}>
                    <div className={styles.start}>{new Date(record.periodStart * 1000).toLocaleDateString()}</div>
                    <div className={styles.separator}>-</div>
                    <div className={styles.end}>{new Date(record.periodEnd * 1000).toLocaleDateString()}</div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.text}>Traces used:</div>
                <div className={styles.value}>{record.traces}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.text}>Total amount paid:</div>
                <div className={styles.value}>
                    {(record.cost / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
            </div>
        </div>
    );
};
