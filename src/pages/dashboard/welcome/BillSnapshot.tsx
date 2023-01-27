import { ReactElement, useContext } from "react";
import styles from "./BillSnapshot.module.css";
import { LoginContext } from "../../../shared/LoginContext";
import { useFetchCurrent } from "../billing/current/useFetchCurrent";
import { useCalculateSubtotal } from "../billing/current/useCalculateSubtotal";
import { useFetchTiers } from "../billing/useFetchTiers";

export const BillSnapshot = (): ReactElement => {
    const loginContext = useContext(LoginContext);
    const { traces, start, error: currentTracesError } = useFetchCurrent({ loginContext });
    const { tiers, error: fetchTiersError } = useFetchTiers({ loginContext });
    const { subtotal, augmentedTiers } = useCalculateSubtotal({ tiers, usedTraces: traces });

    return (
        <div className={styles.container}>
            {currentTracesError}
            {fetchTiersError}
            <div className={styles.header}>Bill Snapshot</div>
            <div className={styles.row}>
                <div>Traces:</div>
                <div>{traces}</div>
            </div>
            <div className={styles.row}>
                <div>Subtotal:</div>
                <div>{(subtotal / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
            </div>
        </div>
    );
};
