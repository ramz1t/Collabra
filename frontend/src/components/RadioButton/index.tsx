import cn from 'classnames'
import React, {
    ChangeEvent,
    memo,
    useContext,
    useId,
    useMemo,
    useCallback,
} from 'react'
import ThemeContext, { IThemeContext } from '../../contexts/ThemeContext'

export interface RadioButtonProps {
    value: string
    selectedValue: string
    onChange(value: string): void
    className?: string
    text: React.ReactNode
    disabled?: boolean
    color?: string
    name: string
}

const RadioButton = ({
    value,
    selectedValue,
    onChange,
    className,
    text,
    disabled,
    color,
    name,
}: RadioButtonProps) => {
    const id = useId()
    const { isDark, tailwindConfig } = useContext(ThemeContext) as IThemeContext

    const checkboxAccent = useMemo(() => {
        return color
            ? color
            : isDark
              ? // @ts-ignore
                tailwindConfig.theme.colors.accent?.dark ?? '#2563eb'
              : // @ts-ignore
                tailwindConfig.theme.colors.accent?.DEFAULT ?? '#3b82f6'
    }, [color, isDark, tailwindConfig])

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (!disabled) {
                onChange(e.target.value)
            }
        },
        [onChange, disabled]
    )

    const isChecked = value === selectedValue

    return (
        <div className="grid">
            <div className="flex items-center gap-3">
                <input
                    id={id}
                    type="radio"
                    name={name}
                    value={value}
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={disabled}
                    tabIndex={0}
                    aria-checked={isChecked}
                    aria-disabled={disabled}
                    style={
                        {
                            '--checkbox-accent': checkboxAccent,
                        } as React.CSSProperties
                    }
                    className={cn(
                        'min-h-6 min-w-6 rounded-full bg-slate-100 dark:bg-slate-700 appearance-none relative hover:cursor-pointer',
                        'after:transition-all after:duration-100 after:scale-0 checked:after:scale-100 after:opacity-0 checked:after:opacity-100',
                        'after:rounded-full after:bg-[--checkbox-accent]',
                        'after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
                        'after:w-2/3 after:h-2/3',
                        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none',
                        'disabled:checked:after:bg-gray-400/60 disabled:hover:cursor-not-allowed',
                        className
                    )}
                />
                <label className="flex items-center" htmlFor={id}>
                    {text}
                </label>
            </div>
        </div>
    )
}

export default memo(RadioButton)
