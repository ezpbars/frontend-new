import { ReactElement } from "react";
import { StandardPage } from "../../shared/StandardPage";
import { Banner } from "./Banner";
import { HomeContent } from "./HomeContent";

/**
 * The homepage, i.e., landing screen component
 */
export const Home = (): ReactElement => {
    return (
        <StandardPage banner={<Banner />}>
            <HomeContent />
        </StandardPage>
    );
};
