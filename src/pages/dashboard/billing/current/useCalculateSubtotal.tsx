import { useEffect, useMemo, useState } from "react";
import { Tier } from "./CurrentBilling";

export type AugmentedTier = {
    /**
     * the pricing plan tier
     */
    tier: Tier;

    /**
     * the trace that starts off the tier (for expample if this is the second
     * tier and the first tier ended at 5000 traces, this tier's offset would be
     * 5001)
     */
    traceOffset: number;

    /**
     * the number of traces that have been used so far in this tier in the current pay period
     */
    usedTraces: number;

    /**
     * the calculated price for this tier in cents
     */
    priceCents: number;
};

type CalculateSubtotalState = {
    subtotal: number;
    augmentedTiers: AugmentedTier[];
};

export const useCalculateSubtotal = ({
    tiers,
    usedTraces,
}: {
    tiers: Tier[];
    usedTraces: number;
}): CalculateSubtotalState => {
    const [subtotal, setSubtotal] = useState(0);
    const [augmentedTiers, setAugmentedTiers] = useState<AugmentedTier[]>([]);

    useEffect(() => {
        let newAugmentedTiers: AugmentedTier[] = [];
        let newSubtotal = 0;
        let tierUsedTraces = 0;
        let traceOffset = 1;
        let remainingTraces = usedTraces;
        for (let i = 0; i < tiers.length; i++) {
            const tier = tiers[i];
            const tierTraces = tier.units * tier.unitAmount;
            if (remainingTraces > tierTraces) {
                tierUsedTraces = tierTraces;
            } else {
                tierUsedTraces = remainingTraces;
            }
            remainingTraces -= tierUsedTraces;

            let units = Math.floor(tierUsedTraces / tier.unitAmount);

            const augmentedTier: AugmentedTier = {
                tier: tier,
                traceOffset: traceOffset,
                usedTraces: tierUsedTraces,
                priceCents: tier.unitPriceCents * units,
            };
            traceOffset += tier.units * tier.unitAmount;
            newAugmentedTiers.push(augmentedTier);
            newSubtotal += augmentedTier.priceCents;
            if (remainingTraces === 0) {
                break;
            }
        }
        setAugmentedTiers(newAugmentedTiers);
        setSubtotal(newSubtotal);
    }, [tiers, usedTraces]);

    const result = useMemo(() => ({ subtotal, augmentedTiers }), [subtotal, augmentedTiers]);
    return result;
};
