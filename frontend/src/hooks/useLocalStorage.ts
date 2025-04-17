import { useState, useEffect, useCallback } from 'react'

const getSavedValue = <T>(key: string, initialValue: T): T => {
    const localStorageValue = localStorage.getItem(key)
    if (localStorageValue !== null) {
        const savedValue = JSON.parse(localStorageValue)
        if (savedValue !== null) return savedValue
    }
    if (initialValue instanceof Function) return initialValue()

    return initialValue
}

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [value, setValue] = useState<T | null>(() => {
        return getSavedValue<T>(key, initialValue)
    })

    useEffect(() => {
        if (value === null) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
        window.dispatchEvent(
            new CustomEvent('storage', { detail: { key, value } })
        )
    }, [value, key])

    const listener = useCallback(
        (e: CustomEvent) => {
            if (e.detail.key === key) {
                setValue(e.detail.value)
            }
        },
        [key]
    )

    useEffect(() => {
        window.addEventListener('storage', listener as EventListener)
        return () =>
            window.removeEventListener('storage', listener as EventListener)
    }, [listener])

    return [value, setValue] as const
}

export default useLocalStorage
