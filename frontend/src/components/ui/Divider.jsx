import cn from 'classnames'

const Divider = ({ vertical, horizontal, className }) => {
    return (
        <span
            className={cn(
                vertical
                    ? 'min-w-px bg-accent-main/30 h-full'
                    : horizontal
                    ? 'min-h-px bg-accent-main/30 w-full'
                    : '',
                className
            )}
        ></span>
    )
}

export default Divider
