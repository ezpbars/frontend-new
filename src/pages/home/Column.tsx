import { ReactElement } from "react";

type ColumnProps = {
    header: string;
    subheader: string;
};

export const Column = ({ header, subheader }: ColumnProps): ReactElement => {
    return (
        <div>
            <div>
                <h1>{header}</h1>
                <h2>{subheader}</h2>
            </div>
        </div>
    );
};
