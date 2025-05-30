import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { getScrollableParent } from '../utils'
import { MenuPosition } from '../types'

const useMenu = (
    btnRef: React.RefObject<HTMLButtonElement>,
    menuRef: React.RefObject<HTMLUListElement>,
    position: MenuPosition
) => {
    const [isOpen, setIsOpen] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom')

    const updatePosition = useCallback(() => {
        if (!(btnRef.current && menuRef.current)) return
        const rect = btnRef.current.getBoundingClientRect()
        const menuHeight = menuRef.current.offsetHeight
        const menuWidth = menuRef.current.offsetWidth

        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top

        const shouldFlipVertical =
            spaceBelow < menuHeight && spaceAbove > menuHeight
        setPlacement(shouldFlipVertical ? 'top' : 'bottom')

        const top = shouldFlipVertical
            ? rect.top + window.scrollY - menuHeight
            : rect.bottom + window.scrollY

        const left =
            rect.left +
            (position === 'left' ? rect.width : 0) -
            (position === 'left' ? menuWidth : 0)

        setCoords({ top, left })
    }, [position])

    useLayoutEffect(() => {
        if (isOpen) {
            updatePosition()
        }
    }, [isOpen, updatePosition])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                btnRef.current &&
                !btnRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        const handleScroll = () => {
            setIsOpen(false)
        }

        const scrollableParents = getScrollableParent(btnRef.current)

        window.addEventListener('click', handleClickOutside)
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', handleScroll)

        scrollableParents.forEach((el) =>
            el.addEventListener('scroll', handleScroll, { passive: true })
        )

        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', handleScroll)

            scrollableParents.forEach((el) =>
                el.removeEventListener('scroll', handleScroll)
            )
        }
    }, [updatePosition])

    return {
        isOpen,
        setIsOpen,
        coords,
        placement,
        updatePosition,
    }
}

export default useMenu
