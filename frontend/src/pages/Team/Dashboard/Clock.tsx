import React, { useEffect, useState } from 'react'

const Clock = (): React.ReactElement => {
    const [time, setTime] = useState<Date>(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <span className="text-gray-600 dark:text-gray-400 text-lg md:ml-auto">
            {time.toLocaleDateString(undefined, {
                day: 'numeric',
                weekday: 'short',
                month: 'short',
            })}{' '}
            {time.toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
            })}
        </span>
    )
}

export default Clock
