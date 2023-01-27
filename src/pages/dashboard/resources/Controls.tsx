import { ReactElement } from "react";
import styles from "./Controls.module.css";

type ControlsProps = {
    onDelete: Function;
    onEdit: Function;
    contextMenu?: ReactElement | null;
    editing: boolean;
};

export const Controls = ({ onDelete, onEdit, contextMenu, editing }: ControlsProps): ReactElement => {
    return <div className={styles.container}></div>;
};
