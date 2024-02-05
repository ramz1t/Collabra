import { useRef, useEffect } from 'react'
import cn from 'classnames'

const Input = ({
    className,
    placeholder,
    id,
    type,
    instance,
    deleteBtn,
    title,
    autoRef,
    disabled,
    split,
    large,
    must,
    containerClassName,
    ariaLabel,
    boldTitle,
    titleSize,
    name,
    hasError,
    autocomplete,
    onfocus,
    onblur,
    ref,
}) => {
    const inputRef = useRef()

    useEffect(() => {
        if (inputRef.current && autoRef) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="w-full">
            <label className="pl-1" htmlFor={id}>
                {title}
            </label>
            <input
                aria-label={ariaLabel}
                id={id}
                type={type}
                ref={ref ? ref : inputRef}
                value={instance.value}
                onChange={instance.checkValue}
                onBlur={() => {
                    instance.checkValue
                    setTimeout(() => onblur && onblur(), 100)
                }}
                onFocus={() => onfocus && onfocus()}
                disabled={disabled}
                className={cn(
                    'rounded-md border border-slate-600 focus:border-accent-main focus:shadow-sm focus:outline-none h-10 w-full px-2',
                    className
                )}
                placeholder={placeholder}
                autoComplete={autocomplete}
            />
        </div>
    )
}

export default Input
