/**
 * the ability to sort by the given key, where K is the name of the key to sort by
 *
 */
export type SortItem<K extends string> = {
    key: K;
    dir: "asc" | "asc_eq" | "desc" | "desc_eq";
    before: any;
    after: any;
};

/**
 * describes a sort option with a name, where T is the sort item type
 */
export type SortOption<T> = {
    name: string;
    val: T;
};

/**
 * returns whether or not there are additional items in the listing after the
 * current value.
 * @param sort the sort returned from the backend
 * @returns whether or not the sort could be used to get the next page
 */
export function sortHasAfter<T extends string>(sort: SortItem<T>[]): boolean {
    if (!sort) {
        return false;
    }
    for (const item of sort) {
        if (item.after !== null && item.after !== undefined) {
            return true;
        }
    }
    return false;
}

/**
 * returns whether or not there are additional items in the listing before the
 * current value.
 * @param sort the sort returned from the backend
 * @returns whether or not the sort could be used to get the previous page
 */
export function sortHasBefore<T extends string>(sort: SortItem<T>[]): boolean {
    if (!sort) {
        return false;
    }
    for (const item of sort) {
        if (item.before !== null && item.before !== undefined) {
            return true;
        }
    }
    return false;
}
