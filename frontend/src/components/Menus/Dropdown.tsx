import React from 'react'
import BasePopupMenu from './BasePopupMenu'
import { IoCheckmark } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'

type DropdownProps<T> = {
    values: Record<string, T>
    cols?: number
    renderOption: (value: T, isSelected: boolean) => React.ReactNode
    renderSelected: (value: T) => React.ReactNode
    selected: string | null
    setSelected: (value: string | null) => void
    notSelectedPlaceholder?: React.ReactNode
    position?: 'left' | 'right'
    className?: string
    verticalPositionOffset?: number
}

const Dropdown = <T,>({
    values,
    cols = 1,
    renderOption,
    renderSelected,
    selected,
    setSelected,
    notSelectedPlaceholder,
    position,
    className,
    verticalPositionOffset = 8,
}: DropdownProps<T>) => {
    const { t } = useTranslation()
    const selectedValue = selected ? values[selected] : null

    const menuContent = (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
            }}
            className="divide-y dark:divide-gray-700"
        >
            {Object.entries(values).map(([key, value]) => (
                <>
                    <li key={key}>
                        <button
                            className="flex items-center whitespace-nowrap px-3 min-h-9 hover:bg-white/90 dark:hover:bg-white/[0.025] w-full"
                            onClick={() => setSelected(key)}
                        >
                            <span className="min-w-7 text-lg">
                                {key === selected && <IoCheckmark />}
                            </span>
                            {renderOption(value, key === selected)}
                        </button>
                    </li>
                </>
            ))}
        </div>
    )

    return (
        <BasePopupMenu
            position={position}
            className={className}
            buttonContent={
                selectedValue
                    ? renderSelected(selectedValue)
                    : notSelectedPlaceholder ?? t('select')
            }
            menuContent={menuContent}
            verticalPositionOffset={verticalPositionOffset}
        />
    )
}

export default Dropdown
