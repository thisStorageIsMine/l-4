import { useEffect } from "react"


const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title
    }, [])
}
const useDebounce = (fn: () => void) => {
    let timeoutId: NodeJS.Timeout | undefined;

    return (ms: number) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn();
        }, ms);
    };
};

export { useTitle, useDebounce }