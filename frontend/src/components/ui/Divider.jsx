import cn from 'classnames'

const Divider = ({ vertical, horizontal, className }) => {
    return (
        <span
            className={cn(
                vertical
                    ? 'w-[1px] bg-accent-main/30 h-full'
                    : horizontal
                    ? 'h-[1px] bg-accent-main/30 w-full'
                    : '',
                className
            )}
        ></span>
    )
}

export default Divider
