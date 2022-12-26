import { useMemo } from "react"

export function useErrorState(errorMessage: string, condition: () => boolean, deps?: React.DependencyList) {
    return useMemo(() => {
        const isGood = condition();

        if (isGood == false) {
            return errorMessage;
        }
        return undefined
    }, deps)
}