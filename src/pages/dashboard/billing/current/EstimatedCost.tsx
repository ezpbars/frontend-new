import { ReactElement } from "react";
import { CostBreakdownRow } from "./CostBreakdownRow";
import { Tier } from "./CurrentBilling";
import styles from "./CurrentBilling.module.css";
import { useCalculateSubtotal } from "./useCalculateSubtotal";

type EstimatedCostProps = {
    /**
     * the number of traces that have been used so far in the current pay period
     */
    usedTraces: number;

    /**
     * the tiers that make up the user's pricing plan
     */
    tiers: Tier[];
};

/**
 * the total estimated cost breakdown by tier for the current pay period based on the number of
 * traces that have been used so far and the user's pricing plan
 * @param props the properties needed to calculate the estimated cost for
 * billing
 */
export const EstimatedCost = ({ usedTraces, tiers }: EstimatedCostProps): ReactElement => {
    const { subtotal, augmentedTiers } = useCalculateSubtotal({ tiers, usedTraces });

    return (
        <div className={styles.estimatedCostContainer}>
            <div className={styles.costBreakdown}>
                Cost Breakdown:
                {augmentedTiers.map((augmentedTier) => (
                    <CostBreakdownRow key={augmentedTier.tier.uid} augmentedTier={augmentedTier} />
                ))}
            </div>
            <div className={styles.subtotal}>
                Subtotal: {(subtotal / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
        </div>
    );
};
