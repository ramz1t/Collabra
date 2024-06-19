import React from 'react'
import { parse } from 'twemoji-parser'

export interface TwemojiProps {
    emoji: string
    width: number
    className?: string
}

const Twemoji = ({ emoji, width, className }: TwemojiProps): JSX.Element => {
    const twemojiId = parse(emoji)[0]?.url.split('/').at(-1)

    return (
        <img
            className={className}
            src={
                'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/' +
                twemojiId
            }
            style={{ width: `${width}px`, minWidth: `${width}px` }}
            alt={emoji}
        />
    )
}

export default Twemoji
