import React, { useRef } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import cn from 'classnames'

interface ResizableColumnsProps {
    children: React.ReactNode[]
    className?: string
    cellClassName?: string
    minWidth?: number
    containerName: string
    initialWidths?: string // e.g. "2fr_1fr_3fr"
}

const parseFrString = (str: string, count: number): number[] => {
    const parts = str.split('_').map((p) => parseFloat(p.replace('fr', '')))
    if (parts.length !== count || parts.some(isNaN)) {
        return Array(count).fill(100 / count)
    }
    const total = parts.reduce((a, b) => a + b, 0)
    return parts.map((n) => (n / total) * 100)
}

const ResizableColumns = ({
    children,
    className,
    cellClassName,
    minWidth = 100,
    containerName,
    initialWidths,
}: ResizableColumnsProps) => {
    const childArray = React.Children.toArray(children)

    const defaultWidths =
        initialWidths !== undefined
            ? parseFrString(initialWidths, childArray.length)
            : Array(childArray.length).fill(100 / childArray.length)

    const [widths, setWidths] = useLocalStorage<number[] | null>(
        containerName,
        defaultWidths
    )

    const containerRef = useRef<HTMLDivElement | null>(null)

    const startResizing = (
        index: number,
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!widths) return

        const startX = e.clientX
        const startWidths = [...widths]

        const onMouseMove = (moveEvent: MouseEvent) => {
            if (!containerRef.current) return

            const containerWidth = containerRef.current.offsetWidth
            const dx = moveEvent.clientX - startX

            const leftWidthPx = (startWidths[index] / 100) * containerWidth
            const rightWidthPx = (startWidths[index + 1] / 100) * containerWidth

            const newLeftWidth = Math.max(minWidth, leftWidthPx + dx)
            const newRightWidth = Math.max(minWidth, rightWidthPx - dx)

            const newWidths = [...startWidths]
            newWidths[index] = (newLeftWidth / containerWidth) * 100
            newWidths[index + 1] = (newRightWidth / containerWidth) * 100

            setWidths(newWidths)
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    if (!widths) return null

    return (
        <div
            ref={containerRef}
            className={cn('flex w-full overflow-hidden', className)}
        >
            {childArray.map((child, i) => (
                <React.Fragment key={i}>
                    <div
                        style={{ width: `${widths[i] ?? 0}%` }}
                        className={cn('h-full overflow-auto', cellClassName)}
                    >
                        {child}
                    </div>
                    {i < childArray.length - 1 && (
                        <div
                            onMouseDown={(e) => startResizing(i, e)}
                            className="w-0.5 rounded-full cursor-col-resize hover:bg-gray-500 relative after:absolute after:-inset-2"
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ResizableColumns
