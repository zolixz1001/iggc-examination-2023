import { FetchError } from "@/errors/FetchError";

export const fetcher = async (url: URL | string) => {
    const res = await fetch(url)

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        let info = null;
        if (res.status === 422) info = await res.json()
        const error = new FetchError('An error occurred while fetching the data.', res.status, info)
        throw error
    }

    return res.json()
}

export default fetcher;