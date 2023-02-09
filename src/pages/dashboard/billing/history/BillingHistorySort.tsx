import { SortItem } from "../../../../shared/resources/SortItem";

/**
 * sorts the billing history by uid
 */
export type BillingHistorySortItemUid = SortItem<"uid">;
/**
 * sorts the billing history by the date the period started
 */
export type BillingHistorySortItemStartedAt = SortItem<"period_started_at">;
/**
 * sorts the billing history by the number of traces used
 */
export type BillingHistorySortItemTraces = SortItem<"traces">;
/**
 * sorts the billing history by how much the user was charged
 */
export type BillingHistorySortItemCost = SortItem<"cost">;

/**
 * a single sort option for the billing history
 */
export type BillingHistorySortItem =
    | BillingHistorySortItemUid
    | BillingHistorySortItemStartedAt
    | BillingHistorySortItemTraces
    | BillingHistorySortItemCost;

/**
 * describes a way of sorting the billing history
 */
export type BillingHistorySort = BillingHistorySortItem[];

export const PeriodStartedAtMostToLeastRecent: BillingHistorySort = [
    { key: "period_started_at", dir: "desc", before: null, after: null },
];
export const PeriodStartedAtLeastToMostRecent: BillingHistorySort = [
    { key: "period_started_at", dir: "asc", before: null, after: null },
];
export const TracesMostToLeast: BillingHistorySort = [{ key: "traces", dir: "desc", before: null, after: null }];
export const TracesLeastToMost: BillingHistorySort = [{ key: "traces", dir: "asc", before: null, after: null }];
export const CostMostToLeast: BillingHistorySort = [{ key: "cost", dir: "desc", before: null, after: null }];
export const CostLeastToMost: BillingHistorySort = [{ key: "cost", dir: "asc", before: null, after: null }];

export const SortOptions = [
    { name: "Period Started At (Most to Least Recent)", val: PeriodStartedAtMostToLeastRecent },
    { name: "Period Started At (Least to Most Recent)", val: PeriodStartedAtLeastToMostRecent },
    { name: "Traces (Most to Least)", val: TracesMostToLeast },
    { name: "Traces (Least to Most)", val: TracesLeastToMost },
];
