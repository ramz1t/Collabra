import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import Button from '../Button'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

export const Item = ({ children, value, setter }) => {
    return <Button action={() => setter(value)}>{children}</Button>
}

const Dropdown = ({ className, children, cols = 1, selectedItem, name }) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(`.drop-${name}`)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])
    return (
        <div className={cn('relative', className)}>
            <div
                onClick={() => setIsOpen((prevState) => !prevState)}
                className={cn(
                    'px-4 py-2 hover:cursor-pointer flex gap-3 items-center font-bold hover:bg-slate-50 dark:hover:bg-slate-700/50 w-fit border border-slate-600 rounded-md transition-colors duration-75',
                    `drop-${name}`
                )}
            >
                {selectedItem}
                {isOpen ? <IoChevronUp /> : <IoChevronDown />}
            </div>

            {isOpen && (
                <div
                    style={{
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    }}
                    className="grid gap-1 absolute border border-slate-600 p-1 top-12 rounded-md shadow-md"
                >
                    {children}
                </div>
            )}
        </div>
    )
}

export default Dropdown
