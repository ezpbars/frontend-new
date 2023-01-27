import { ReactElement } from "react";
import styles from "./Footer.module.css";

export const Footer = (): ReactElement => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Helpful Links</h1>
            </div>
            <div className={styles.innerContainer}>
                <div className={styles.left}>
                    <div className={styles.logoContainer}>ezpbars</div>
                    <p className={styles.description}>
                        ezpbars is a convenient service that allows you to provide accurate progress estimates to your
                        clients.
                    </p>
                    <div className={styles.socials}>
                        <div className={styles.facebook} />
                        <div className={styles.twitter} />
                        <div className={styles.instagram} />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.columnContainer}>
                        <div className={styles.columnHeader}>
                            <h1>Contact us</h1>
                        </div>
                        <ol className={styles.links}>
                            <li className={styles.linkContainer}>
                                <a href="#" className={styles.link}>
                                    link 1
                                </a>
                            </li>
                            <li className={styles.linkContainer}>
                                <a href="#" className={styles.link}>
                                    link 2
                                </a>
                            </li>
                            <li className={styles.linkContainer}>
                                <a href="#" className={styles.link}>
                                    link 3
                                </a>
                            </li>
                        </ol>
                    </div>
                    <div className={styles.columnContainer}>
                        <div className={styles.columnHeader}>
                            <h1>other stuff</h1>
                        </div>
                        <ol className={styles.links}>
                            <li className={styles.linkContainer}>
                                <a href="#" className={styles.link}>
                                    FAQ
                                </a>
                            </li>
                            <li className={styles.linkContainer}>
                                <a href="#" className={styles.link}>
                                    Pricing
                                </a>
                            </li>
                            <li className={styles.linkContainer}>
                                <a href="#" className={styles.link}>
                                    link 3
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};
