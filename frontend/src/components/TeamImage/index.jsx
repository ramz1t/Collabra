import React from 'react'

const TeamImage = ({ team }) => {
    return team.image ? (
        <div
            className="bg-cover bg-center w-32 h-32 min-w-32 rounded-md"
            style={{ backgroundImage: `url(${team.image})` }}
        ></div>
    ) : (
        <p className="text-black font-extrabold flex items-center justify-center text-3xl w-32 h-32 min-w-32 rounded-md bg-gray-300 dark:bg-gray-400">
            {team.name
                .split(' ')
                .slice(0, 3)
                .map((part) => part[0]?.toUpperCase())}
        </p>
    )
}

export default TeamImage
