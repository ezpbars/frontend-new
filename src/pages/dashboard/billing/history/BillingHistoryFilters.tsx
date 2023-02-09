import { FilterItem, FilterTextItem } from "../../resources/FilterItems";

export type BillingHistoryFilters = {
    userSub: FilterTextItem;
    periodStartedAt: FilterItem<Date>;
};

type newBillingHistoryFiltersProps = {
    /**
     * the sub of the user currently logged in
     */
    userSub?: string;

    /**
     * the date of the start of the period to filter by in seconds since the unix epoch
     */
    periodStartedAt?: number;
};

/**
 * Creates a new set of filters for the billing history.
 */
export function newBillingHistoryFilters({
    userSub,
    periodStartedAt,
}: newBillingHistoryFiltersProps): BillingHistoryFilters {
    return {
        userSub: { operator: "eq", value: userSub ?? "" },
        periodStartedAt: { operator: "gte", value: new Date(periodStartedAt ?? 0) },
    };
}

export function billingHistoryFiltersToApi(filters: BillingHistoryFilters): BillingHistoryFilters {
    return {
        userSub: filters.userSub,
        periodStartedAt: {
            operator: filters.periodStartedAt?.operator,
            value: new Date(filters.periodStartedAt?.value.getTime() / 1000),
        },
    };
}
