import classNames from 'classnames'
import cn from 'classnames'

const Button = ({ style, action, children, className, type, w_full }) => {
    return (
        <button
            className={cn(
                'flex items-center justify-center gap-3 transition-all duration-75 hover:opacity-80',
                style === 'primary'
                    ? 'bg-accent-main text-white font-bold'
                    : '',
                style === 'secondary'
                    ? 'border-accent-main border-2 text-accent-main'
                    : '',
                style === 'tetriary' ? 'text-slate-600' : '',
                style === 'primary' || style === 'secondary'
                    ? 'px-4 py-2 rounded-md'
                    : '',
                w_full ? 'w-full' : 'w-fit',
                className
            )}
            onClick={() => action && action()}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button
