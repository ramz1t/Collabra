import cn from 'classnames'

const Divider = ({ vertical, horizontal, className }) => {
    return (
        <span
            className={cn(
                vertical
                    ? 'min-w-px bg-accent/30 dark:bg-accent-dark/50 h-full'
                    : horizontal
                    ? 'min-h-px bg-accent/30 dark:bg-accent-dark/50 w-full'
                    : '',
                className
            )}
        ></span>
    )
}

export default Divider
