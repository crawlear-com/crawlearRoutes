import * as React from "react";

const useIntersectionObserver = (callback: () => void, needsToCallback: boolean) => {
    const intersectionElementRef = React.useRef<HTMLDivElement | null>(null);
    const observerRef = React.useRef<IntersectionObserver | null>(null);

    const handleIntersection: IntersectionObserverCallback = React.useCallback((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (intersectionElementRef.current && observerRef.current) {
                    observerRef.current.unobserve(intersectionElementRef.current);
                    if (needsToCallback) {
                        callback();
                    }
                }
            }
        });
    }, [callback, needsToCallback]);

    React.useEffect(() => {
        const element = intersectionElementRef.current;

        if (!element) return;
        const observer = new IntersectionObserver(handleIntersection);
        observerRef.current = observer;

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, [handleIntersection]);

    return intersectionElementRef
}

export default useIntersectionObserver;