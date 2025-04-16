import cn from 'classnames'
import React, { memo } from 'react'
import { AvatarProps } from './index'

export interface GeneratedAvatarProps {
    firstName?: string
    lastName?: string
    startColor: string
    endColor: string
    size?: AvatarProps['size']
    square?: boolean
    style?: React.CSSProperties
    className?: string
    w: number
}

const FONT_SIZES: Record<NonNullable<GeneratedAvatarProps['size']>, number> = {
    sidebar: 16,
    profile: 60,
    settings: 80,
    task: 12,
    assigneeOption: 10,
}

const GeneratedAvatar = ({
    firstName,
    lastName,
    startColor,
    endColor,
    size = 'sidebar',
    square = false,
    style,
    className,
    w,
}: GeneratedAvatarProps) => {
    const fontSize = FONT_SIZES[size] ?? 16

    return (
        <div
            className={cn(
                'flex items-center justify-center font-extrabold text-black pointer-events-none select-none',
                square ? 'rounded-xl' : 'rounded-full',
                className
            )}
            style={{
                fontSize,
                width: w,
                height: w,
                minWidth: w,
                minHeight: w,
                maxWidth: w,
                maxHeight: w,
                background: `linear-gradient(90deg, ${startColor.startsWith('#') ? startColor : `#${startColor}`} 0%, ${endColor.startsWith('#') ? endColor : `#${endColor}`} 100%)`,
                ...style,
            }}
        >
            {firstName?.[0]}
            {lastName?.[0]}
        </div>
    )
}

export default memo(GeneratedAvatar)
