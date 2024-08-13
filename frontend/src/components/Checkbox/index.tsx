import cn from 'classnames'
import React, { ChangeEvent } from 'react'

export interface CheckboxProps {
    value: boolean
    className?: string
    title?: string
    text: React.ReactNode
    id: string | number
    setValue(value: boolean): void
}

const Checkbox = ({
    value,
    setValue,
    className,
    title,
    text,
    id,
}: CheckboxProps): React.ReactElement => {
    return (
        <div className="grid">
            {title && <p className="pb-1 pl-1">{title}</p>}
            <div className="flex items-center gap-3">
                <input
                    className={cn(
                        'min-h-6 min-w-6 rounded-md bg-slate-100 dark:bg-slate-700 appearance-none relative hover:cursor-pointer',
                        'after:transition-all after:duration-100 after:scale-0 checked:after:scale-100 after:opacity-0 checked:after:opacity-100 after:rounded-[20px] checked:after:rounded-md',
                        'after:bg-accent after:dark:bg-accent-dark after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:text-white after:content-["✓"] after:w-full after:h-full after:flex after:items-center after:justify-center',
                        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none',
                        className
                    )}
                    id={`checkbox-${id}`}
                    type="checkbox"
                    checked={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setValue(e.target.checked)
                    }
                    tabIndex={0}
                />
                <label htmlFor={`checkbox-${id}`}>{text}</label>
            </div>
        </div>
    )
}

export default Checkbox
