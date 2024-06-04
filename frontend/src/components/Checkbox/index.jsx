import cn from 'classnames'

const Checkbox = ({ value, setValue, className, title, text, id }) => {
    return (
        <div className="grid">
            {title && <p className="pb-1 pl-1">{title}</p>}
            <div className="flex items-center gap-3">
                <input
                    className={cn(
                        'size-6 rounded-md bg-slate-100 dark:bg-slate-700 checked:bg-accent checked:dark:bg-accent-dark appearance-none relative transition-colors duration-[50ms]',
                        'after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-sm after:text-white checked:after:content-["✓"]',
                        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none',
                        className
                    )}
                    id={`checkbox-${id}`}
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setValue(e.target.checked)}
                    tabIndex={0}
                />

                <label htmlFor={`checkbox-${id}`}>{text}</label>
            </div>
        </div>
    )
}

export default Checkbox
