import avatar from '../../assets/images/default-avatar.png'
import cn from 'classnames'
import GeneratedAvatar from './GeneratedAvatar'

const Avatar = ({ className, user, size, square }) => {
    let w
    switch (size) {
        case 'sidebar':
            w = 36
            break
        case 'profile':
            w = 120
            break
        case 'task':
            w = 24
            break
        default:
            w = 36
            break
    }

    if (!user) return

    if (user?.avatar) {
        return (
            <img
                src={user.avatar}
                className={square ? 'rounded-xl' : 'rounded-full'}
                style={{
                    width: w,
                    height: w,
                    minWidth: w,
                    minHeight: w,
                    maxWidth: w,
                    maxHeight: w,
                }}
            />
        )
    }

    return (
        <GeneratedAvatar
            firstName={user.first_name}
            lastName={user.last_name}
            startColor={user.generated_avatar.first_color}
            endColor={user.generated_avatar.second_color}
            size={size}
            square={square}
        />
    )
}

export default Avatar
