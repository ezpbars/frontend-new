import { ReactElement } from "react";
import styles from "./CurrentBilling.module.css";
import { AugmentedTier } from "./useCalculateSubtotal";

export type CostBreakdownRowProps = {
    augmentedTier: AugmentedTier;
};

export const CostBreakdownRow = ({ augmentedTier }: CostBreakdownRowProps): ReactElement => {
    return (
        <div className={styles.breakdownRow}>
            <div className={styles.traceRange}>
                <div className={styles.offset}>{augmentedTier.traceOffset}</div>
                <div className={styles.separator}>-</div>
                <div className={styles.endRange}>{augmentedTier.traceOffset + augmentedTier.usedTraces - 1}</div>
            </div>
            <div className={styles.separator}>@</div>
            <div className={styles.price}>
                <div className={styles.currency}>{augmentedTier.tier.unitPriceCents}¢</div>
                <div className={styles.separator}>/</div>
                <div className={styles.unitAmt}>{augmentedTier.tier.unitAmount} traces</div>
            </div>
            <div className={styles.separator}> = </div>
            <div className={styles.cost}>
                <div className={styles.currency}>
                    {(augmentedTier.priceCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>
            </div>
        </div>
    );
};
