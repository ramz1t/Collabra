import React from 'react'
import { parse } from 'twemoji-parser'

const Twemoji = ({ emoji, width, className }) => {
    if (!emoji) return
    const twemojiId = parse(emoji)[0]?.url.split('/').at(-1)

    return (
        <img
            className={className}
            src={
                'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/' +
                twemojiId
            }
            style={{ width: `${width}px`, minWidth: `${width}px` }}
        />
    )
}

export default Twemoji
