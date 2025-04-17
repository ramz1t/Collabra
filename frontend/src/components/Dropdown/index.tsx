import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
    memo,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useScreenSize from '../../hooks/useScreenSize'
import { Button } from '../index'
import { useTranslation } from 'react-i18next'
import { IoCheckmark } from 'react-icons/io5'
import cn from 'classnames'

type DropdownProps<T> = {
    values: Record<string, T>
    cols?: number
    renderOption: (value: T, isSelected: boolean) => React.ReactNode
    renderSelected: (value: T) => React.ReactNode
    selected: string | null
    setSelected:
        | React.Dispatch<React.SetStateAction<string | null>>
        | ((value: string | null) => void)
    title?: string
    notSelectedPlaceholder?: React.ReactNode
    openTop?: boolean
}

const getMotionVariants = (isTablet: boolean) => ({
    initial: isTablet
        ? { opacity: 0, scale: 0.5 }
        : { opacity: 0, bottom: '-100px' },
    animate: isTablet ? { opacity: 1, scale: 1 } : { opacity: 1, bottom: 0 },
    exit: isTablet
        ? { opacity: 0, scale: 0.5 }
        : { opacity: 0, bottom: '-100px' },
})

const Dropdown = <T,>({
    values,
    cols = 1,
    renderOption,
    renderSelected,
    selected,
    setSelected,
    title,
    notSelectedPlaceholder,
    openTop,
}: DropdownProps<T>) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)
    const { isTablet } = useScreenSize()
    const { t } = useTranslation()

    const selectedValue = selected ? values[selected] : null

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        },
        [setIsOpen, dropdownRef]
    )

    const handleSelect = useCallback(
        (key: string) => {
            setSelected(key)
            setIsOpen(false)
        },
        [setSelected, setIsOpen]
    )

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => window.removeEventListener('click', handleClickOutside)
    }, [handleClickOutside])

    const variants = useMemo(() => getMotionVariants(isTablet), [isTablet])

    return (
        <div className="relative w-fit" ref={dropdownRef} key={`${isTablet}`}>
            <Button
                className="min-h-10"
                action={() => setIsOpen((prev) => !prev)}
            >
                {selectedValue
                    ? renderSelected(selectedValue)
                    : notSelectedPlaceholder ?? t('select')}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        ref={listRef}
                        initial={variants.initial}
                        animate={variants.animate}
                        exit={variants.exit}
                        transition={{ duration: 0.125 }}
                        style={{
                            pointerEvents: isOpen ? 'auto' : 'none',
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        }}
                        className={cn(
                            openTop
                                ? 'md:bottom-12 origin-bottom-left'
                                : 'md:top-12 origin-top-left',
                            'max-h-52 overflow-y-auto md:min-w-20 fixed md:absolute z-40 left-0 max-md:right-0 max-md:max-h-fit md:left-0 bg-white bg-white/70 md:dark:bg-white/5 backdrop-blur-2xl dark:bg-slate-900 dark:border-slate-800 border dark:border-0 md:divide-y dark:divide-gray-700 rounded-t-2xl md:rounded-lg max-md:shadow-[0_6px_20px_15px_rgba(0,0,0,0.2)] md:drop-shadow-md grid max-md:gap-1 max-md:p-1'
                        )}
                    >
                        {!isTablet && title && (
                            <p className="text-sm font-bold px-3 py-2">
                                {title}
                            </p>
                        )}
                        {Object.entries(values).map(([key, value]) => (
                            <li key={key}>
                                <button
                                    className="flex items-center whitespace-nowrap px-3 min-h-9 hover:bg-white/90 dark:hover:bg-white/[0.025] w-full"
                                    onClick={() => handleSelect(key)}
                                >
                                    <span className="min-w-7 max-md:order-last max-md:text-accent max-md:dark:text-accent-dark text-lg">
                                        {key === selected && <IoCheckmark />}
                                    </span>
                                    {renderOption(value, key === selected)}
                                </button>
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

export default memo(Dropdown)
