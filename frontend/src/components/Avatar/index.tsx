import cn from 'classnames'
import GeneratedAvatar from './GeneratedAvatar'
import React, { memo } from 'react'
import { User } from '../../types'

export type AvatarProps = {
    className?: string
    size?: 'sidebar' | 'profile' | 'settings' | 'task' | 'assigneeOption'
    square?: boolean
    style?: React.CSSProperties
    user?: User
}

const AVATAR_SIZES: Record<NonNullable<AvatarProps['size']>, number> = {
    sidebar: 36,
    profile: 150,
    settings: 230,
    task: 30,
    assigneeOption: 24,
}

const Avatar = ({
    className,
    user,
    size = 'sidebar',
    square = false,
    style,
}: AvatarProps) => {
    if (!user) return null

    const w = AVATAR_SIZES[size] ?? 36

    if (user.avatar) {
        return (
            <div
                className={cn(
                    'bg-cover bg-center',
                    square ? 'rounded-xl' : 'rounded-full',
                    className
                )}
                style={{
                    backgroundImage: `url(${user.avatar})`,
                    width: w,
                    height: w,
                    minWidth: w,
                    minHeight: w,
                    maxWidth: w,
                    maxHeight: w,
                    ...style,
                }}
                aria-label={`${user.first_name} ${user.last_name} avatar`}
            />
        )
    }

    return (
        <GeneratedAvatar
            firstName={user.first_name}
            lastName={user.last_name}
            startColor={user.generated_avatar.first_color || '999999'}
            endColor={user.generated_avatar.second_color || '999999'}
            size={size}
            w={w}
            square={square}
            style={style}
            className={className}
        />
    )
}

export default memo(Avatar)
