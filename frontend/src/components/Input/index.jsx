import React, { useRef, useEffect } from 'react'
import cn from 'classnames'

const Input = ({
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
    split,
}) => {
    const inputRef = useRef()

    useEffect(() => {
        if (inputRef.current && autoRef) {
            inputRef.current.focus()
        }
    }, [])

    const inner = (
        <>
            <div className="flex flex-col gap-3">
                <label
                    className={cn(
                        split ? 'font-bold text-3xl' : 'pl-1',
                        must
                            ? 'after:content-["*"] after:text-red-500 after:pl-0.5'
                            : '',

                        titleClassname
                    )}
                    htmlFor={id}
                >
                    {title}
                </label>
                {hint && split && (
                    <p className="text-gray-600 dark:text-gray-400">{hint}</p>
                )}
            </div>
            <div>
                <div className="flex group/input">
                    {prefix && (
                        <div className="min-w-10 h-10 flex items-center justify-center border border-accent dark:border-accent-dark group-focus-within/input:border-0 group-focus-within/input:ring-1 group-focus-within/input:bord rounded-l-md ring-accent dark:ring-accent-dark text-accent dark:text-accent-dark font-semibold">
                            {prefix}
                        </div>
                    )}
                    <input
                        aria-label={ariaLabel}
                        id={id}
                        type={type}
                        ref={ref ? ref : inputRef}
                        value={instance.value}
                        onChange={(e) => {
                            onChange && onChange(e)
                            instance.checkValue(e)
                        }}
                        onBlur={() => {
                            instance.checkValue
                            setTimeout(() => onblur && onblur(), 100)
                        }}
                        onFocus={() => onfocus && onfocus()}
                        disabled={disabled}
                        className={cn(
                            'bg-slate-100 caret-accent dark:caret-accent-dark dark:bg-slate-600 focus:ring-accent dark:focus:ring-accent-dark focus:shadow-sm focus:ring-1 focus:outline-none h-10 w-full px-2',
                            prefix ? 'rounded-r-md' : 'rounded-md',
                            split ? 'max-w-xl' : '',
                            instance.allValid
                                ? ''
                                : '!ring-red-500 !text-red-500 !bg-red-50 dark:!bg-red-900/30 !caret-red-500',
                            className
                        )}
                        placeholder={placeholder}
                        autoComplete={autocomplete}
                    />
                </div>
                {hint && !split && (
                    <p className="pl-2 text-gray-400 dark:text-gray-500 text-xs pt-1">
                        {hint}
                    </p>
                )}
            </div>
        </>
    )

    return split ? (
        inner
    ) : (
        <div className="w-full flex flex-col gap-1">{inner}</div>
    )
}

export default Input
