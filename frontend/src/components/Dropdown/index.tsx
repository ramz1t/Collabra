import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useScreenSize from '../../hooks/useScreenSize'
import { Button } from '../index'
import { IoClose } from 'react-icons/io5'

type DropdownProps<T> = {
    values: Record<string, T>
    cols?: number
    renderOption: (value: T, isSelected: boolean) => React.ReactNode
    renderSelected: (value: T, isOpen: boolean) => React.ReactNode
    selected: string
    setSelected:
        | React.Dispatch<React.SetStateAction<string>>
        | React.Dispatch<React.SetStateAction<string | null>>
    title?: string
}

const Dropdown = <T,>({
    values,
    cols = 1,
    renderOption,
    renderSelected,
    selected,
    setSelected,
    title,
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)
    const { isTablet } = useScreenSize()

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
        <div className="relative" ref={dropdownRef} key={`${isTablet}`}>
            <div className="min-h-10" onClick={() => setIsOpen(!isOpen)}>
                {renderSelected(selectedValue, isOpen)}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        ref={listRef}
                        initial={
                            isTablet
                                ? {
                                      top: '40px',
                                      opacity: 0,
                                      scale: 0.5,
                                  }
                                : {
                                      opacity: 0,
                                      bottom: '-100px',
                                  }
                        }
                        animate={
                            isTablet
                                ? {
                                      top: '48px',
                                      opacity: 1,
                                      scale: 1,
                                  }
                                : {
                                      opacity: 1,
                                      bottom: '8px',
                                  }
                        }
                        exit={
                            isTablet
                                ? {
                                      top: '40px',
                                      opacity: 0,
                                      scale: 0.5,
                                  }
                                : {
                                      bottom: '-100px',
                                      opacity: 0,
                                  }
                        }
                        transition={{
                            duration: 0.075,
                        }}
                        style={{
                            pointerEvents: isOpen ? 'auto' : 'none',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        }}
                        className="fixed md:absolute left-2 max-md:right-2 max-md:max-h-fit md:left-0 md:top-12 origin-top-left bg-white dark:bg-slate-900 dark:border-slate-800 border rounded-2xl md:rounded-lg drop-shadow-md grid gap-1 p-1"
                    >
                        {!isTablet && (
                            <div className="flex items-center gap-2 p-1 pb-2 mb-1 dark:border-slate-800 border-b">
                                <Button
                                    className="rounded-full min-h-7 min-w-7 text-gray-600 dark:text-slate-400 bg-gray-200 dark:bg-slate-700"
                                    action={() => setIsOpen(false)}
                                >
                                    <IoClose />
                                </Button>
                                <p className="text-sm font-bold">{title}</p>
                            </div>
                        )}
                        {Object.entries(values).map(([key, value]) => (
                            <li
                                className="max-md:overflow-hidden last:max-md:rounded-b-xl"
                                key={key}
                                onClick={() => handleSelect(key)}
                            >
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
