import cn from 'classnames'

const RichHeader = ({ icon, title, description, actions, className }) => {
    return (
        <div
            className={cn('flex flex-col items-center w-full gap-1', className)}
        >
            <span className="text-accent dark:text-accent-dark mb-2 text-5xl">
                {icon}
            </span>
            <p className="text-xl font-bold">{title}</p>
            {description && (
                <p className="text-gray-600 dark:text-gray-400 md:px-16 text-center text-sm">
                    {description}
                </p>
            )}
            {actions && <div className="mt-5">{actions}</div>}
        </div>
    )
}

export default RichHeader
