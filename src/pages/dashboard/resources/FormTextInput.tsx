import { Dispatch, SetStateAction } from "react";

type FormTextInputProps = {
    /**
     * The label to display for the input.
     */
    label: string;

    /**
     * The value of the input.
     */
    value: string;

    /**
     * Called when the user changes the value of the input.
     *
     * @param value The new value of the input.
     */
    setValue: Dispatch<SetStateAction<string>>;

    /**
     * Whether the input is disabled.
     */
    disabled: boolean;

    /**
     * Whether the input must be filled in or may be left blank.
     */
    required?: boolean;

    /**
     * A short description of the input to display below the input.
     */
    helpText?: string;

    /**
     * The minimum length of the input if it is a string.
     */
    minLength?: number;

    /**
     * The maximum length of the input if it is a string.
     */
    maxLength?: number;

    /**
     * If the input is a string, whether to trim whitespace from the beginning and end of the input.
     */
    trimWhiteSpace?: boolean;

    /**
     * If the input is a number, the minimum value of the input.
     */
    min?: number;

    /**
     * If the input is a number, the maximum value of the input.
     */
    max?: number;

    /**
     * If the input is a number, the step size of the input.
     */
    step?: number;

    /**
     * The type of the input.
     */
    type: "text" | "number";
};
