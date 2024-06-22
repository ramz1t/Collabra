import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useScreenSize from '../../hooks/useScreenSize'
import { Button } from '../index'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

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
                                      bottom: 0,
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
                        className="fixed md:absolute left-0 max-md:right-0 max-md:max-h-fit md:left-0 md:top-12 origin-top-left bg-white dark:bg-slate-900 dark:border-slate-800 border rounded-t-2xl md:rounded-lg max-md:shadow-[0_6px_20px_15px_rgba(0,0,0,0.2)] md:drop-shadow-md grid gap-1 p-1"
                    >
                        {!isTablet && title && (
                            <p className="text-sm font-bold px-3 py-2">
                                {title}
                            </p>
                        )}
                        {Object.entries(values).map(([key, value]) => (
                            <li key={key} onClick={() => handleSelect(key)}>
                                {renderOption(value, key === selected)}
                            </li>
                        ))}
                        {!isTablet && (
                            <Button
                                w_full
                                className="py-5 text-gray-600 dark:text-gray-400 font-semibold"
                                action={() => setIsOpen(false)}
                            >
                                {t('close')}
                            </Button>
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Dropdown
