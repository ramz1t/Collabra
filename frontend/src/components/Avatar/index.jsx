import avatar from '../../assets/images/default-avatar.png'
import cn from 'classnames'

const Avatar = ({ src, href, w, h, classname }) => {
    return (
        <img
            className={cn('rounded-full', classname)}
            style={{
                width: w,
                height: h,
                minWidth: w,
                minHeight: h,
                maxWidth: w,
                maxHeight: h,
            }}
            width={w}
            height={h}
            src={src ? src : href ? href : avatar}
        />
    )
}

export default Avatar
