import { ENV } from "../helpers/EnvUtils"


export const gachaPull = async (token : string, pullCount: number) => {
    const response = await fetch(`${ENV.API_URL}/api/items/pull`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "pullCount" : pullCount
        })
    })

    return await response;
};

