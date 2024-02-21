import { useRef, useEffect } from 'react'
import cn from 'classnames'

const Input = ({
    className,
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
}) => {
    const inputRef = useRef()

    useEffect(() => {
        if (inputRef.current && autoRef) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="w-full flex flex-col gap-1">
            <label
                className={cn(
                    'pl-1',
                    must
                        ? 'after:content-["*"] after:text-red-500 after:pl-0.5'
                        : ''
                )}
                htmlFor={id}
            >
                {title}
            </label>
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
                            'bg-slate-100 dark:bg-slate-600 focus:ring-accent dark:focus:ring-accent-dark focus:shadow-sm focus:ring-1 focus:outline-none h-10 w-full px-2',
                            prefix ? 'rounded-r-md' : 'rounded-md',
                            className
                        )}
                        placeholder={placeholder}
                        autoComplete={autocomplete}
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

export default Input
