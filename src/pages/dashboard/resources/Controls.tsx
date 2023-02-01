import { ReactElement, useState } from "react";
import styles from "./Controls.module.css";
import assistiveStyles from "../../../shared/assistive.module.css";

type ControlsProps = {
    /**
     * Callback for when the delete button is clicked.
     * If null, the delete button will not be rendered.
     */
    onDelete?: (() => void) | null;

    /**
     * Callback for when the edit button is clicked.
     * If null, the edit button will not be rendered.
     */
    onEdit?: (() => void) | null;

    /**
     * If specified, a more button will be rendered. when the button is clicked
     * the element returned from the function will be added directly after the
     * onMore element
     */
    onMore?: (() => ReactElement) | null;

    /**
     * whether or not the progress bar is in the editing state, used to style
     * the edit button
     */
    editing: boolean;
};

/**
 * Shows the controls for an item within a listing. Elements which do not apply
 * to the specific items being listed can be left null and will not be rendered.
 */
export const Controls = ({ onDelete, onEdit, onMore, editing }: ControlsProps): ReactElement => {
    return (
        <div className={styles.container}>
            {onDelete && (
                <div className={styles.delete}>
                    <button className={styles.deleteButton} type="button" onClick={onDelete}>
                        <div className={assistiveStyles.srOnly}>delete</div>
                    </button>
                </div>
            )}
            {onEdit && (
                <div className={styles.edit}>
                    <button
                        className={`${editing ? styles.editButtonEditing : styles.editButton}`}
                        type="button"
                        onClick={onEdit}
                    >
                        <div className={assistiveStyles.srOnly}>edit</div>
                    </button>
                </div>
            )}
            {onMore && (
                <div className={styles.more}>
                    <button className={styles.moreButton} type="button" onClick={onMore}>
                        <div className={assistiveStyles.srOnly}>more</div>
                    </button>
                </div>
            )}
        </div>
    );
};
