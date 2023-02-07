import { ReactElement, useContext } from "react";
import { LoginContext } from "../../../../shared/LoginContext";
import styles from "./CurrentBilling.module.css";
import { EstimatedCost } from "./EstimatedCost";
import { useFetchCurrent } from "./useFetchCurrent";
import { useFetchTiers } from "../useFetchTiers";

export type Tier = {
    /**
     * The sub of the user who gets this price tier
     */
    userSub: string;

    /**
     * The unique identifier for this price tier
     */
    uid: string;

    /**
     * How many units can be purchased at this tier
     */
    units: number;

    /**
     * How many traces constitute one unit in this tier. Note that we do not
     * charge for partial units, so larger unit amounts are effectively cheaper.
     */
    unitAmount: number;

    /**
     * The price per unit represented in cents. Always an integer value to
     * avoid rounding issues.
     */
    unitPriceCents: number;
};

export const CurrentBilling = (): ReactElement => {
    const loginContext = useContext(LoginContext);
    const { traces, start, error: currentTracesError } = useFetchCurrent({ loginContext });
    const { tiers, error: fetchTiersError } = useFetchTiers({ loginContext });

    return (
        <div className={styles.container}>
            {currentTracesError}
            {fetchTiersError}
            {`Since ${new Date(start * 1000).toDateString()} you have used ${traces} traces`}
            <div className={styles.breakdownContainer}>
                {traces > 0 ? <EstimatedCost usedTraces={traces} tiers={tiers} /> : null}
            </div>
        </div>
    );
};
