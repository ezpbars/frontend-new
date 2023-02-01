import { ReactElement, useCallback, useContext, useMemo, useState } from "react";
import { LoginContext } from "../../../shared/LoginContext";
import { ProgressBar, useFetchProgressBars } from "./useFetchProgressBars";
import styles from "./ProgressBars.module.css";
import { ProgressBarsView } from "./ProgressBarsView";
import { Listing } from "../../../shared/resources/Listing";
import { CreateProgressBarForm } from "./CreateProgressBarForm";
import { useEffect } from "react";

/**
 * Shows a paginated listing of the users current progress bars, allows them to
 * filter or sort that list, edit/delete the progress bars, or even create new
 * progress bars.
 */
export const ProgressBars = (): ReactElement => {
    const loginContext = useContext(LoginContext);
    const { progressBars: fetchedProgressBars, error } = useFetchProgressBars({ loginContext });
    const [progressBars, setProgressBars] = useState<ProgressBar[]>([]);

    useEffect(() => {
        setProgressBars(fetchedProgressBars);
    }, [fetchedProgressBars]);

    const itemsView = useMemo(() => {
        return <ProgressBarsView progressBars={progressBars} setProgressBars={setProgressBars} />;
    }, [progressBars]);

    const onNewProgressBar = useCallback((newProgressBar: ProgressBar) => {
        setProgressBars((oldProgressBars) => [...oldProgressBars, newProgressBar]);
    }, []);

    const createProgressBarView = useMemo(() => {
        return <CreateProgressBarForm onCreated={onNewProgressBar} />;
    }, [onNewProgressBar]);

    const filterSectionView = useMemo(() => {
        return <></>;
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>Your Progress Bars</div>
            {error}
            <div className={styles.listContainer}>
                <Listing
                    itemsSection={itemsView}
                    createSection={createProgressBarView}
                    filterSection={filterSectionView}
                />
            </div>
        </div>
    );
};
