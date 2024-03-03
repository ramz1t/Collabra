import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import ThemeContext from '../../contexts/ThemeContext.jsx'

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
    const { isDark } = useContext(ThemeContext)
    const [isActive, setIsActive] = useState(false)
    const [bgOp, setBgOp] = useState('00')
    if (!color) color = isDark ? '#e3bb58' : '#1B3F99'

    useEffect(() => {
        if (window.location.pathname === href) {
            setIsActive(true)
            setBgOp(isDark ? '15' : '10')
        } else {
            setIsActive(false)
            setBgOp('00')
        }
    }, [window.location.pathname, isDark])

    return (
        <NavLink
            to={href}
            onMouseEnter={() => {
                if (isActive) return
                setBgOp(isDark ? '10' : '05')
            }}
            onMouseLeave={() => {
                if (isActive) return
                setBgOp('00')
            }}
            style={{
                '--link-color': color,
                background: `${color}${bgOp}`,
            }}
            className={() =>
                cn(
                    'flex gap-4 max-md:relative items-center px-3.5 py-3 rounded-md min-h-12 transition-all duration-150  md:max-w-12 overflow-clip group-hover/navbar:max-w-52 justify-start',
                    'before:absolute before:left-0 before:md:left-3 before:bg-[--link-color] dark:before:bg-[--link-color] before:w-1 before:rounded-r-lg before:transition-all',
                    bold ? 'font-bold' : '',
                    isActive && !markerDisabled
                        ? 'before:h-6 group-hover/navbar:md:before:rounded-l-lg'
                        : 'pacity-0 hover:pacity-[0.03] dark:hover:pacity-5 before:h-0',
                    className
                )
            }
            end={end}
        >
            <span className="text-lg">{icon}</span>
            <p className="block whitespace-nowrap truncate">{title}</p>
        </NavLink>
    )
}

export default NavbarItem
