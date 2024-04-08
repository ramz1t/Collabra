import React from 'react'

const TeamImage = ({ team }) => {
    return team.image ? (
        <div
            className="bg-cover bg-center w-32 h-32 min-w-32 rounded-md"
            style={{ backgroundImage: `url(${team.image})` }}
        ></div>
    ) : (
        <p
            className="font-extrabold flex items-center justify-center text-3xl w-32 h-32 min-w-32 rounded-md"
            style={{ backgroundColor: `#${team.color}` }}
        >
            {team.name[0]}
        </p>
    )
}

export default TeamImage
