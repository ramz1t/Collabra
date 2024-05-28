import cn from 'classnames'
import React, { useEffect, useRef } from 'react'

const TextField = ({
    className,
    titleClassname,
    placeholder,
    id,
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
    minHeight,
}) => {
    const textareaRef = useRef()

    useEffect(() => {
        if (textareaRef.current && autoRef) {
            textareaRef.current.focus()
        }
    }, [])
    return (
        <div className="w-full flex flex-col gap-1">
            {title && (
                <label
                    className={cn(
                        'pl-1',
                        must
                            ? 'after:content-["*"] after:text-red-500 after:pl-0.5'
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

                    <textarea
                        aria-label={ariaLabel}
                        id={id}
                        ref={ref ? ref : textareaRef}
                        value={instance.rawValue}
                        onChange={(e) => {
                            onChange && onChange(e)
                            instance.checkValue(e)
                        }}
                        onBlur={() => {
                            instance.checkValue
                            setTimeout(() => onblur && onblur(), 100)
                        }}
                        className={cn(
                            'flex gap-2 items-center bg-slate-100 caret-accent dark:caret-accent-dark dark:bg-slate-700 focus-within:ring-accent dark:focus-within:ring-accent-dark focus-within:shadow-sm focus-within:ring-1 focus-within:outline-none h-10 w-full p-2',
                            prefix ? 'rounded-r-md' : 'rounded-md',
                            instance.allValid
                                ? ''
                                : '!ring-red-500 !text-red-500 !bg-red-50 dark:!bg-red-900/30 !caret-red-500',
                            className
                        )}
                        onFocus={() => onfocus && onfocus()}
                        disabled={disabled}
                        placeholder={placeholder}
                        autoComplete={autocomplete}
                        style={{ minHeight: minHeight || 80 }}
                    />
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

export default TextField
