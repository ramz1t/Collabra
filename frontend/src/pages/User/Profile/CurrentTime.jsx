import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const TimezoneClock = ({ timezone }) => {
    if (!timezone) return
    const [counter, setCounter] = useState(0)
    // const { t } = useTranslation()
    // const localTime = new Date()
    // const localOffset = localTime.getTimezoneOffset() / 60 // Hours
    //
    // const targetTime = new Date().toLocaleString('en-US', {
    //     timeZone: timezone,
    // })
    // const targetOffset = new Date(targetTime).getTimezoneOffset() / 60 // Corrected
    // console.log('Malmo', localTime, localTime.getTimezoneOffset())
    // console.log(
    //     'Moscow',
    //     new Date(targetTime),
    //     new Date(targetTime).getTimezoneOffset()
    // )
    // const currentTime = new Date(targetTime).toLocaleTimeString()
    // const hourOffset = localOffset - targetOffset
    //
    // const hourOffsetString = hourOffset
    //     ? `${hourOffset > 0 ? '+' : ''}${hourOffset} ${Math.abs(hourOffset) === 1 ? 'hour' : 'hours'}`
    //     : '0 hours'
    const currentTime = new Date().toLocaleTimeString([], {
        day: 'numeric',
        month: 'short',
        weekday: 'short',
        hour12: false,
        hours: 'numeric',
        minutes: 'numeric',
        seconds: undefined,
        timeZone: timezone,
    })

    useEffect(() => {
        const intervalId = setInterval(
            () => setCounter((counter) => counter + 1),
            1000
        )
        return () => clearInterval(intervalId)
    }, [counter])

    return (
        <p className="text-gray-600 dark:text-gray-400">
            {timezone}
            <br />
            <span key={counter}>{currentTime}</span>
        </p>
    )
}

export default TimezoneClock
