import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export interface LoadMoreMarkerProps {
    isFetching: boolean
    error?: Error | null
    hasNextPage: boolean
    fetch(): void
}

const LoadMoreMarker = ({
    isFetching,
    error,
    fetch,
    hasNextPage,
}: LoadMoreMarkerProps): React.ReactElement => {
    const loadMoreMarkerRef = useRef<HTMLSpanElement>(null)
    const { t } = useTranslation()

    useEffect(() => {
        const callback = (entries: IntersectionObserverEntry[]) => {
            if (
                entries[0].isIntersecting &&
                !isFetching &&
                hasNextPage &&
                !error
            ) {
                fetch()
            }
        }

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.0,
        }
        const observer: IntersectionObserver = new IntersectionObserver(
            callback,
            options
        )

        if (loadMoreMarkerRef.current) {
            observer.observe(loadMoreMarkerRef.current)
        }

        return () => observer.disconnect()
    }, [isFetching, hasNextPage, error, fetch])

    return (
        <span className="mx-auto min-h-[1px] min-w-[1px] col-span-full">
            {isFetching && t('loading')}
            {error && t('error')}
            <span
                ref={loadMoreMarkerRef}
                className="block min-h-[1px] min-w-[1px]"
            ></span>
        </span>
    )
}

export default LoadMoreMarker
