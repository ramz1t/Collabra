import { FaFire } from 'react-icons/fa6'
import React from 'react'

const FireIcon = () => {
    return (
        <>
            <svg width="0" height="0">
                <linearGradient
                    id="fire-gradient"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop stopColor="rgb(253 186 116)" offset="0%" />
                    <stop stopColor="rgb(249 115 22)" offset="33%" />
                    <stop stopColor="rgb(194 65 12)" offset="80%" />
                    <stop stopColor="rgb(194 65 12)" offset="100%" />
                </linearGradient>
            </svg>
            <FaFire style={{ fill: 'url(#fire-gradient)' }} />
        </>
    )
}

export default FireIcon
