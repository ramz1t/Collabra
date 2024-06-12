import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import React from 'react'

export interface NavbarItemProps {
    icon: React.ReactElement
    title: string
    href: string
    className?: string
    bold?: boolean
    markerDisabled?: boolean
    end?: boolean
}

const NavbarItem = ({
    icon,
    title,
    href,
    className,
    bold,
    markerDisabled,
    end,
}: NavbarItemProps): React.ReactElement => {
    return (
        <NavLink
            to={href}
            tabIndex={0}
            className={({ isActive }) =>
                cn(
                    'flex gap-4 max-md:relative items-center px-3.5 py-3 rounded-md min-h-12 transition-all duration-150 md:max-w-12 overflow-clip group-hover/navbar:max-w-52 justify-start',
                    'before:absolute before:left-0 before:md:left-3 before:bg-accent dark:before:bg-accent-dark before:w-1 before:rounded-r-lg before:transition-all',
                    bold ? 'font-bold' : '',
                    isActive && !markerDisabled
                        ? 'before:h-6 group-hover/navbar:md:before:rounded-l-lg bg-accent/5 dark:bg-accent-dark/10'
                        : 'before:h-0 hover:md:bg-accent/[.03] dark:md:hover:bg-accent-dark/5',
                    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-md focus-visible:outline-none',
                    className
                )
            }
            end={end}
        >
            <span className="text-lg">{icon}</span>
            <p className="block whitespace-nowrap max-md:truncate">{title}</p>
        </NavLink>
    )
}

export default NavbarItem
