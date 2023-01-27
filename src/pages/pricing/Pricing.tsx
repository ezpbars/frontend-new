import { ReactElement } from "react";
import { StandardPage } from "../../shared/StandardPage";
import styles from "./Pricing.module.css";

export const Pricing = (): ReactElement => {
    return (
        <StandardPage>
            <div className={styles.container}>
                <div className={styles.header}>Pricing</div>
                <div className={styles.tableContainer}>
                    <div className={styles.columnsContainer}>
                        <div className={styles.left}>
                            <div className={styles.column}>
                                <div className={styles.columnHeader}>Traces</div>
                                <div className={styles.rows}>
                                    <div className={styles.row}>0 - 5000</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.column}>
                                <div className={styles.columnHeader}>Traces/Unit</div>
                                <div className={styles.rows}>
                                    <div className={styles.row}>1000</div>
                                </div>
                            </div>
                            <div className={styles.border} />
                            <div className={styles.column}>
                                <div className={styles.columnHeader}>Unit Price</div>
                                <div className={styles.rows}>
                                    <div className={styles.row}>FREE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StandardPage>
    );
};
