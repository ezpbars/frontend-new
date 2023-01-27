import { ReactElement } from "react";
import { BillSnapshot } from "./BillSnapshot";
import { PricingPlan } from "./PricingPlan";
import { RecentProgressBars } from "./RecentProgressBars";
import styles from "./Welcome.module.css";

export const Welcome = (): ReactElement => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Welcome to Your Dashboard!</h1>
            <div className={styles.contentContainer}>
                <div className={styles.left}>
                    <div className={styles.billSnapshot}>
                        <BillSnapshot />
                    </div>
                    <div className={styles.recentPbars}>
                        <RecentProgressBars />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.pricingPlan}>
                        <PricingPlan />
                    </div>
                </div>
            </div>
        </div>
    );
};
