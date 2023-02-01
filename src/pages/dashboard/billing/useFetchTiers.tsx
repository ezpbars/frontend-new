import { ReactElement, useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../../shared/ApiConstants";
import { describeResponseError } from "../../../shared/errors/describeResponseError";
import { ErrorFetchFailed } from "../../../shared/errors/ErrorFetchFailed";
import { ErrorUnknown } from "../../../shared/errors/ErrorUnknown";
import { LoginContextValue } from "../../../shared/LoginContext";

export type Tier = {
    /**
     * The sub of the user who gets this price tier
     */
    userSub: string;

    /**
     * The unique identifier for this price tier
     */
    uid: string;

    /**
     * How many units can be purchased at this tier
     */
    units: number;

    /**
     * How many traces constitute one unit in this tier. Note that we do not
     * charge for partial units, so larger unit amounts are effectively cheaper.
     */
    unitAmount: number;

    /**
     * The price per unit represented in cents. Always an integer value to
     * avoid rounding issues.
     */
    unitPriceCents: number;
};

type FetchTiersState = {
    tiers: Tier[];
    error: ReactElement | null;
};

export const useFetchTiers = ({ loginContext }: { loginContext: LoginContextValue }): FetchTiersState => {
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [error, setError] = useState<ReactElement | null>(null);

    useEffect(() => {
        let active = true;
        fetchTiers();
        return () => {
            active = false;
        };

        async function fetchTiers() {
            if (loginContext.state !== "logged-in") {
                return;
            }
            try {
                const tiersResponse = await apiFetch(
                    "/api/1/users/pricing_plans/tiers/search",
                    {
                        method: "POST",
                        headers: {
                            "content-type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            sort: [
                                {
                                    key: "position",
                                    dir: "asc",
                                },
                            ],
                        }),
                    },
                    loginContext
                );
                if (!active) {
                    return;
                }
                if (!tiersResponse.ok) {
                    throw tiersResponse;
                }
                const tiersData: {
                    items: {
                        user_sub: string;
                        uid: string;
                        position: number;
                        units: number;
                        unit_amount: number;
                        unit_price_cents: number;
                    }[];
                } = await tiersResponse.json();
                if (!active) {
                    return;
                }
                setTiers(
                    tiersData.items.map((item) => ({
                        userSub: item.user_sub,
                        uid: item.uid,
                        position: item.position,
                        units: item.units,
                        unitAmount: item.unit_amount,
                        unitPriceCents: item.unit_price_cents,
                    }))
                );
            } catch (e) {
                if (!active) {
                    return;
                }

                if (e instanceof TypeError) {
                    setError(<ErrorFetchFailed hint="fetching tiers" />);
                } else if (e instanceof Response) {
                    const error = await describeResponseError(e);
                    if (!active) {
                        return;
                    }
                    setError(error);
                } else {
                    console.error(e);
                    setError(<ErrorUnknown context={e} />);
                }
            }
        }
    }, [loginContext]);

    const result = useMemo(() => ({ tiers, error }), [tiers, error]);
    return result;
};
