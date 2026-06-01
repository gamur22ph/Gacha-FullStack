import { useAuth } from "../contexts/AuthContext";
import { PriceIds } from "../data/plans";
import { ENV } from "../helpers/EnvUtils";

export const goCheckOut = async (token: string) => {
    try {
        const response = await fetch(`${ENV.API_URL}/api/subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ priceId: PriceIds.pro })
        });
        
        const data = await response.json();

        if (data.url){
            window.location.href = data.url;
        } else {
            console.error("Stripe URL missing from response");
        }
    } catch(err: any) {
        console.error("Error creating checkout session", err.message);
    }
}