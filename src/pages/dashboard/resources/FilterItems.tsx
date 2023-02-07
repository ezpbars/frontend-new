/**
 * Describes a filter which is applied to a particular field. The field
 * the filter is applied to is from context.
 */
export type FilterItem<T> = {
    /**
     * the operator to use when comparing the value to the field
     */
    operator: "eq" | "neq" | "gt" | "gtn" | "gte" | "gten" | "lt" | "ltn" | "lte" | "lten";
    /**
     * the value to compare the field to
     */
    value: T;
};

/**
 * Describes a filter that applies to a text field. The name of the field is
 * from context.
 */
export type FilterTextItem = {
    /**
     * the operator to use when comparing the value to the field
     */
    operator: "eq" | "neq" | "ieq" | "ineq" | "gt" | "gte" | "lt" | "lte" | "ilike";
    /**
     * the value to compare the field to
     */
    value: string;
};
