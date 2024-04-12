import cn from 'classnames'

const Divider = ({ vertical, horizontal, className }) => {
    return (
        <span
            className={cn(
                vertical
                    ? 'min-w-px h-full row-span-full'
                    : horizontal
                      ? 'min-h-px w-full col-span-full'
                      : '',
                'bg-accent/30 dark:bg-accent-dark/50',
                className
            )}
        ></span>
    )
}

export default Divider
