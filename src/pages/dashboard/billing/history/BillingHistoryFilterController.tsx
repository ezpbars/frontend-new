import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { BillingHistoryFilters, newBillingHistoryFilters } from "./BillingHistoryFilters";
import { BillingHistorySort, SortOptions } from "./BillingHistorySort";
import styles from "./BillingHistoryFilterController.module.css";

type BillingHistoryFilterControllerProps = {
    /**
     * the current sort for the billing history
     */
    sort: BillingHistorySort;

    /**
     * called when the user changes the sort
     *
     * @param sort the new sort
     */
    setSort: Dispatch<SetStateAction<BillingHistorySort>>;

    /**
     * the current filters for the billing history, if any
     */
    filters: BillingHistoryFilters;

    /**
     * called when the user changes the filters
     *
     * @param filters the new filters
     */
    setFilters: Dispatch<SetStateAction<BillingHistoryFilters>>;
};

export const BillingHistoryFilterController = ({
    sort,
    setSort,
    filters,
    setFilters,
}: BillingHistoryFilterControllerProps): ReactElement => {
    const idPrefix = "i" + Math.random().toString(36).substring(2);
    const [sortValue, setSortValue] = useState<string>(SortOptions[0].name);

    const now = Date.now();
    const [dateValue, setDateValue] = useState<number>(filters.periodStartedAt?.value.valueOf() ?? now);

    return (
        <fieldset className={styles.container}>
            <legend className={styles.legend}>Sort and Filter</legend>

            <label htmlFor={`${idPrefix}period-start`}>Period Start</label>
            <input
                className={styles.filter}
                value={unixToDateString(dateValue)}
                type="date"
                id={`${idPrefix}period-start`}
                onChange={(e) => {
                    setFilters(
                        newBillingHistoryFilters({
                            periodStartedAt: e.target.value === null ? undefined : e.target.valueAsNumber,
                        })
                    );
                    setDateValue(e.target.valueAsNumber);
                }}
            />

            <select
                id={`${idPrefix}sort`}
                value={sortValue}
                onChange={(e) => {
                    const selected = e.target.value;
                    const option = SortOptions.find((opt) => opt.name === selected);
                    if (option) {
                        setSort(option.val);
                        setSortValue(option.name);
                    }
                }}
            >
                {SortOptions.map((option) => (
                    <option label={option.name} value={option.name} key={option.name} />
                ))}
            </select>
        </fieldset>
    );
};

function unixToDateString(unix: number): string {
    return new Date(unix).toISOString().split("T")[0];
}
