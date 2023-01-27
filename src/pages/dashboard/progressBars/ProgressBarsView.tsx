import { ReactElement } from "react";
import { ProgressBarFull } from "./ProgressBarFull";
import { ProgressBar } from "./useFetchProgressBars";

type ReactElementProps = {
    progressBars: ProgressBar[];
};

export const ProgressBarsView = ({ progressBars }: ReactElementProps): ReactElement => {
    return (
        <div>
            {progressBars.map((pbar) => (
                <ProgressBarFull key={pbar.uid} pbar={pbar} />
            ))}
        </div>
    );
};
