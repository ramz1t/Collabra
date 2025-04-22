import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingState from '../LoadingState'

export interface LoadMoreMarkerProps {
    isFetching: boolean
    error?: Error | null
    hasNextPage: boolean
    fetch(): void
    className?: string
}

const LoadMoreMarker = ({
    isFetching,
    error,
    fetch,
    hasNextPage,
    className,
}: LoadMoreMarkerProps): React.ReactElement | undefined => {
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

    if (!hasNextPage) return

    return (
        <span className="mx-auto min-h-[1px] min-w-[1px] col-span-full">
            {isFetching && <LoadingState className={className} />}
            {error && t('error')}
            <span
                ref={loadMoreMarkerRef}
                className="block min-h-[1px] min-w-[1px]"
            ></span>
        </span>
    )
}

export default LoadMoreMarker
