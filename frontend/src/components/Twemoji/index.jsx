import React from 'react'
import { parse } from 'twemoji-parser'

const Twemoji = ({ emoji, width, className }) => {
    if (!emoji) return
    const iconLink = parse(emoji)[0]?.url

    return (
        <img
            className={className}
            src={iconLink}
            style={{ width: `${width}px`, minWidth: `${width}px` }}
        />
    )
}

export default Twemoji
