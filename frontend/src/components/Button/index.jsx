import classNames from 'classnames'
import cn from 'classnames'

const Button = ({
    style,
    action,
    children,
    className,
    type,
    w_full,
    disabled,
}) => {
    return (
        <button
            className={cn(
                'flex items-center justify-center gap-3 transition-all duration-75 active:hover:opacity-80 h-fit',
                'disabled:cursor-not-allowed disabled:bg-transparent disabled:border-slate-500 disabled:dark:border-slate-500 disabled:dark:bg-transparent disabled:!text-slate-500',
                style === 'primary'
                    ? 'bg-accent dark:bg-accent-dark border-accent dark:border-accent-dark text-white font-bold'
                    : '',
                style === 'secondary'
                    ? 'border-accent dark:border-accent-dark text-accent hover:bg-accent/5 dark:text-accent-dark dark:hover:bg-accent-dark/5'
                    : '',
                style === 'tetriary'
                    ? 'text-slate-600 dark:text-slate-300'
                    : '',
                style === 'desctructive'
                    ? 'bg-red-600 border-red-600 text-white font-bold hover:bg-red-700 hover:border-red-700'
                    : '',
                ['primary', 'secondary', 'desctructive'].includes(style)
                    ? 'px-4 py-2 rounded-md border-2'
                    : '',
                w_full ? 'w-full' : 'w-fit',
                className
            )}
            onClick={() => action && action()}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
