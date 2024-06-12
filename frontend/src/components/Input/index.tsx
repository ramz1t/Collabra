import React, { useRef, useEffect } from 'react'
import cn from 'classnames'
import { IInputInstance } from '../../hooks/useInput'

export interface InputProps<TValue, TRef> {
    className?: string
    titleClassname?: string
    placeholder?: string
    id?: string
    type?: HTMLInputElement['type']
    instance: IInputInstance<TValue>
    title?: string
    autoRef?: boolean
    disabled?: boolean
    must?: boolean
    ariaLabel?: string
    autocomplete?: string
    ref?: TRef
    prefix?: React.ReactNode
    hint?: string
    innerIcon?: React.ReactElement
    onfocus?(): void
    onblur?(): void
    onChange?(value: string): void
}

function Input<T>({
    className,
    titleClassname,
    placeholder,
    id,
    type,
    instance,
    title,
    autoRef,
    disabled,
    must,
    ariaLabel,
    autocomplete,
    onfocus,
    onblur,
    ref,
    prefix,
    hint,
    onChange,
    innerIcon,
}: InputProps<T, React.RefObject<HTMLInputElement>>): React.ReactElement {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current && autoRef) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="w-full flex flex-col gap-1">
            {title && (
                <label
                    className={cn(
                        'pl-1',
                        must
                            ? 'after:content-["*"] after:text-red-500 dark:after:text-red-700 after:pl-0.5'
                            : '',
                        titleClassname
                    )}
                    htmlFor={id}
                >
                    {title}
                </label>
            )}
            <div>
                <div className="flex group/input">
                    {prefix && (
                        <div className="min-w-10 h-10 flex items-center justify-center border border-accent dark:border-accent-dark group-focus-within/input:border-0 group-focus-within/input:ring-1 group-focus-within/input:bord rounded-l-md ring-accent dark:ring-accent-dark text-accent dark:text-accent-dark font-semibold">
                            {prefix}
                        </div>
                    )}
                    <div
                        className={cn(
                            'flex items-center bg-slate-100 caret-accent dark:caret-accent-dark dark:bg-slate-700 focus-within:ring-accent dark:focus-within:ring-accent-dark focus-within:shadow-sm focus-within:ring-1 focus-within:outline-none h-10 w-full',
                            prefix ? 'rounded-r-md' : 'rounded-md',
                            instance.allValid
                                ? ''
                                : '!ring-red-500 !text-red-500 !bg-red-50 dark:!bg-red-900/30 !caret-red-500',
                            className
                        )}
                    >
                        {innerIcon && (
                            <span
                                className="text-gray-400 px-2 h-full flex items-center"
                                onClick={() =>
                                    ref
                                        ? ref.current && ref.current.click()
                                        : inputRef.current &&
                                          inputRef.current.focus()
                                }
                            >
                                {innerIcon}
                            </span>
                        )}
                        <input
                            aria-label={ariaLabel}
                            id={id}
                            type={type}
                            ref={ref || inputRef}
                            value={instance.rawValue as string}
                            onChange={(e) => {
                                onChange && onChange(e.target.value)
                                instance.checkValue(e)
                            }}
                            onBlur={() => {
                                instance.checkValue
                                setTimeout(() => onblur && onblur(), 100)
                            }}
                            className={cn(
                                'bg-transparent w-full h-full focus:border-none focus:outline-none placeholder:text-gray-400',
                                !innerIcon ? 'px-2' : 'pr-2'
                            )}
                            onFocus={() => onfocus && onfocus()}
                            disabled={disabled}
                            placeholder={placeholder}
                            autoComplete={autocomplete}
                        />
                    </div>
                </div>
                {hint && (
                    <p className="pl-2 text-gray-400 dark:text-gray-500 text-xs pt-1">
                        {hint}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Input
