import React from 'react'

const SpotifyEmbed = ({ className, albumId }) => {
    return (
        <iframe
            className={className}
            style="border-radius:12px"
            src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`}
            width="100%"
            height="152"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        ></iframe>
    )
}

export default SpotifyEmbed
