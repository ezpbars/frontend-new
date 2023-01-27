import { ReactElement } from "react";
import { Column } from "./Column";
import styles from "./HomeContentSection1.module.css";
import img1 from "../../img/clock.jpg";
import img2 from "../../img/cat-programmer.jpg";
import img3 from "../../img/zero-calc.jpg";

export const HomeContentSection1 = (): ReactElement => {
    return (
        <div className={styles.container}>
            <h1 className={styles.sectionHeader}>Your new favourite progress bar</h1>
            <div className={styles.row}>
                <div className={styles.columnContainer}>
                    <div className={styles.imageContainer}>
                        <img className={styles.column1Image} width={300} height={200} src={img1} alt=""></img>
                    </div>
                    <Column header="Accurate" subheader="The more your use it, the better it works" image={true} />
                </div>
                <div className={styles.columnContainer}>
                    <div className={styles.imageContainer}>
                        <img className={styles.column2Image} width={300} height={200} src={img2} alt=""></img>
                    </div>
                    <Column
                        header="Easy to Use"
                        subheader="Easy implementation with our thorough guides"
                        image={true}
                    />
                </div>
                <div className={styles.columnContainer}>
                    <div className={styles.imageContainer}>
                        <img className={styles.column3Image} width={300} height={200} src={img3} alt=""></img>
                    </div>
                    <Column header="Affordable" subheader="First 5000 traces of every month Free" image={true} />
                </div>
            </div>
            <p className={styles.footer}>footer text</p>
        </div>
    );
};
