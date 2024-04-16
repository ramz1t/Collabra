import cn from 'classnames'

const TeamImage = ({ team, size, className }) => {
    let font, w

    switch (size) {
        case 'settings':
            w = 230
            font = 80
            break
        case 'list':
            w = 110
            font = 36
            break
        default:
            w = 16
            font = 16
            break
    }
    return team.image ? (
        <div
            className="bg-cover bg-center rounded-md"
            style={{
                width: w,
                height: w,
                minWidth: w,
                minHeight: w,
                maxWidth: w,
                maxHeight: w,
                backgroundImage: `url(${team.image})`,
            }}
        ></div>
    ) : (
        <p
            className={cn(
                'text-black font-extrabold flex items-center justify-center rounded-md bg-gradient-radial from-gray-200 to-gray-400 dark:from-gray-400 dark:to-gray-600',
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
            }}
        >
            {team.title
                .split(' ')
                .slice(0, 3)
                .map((part) => part[0]?.toUpperCase())}
        </p>
    )
}

export default TeamImage
