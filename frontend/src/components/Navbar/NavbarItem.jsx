import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

const NavbarItem = ({
    icon,
    title,
    href,
    className,
    bold,
    markerDisabled,
    end,
    color,
}) => {
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                cn(
                    'flex gap-4 max-md:relative items-center px-3.5 py-3 rounded-md min-h-12 transition-all duration-150  md:max-w-12 overflow-clip group-hover/navbar:max-w-full justify-start',
                    'before:absolute before:left-0 before:md:left-3 before:bg-accent dark:before:bg-accent-dark before:w-1 before:rounded-r-lg before:transition-all',
                    bold ? 'font-bold' : '',
                    isActive && !markerDisabled
                        ? 'bg-accent/5 dark:bg-accent-dark/10 before:h-6 group-hover/navbar:md:before:rounded-l-lg'
                        : 'hover:bg-accent/[0.03] dark:hover:bg-accent-dark/5 before:h-0',
                    className
                )
            }
            end={end}
        >
            <span className="text-lg">{icon}</span>
            <p className="block whitespace-nowrap line-clamp-1">{title}</p>
        </NavLink>
    )
}

export default NavbarItem
