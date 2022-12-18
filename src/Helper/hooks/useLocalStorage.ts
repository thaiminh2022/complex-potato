import { useState, useEffect } from "react"

export function useLocalStorage<TInit>(key: string, initialValue: TInit | (() => TInit)) {

    const [value, setValue] = useState<TInit>(() => {
        const jsonVal = localStorage.getItem(key);

        if (jsonVal == null) {
            if (typeof initialValue == "function") {
                return (initialValue as Function)()
            }
            return initialValue;
        } else {
            return JSON.parse(jsonVal)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])


    return [value, setValue] as [TInit, typeof setValue]
}