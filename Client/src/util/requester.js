import { useAuthenticatedStore } from "../stores/authenticated";

const request = async (method, url, data) => {

    const options = { method: method, mode: "cors", credentials: "include" };

    if (method !== "GET" && data) {
        options.headers = {
            "content-type": "application/json",
        };
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return;
    }
    
    const result = await response.json();
    
    if (!response.ok) {
        if (response.status === 401) {
            useAuthenticatedStore().setGuest();
        }
        throw new Error(result.message);
    }
    return result;
};

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");