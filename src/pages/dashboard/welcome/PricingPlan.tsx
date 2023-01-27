import { ReactElement, useContext, useState } from "react";
import styles from "./PricingPlan.module.css";
import { LoginContext } from "../../../shared/LoginContext";
import { useFetchTiers } from "../billing/useFetchTiers";

export const PricingPlan = (): ReactElement => {
    const [showInfo, setShowInfo] = useState<"units" | "unitAmount" | "unitPrice">("units");
    const [footerOpen, setFooterOpen] = useState(false);
    const loginContext = useContext(LoginContext);
    const { tiers, error: fetchTiersError } = useFetchTiers({ loginContext });
    const info = {
        units: (
            <div className={styles.footerText}>
                The units column refers to the number of units you can purchase at that tier for that pay period.
            </div>
        ),
        unitAmount: (
            <div className={styles.footerText}>The unit amount column refers to the number of traces in each unit.</div>
        ),
        unitPrice: (
            <div className={styles.footerText}>
                The unit price column refers to the price of each full unit. You will not be charged for partial units.
            </div>
        ),
    };
    return (
        <div className={`${styles.container} ${footerOpen ? styles.footerOpen : ""}`}>
            <div className={styles.header}>Your Pricing Plan</div>
            {fetchTiersError}
            <div className={styles.tableContainer}>
                <div className={styles.headers}>
                    <div className={styles.unitsHeader}>
                        Units
                        <button
                            className={styles.infoIcon}
                            onClick={() => {
                                if (showInfo !== "units" || !footerOpen) {
                                    setShowInfo("units");
                                    setFooterOpen(true);
                                } else {
                                    setFooterOpen(false);
                                }
                            }}
                        />
                    </div>
                    <div className={styles.unitAmountHeader}>
                        Unit Amount (traces)
                        <button
                            className={styles.infoIcon}
                            onClick={() => {
                                if (showInfo !== "unitAmount" || !footerOpen) {
                                    setShowInfo("unitAmount");
                                    setFooterOpen(true);
                                } else {
                                    setFooterOpen(false);
                                }
                            }}
                        />
                    </div>
                    <div className={styles.unitPriceHeader}>
                        Unit Price
                        <button
                            className={styles.infoIcon}
                            onClick={() => {
                                if (showInfo !== "unitPrice" || !footerOpen) {
                                    setShowInfo("unitPrice");
                                    setFooterOpen(true);
                                } else {
                                    setFooterOpen(false);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={styles.rows}>
                    {tiers?.map((tier) => (
                        <div key={tier.uid} className={styles.row}>
                            {tier.units ? (
                                <div className={styles.units}>{tier.units}</div>
                            ) : (
                                <div className={styles.units}>Unlimited</div>
                            )}
                            <div className={styles.unitAmount}>{tier.unitAmount}</div>
                            {tier.unitPriceCents !== 0 ? (
                                <div className={styles.unitPrice}>{tier.unitPriceCents}¢</div>
                            ) : (
                                <div className={styles.unitPrice}>Free</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.footer}>{showInfo && info[showInfo]}</div>
        </div>
    );
};
