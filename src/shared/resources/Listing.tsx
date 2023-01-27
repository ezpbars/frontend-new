import { ReactElement } from "react";
import styles from "./Listing.module.css";

type ListingProps = {
    itemsSection: ReactElement;
    createSection: ReactElement;
    filterSection: ReactElement;
};

export const Listing = ({ itemsSection, createSection, filterSection }: ListingProps): ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.items}>{itemsSection}</div>
                <div className={styles.filters}>{filterSection}</div>
            </div>
            <div className={styles.create}>{createSection}</div>
        </div>
    );
};
