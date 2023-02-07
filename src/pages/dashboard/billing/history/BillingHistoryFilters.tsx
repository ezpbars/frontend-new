import { FilterItem, FilterTextItem } from "../../resources/FilterItems";

export type BillingHistoryFilters = {
    userSub: FilterTextItem | null;
    periodStartedAt: FilterItem<Date> | null;
};

export function newBillingHistoryFilters({ userSub = undefined, periodStartedAt = undefined }): BillingHistoryFilters {
    return {
        userSub: userSub === undefined ? null : userSub,
        periodStartedAt: periodStartedAt === undefined ? null : periodStartedAt,
    };
}
