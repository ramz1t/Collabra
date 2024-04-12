import cn from 'classnames'

const GeneratedAvatar = ({
    firstName,
    lastName,
    startColor,
    endColor,
    size,
    square,
    style,
    className,
}) => {
    let w, font

    switch (size) {
        case 'sidebar':
            w = 36
            font = 16
            break
        case 'profile':
            w = 120
            font = 50
            break
        case 'task':
            w = 24
            font = 11
            break
        default:
            w = 36
            font = 16
            break
    }
    return (
        <div
            className={cn(
                `rounded-full flex items-center justify-center font-extrabold text-black pointer-events-none select-none`,
                square ? 'rounded-xl' : 'rounded-full',
                className
            )}
            style={{
                fontSize: font,
                width: w,
                height: w,
                minWidth: w,
                minHeight: w,
                maxWidth: w,
                maxHeight: w,
                background: `linear-gradient(90deg, #${startColor} 0%, #${endColor} 100%)`,
                ...style,
            }}
        >
            <span className="h-8/10">
                {firstName && firstName[0]}
                {lastName && lastName[0]}
            </span>
        </div>
    )
}

export default GeneratedAvatar
