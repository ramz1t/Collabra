import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type DropdownProps<T> = {
    values: Record<string, T>
    cols?: number
    renderOption: (value: T, isSelected: boolean) => React.ReactNode
    renderSelected: (value: T, isOpen: boolean) => React.ReactNode
    selected: string
    setSelected:
        | React.Dispatch<React.SetStateAction<string>>
        | React.Dispatch<React.SetStateAction<string | null>>
}

const Dropdown = <T,>({
    values,
    cols = 1,
    renderOption,
    renderSelected,
    selected,
    setSelected,
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const selectedValue = values[selected]

    const handleSelect = (key: string) => {
        setSelected(key)
        setIsOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => window.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="min-h-10" onClick={() => setIsOpen(!isOpen)}>
                {renderSelected(selectedValue, isOpen)}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{
                            top: '40px',
                            opacity: 0,
                            clipPath: 'inset(0% 50% 90% 0%)',
                        }}
                        animate={{
                            top: '48px',
                            opacity: 1,
                            clipPath: 'inset(0% 0% 0% 0%)',
                        }}
                        exit={{
                            top: '40px',
                            opacity: 0,
                            clipPath: 'inset(0% 50% 90% 0%)',
                        }}
                        transition={{ duration: 0.075 }}
                        style={{
                            pointerEvents: isOpen ? 'auto' : 'none',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        }}
                        className="absolute left-0 top-12 origin-top-left bg-white dark:bg-slate-900 dark:border-slate-800 border rounded-md shadow-md grid gap-1 p-1"
                    >
                        {Object.entries(values).map(([key, value]) => (
                            <li key={key} onClick={() => handleSelect(key)}>
                                {renderOption(value, key === selected)}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Dropdown
