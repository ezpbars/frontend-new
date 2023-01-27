import { ReactElement } from "react";
import { CurrentBilling } from "./current/CurrentBilling";
import styles from "./Billing.module.css";
import { BillingHistory } from "./history/BillingHistory";

export const Billing = (): ReactElement => {
    return (
        <div className={styles.container}>
            <CurrentBilling />
            <BillingHistory />
        </div>
    );
};
