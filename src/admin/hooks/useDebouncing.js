import { useEffect, useState } from "react";

export function useDebouncing({search = "", delay = 500}){
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, delay);
        return () => clearTimeout(timer);
    }, [search, delay])

    return debouncedSearch;
}