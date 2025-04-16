import cn from 'classnames'
import React, { ChangeEvent, memo, useContext, useId, useMemo } from 'react'
import ThemeContext, { IThemeContext } from '../../contexts/ThemeContext'

export interface CheckboxProps {
    value: boolean
    className?: string
    title?: string
    text: React.ReactNode
    setValue(value: boolean): void
    disabled?: boolean
    color?: string
}

const Checkbox = ({
    value,
    setValue,
    className,
    title,
    text,
    disabled,
    color,
}: CheckboxProps) => {
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

    return (
        <div className="grid">
            {title && <p className="pb-1 pl-1">{title}</p>}
            <div className="flex items-center gap-3">
                <input
                    id={id}
                    type="checkbox"
                    checked={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setValue(e.target.checked)
                    }
                    disabled={disabled}
                    tabIndex={0}
                    aria-checked={value}
                    aria-disabled={disabled}
                    style={
                        {
                            '--checkbox-accent': checkboxAccent,
                        } as React.CSSProperties
                    }
                    className={cn(
                        'min-h-6 min-w-6 rounded-md bg-slate-100 dark:bg-slate-700 appearance-none relative hover:cursor-pointer',
                        'after:transition-all after:duration-100 after:scale-0 checked:after:scale-100 after:opacity-0 checked:after:opacity-100',
                        'after:rounded-[20px] checked:after:rounded-md after:bg-[--checkbox-accent]',
                        'after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm',
                        'after:text-white after:content-["✓"] after:w-full after:h-full after:flex after:items-center after:justify-center',
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

export default memo(Checkbox)
