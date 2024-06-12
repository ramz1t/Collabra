import { useState, useRef, useEffect } from 'react'

const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    const timeoutRef = useRef(0)

    useEffect(() => {
        clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(
            () => {
                setDebouncedValue(value)
            },
            value ? delay : 0
        )

        return () => clearTimeout(timeoutRef.current)
    }, [value, delay])

    return debouncedValue
}

export default useDebounce
