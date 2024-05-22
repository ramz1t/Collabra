import { useState, useEffect } from 'react'

const getSavedValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key))

    if (savedValue !== null) return savedValue
    if (initialValue instanceof Function) return initialValue()

    return initialValue
}

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        window.dispatchEvent(
            new CustomEvent('storage', { detail: { key, value } })
        )
    }, [value])

    useEffect(() => {
        const listener = (e) => {
            if (e.detail.key === key) setValue(e.detail.value)
        }
        window.addEventListener('storage', listener)
        return () => window.removeEventListener('storage', listener)
    }, [])

    return [value, setValue]
}

export default useLocalStorage
