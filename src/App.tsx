import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Billing } from "./pages/dashboard/billing/Billing";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ProgressBars } from "./pages/dashboard/progressBars/ProgressBars";
import { ProgressBarSteps } from "./pages/dashboard/ProgressBarSteps";
import { Traces } from "./pages/dashboard/Traces";
import { TraceSteps } from "./pages/dashboard/TraceSteps";
import { UserTokens } from "./pages/dashboard/UserTokens";
import { DevLogin } from "./pages/dev_login/DevLogin";
import { Home } from "./pages/home/Home";
import { Pricing } from "./pages/pricing/Pricing";
import { apiFetch } from "./shared/ApiConstants";
import {
    extractUserAttributes,
    storeAuthTokens,
    storeUserAttributes,
    TokenResponseConfig,
} from "./shared/LoginContext";

export const App = () => {
    useEffect(() => {
        const fragment = window.location.hash;
        if (fragment === "") {
            return;
        }

        let args: URLSearchParams;
        try {
            args = new URLSearchParams(fragment.substring(1));
        } catch {
            return;
        }

        if (!args.has("id_token")) {
            return;
        }

        const idToken = args.get("id_token");
        const accessToken = args.get("access_token");
        if (idToken === null) {
            return;
        }

        const tokens: TokenResponseConfig = { idToken, accessToken };
        const userAttributes = extractUserAttributes(tokens);

        (async () => {
            await Promise.all([
                storeAuthTokens(tokens),
                storeUserAttributes(userAttributes),
                apiFetch(
                    "/api/1/users/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            Authorization: `bearer ${tokens.idToken}`,
                        },
                    },
                    null
                ).catch(console.error),
            ]);

            const redirectLoc = localStorage.getItem("login-redirect");
            if (redirectLoc) {
                localStorage.removeItem("login-redirect");
                window.location.href = redirectLoc;
                return;
            }

            window.location.hash = "";
        })();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="/dashboard/billing" element={<Billing />} />
                    <Route path="/dashboard/tokens" element={<UserTokens />} />
                    <Route path="/dashboard/pbars" element={<ProgressBars />} />
                    <Route path="/dashboard/pbar-steps" element={<ProgressBarSteps />} />
                    <Route path="/dashboard/traces" element={<Traces />} />
                    <Route path="/dashboard/trace-steps" element={<TraceSteps />} />
                </Route>
                <Route path="/dev_login" element={<DevLogin />} />
            </Routes>
        </BrowserRouter>
    );
};
