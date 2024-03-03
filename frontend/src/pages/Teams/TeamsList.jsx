import React from 'react'
import { NavLink } from 'react-router-dom'
import TeamCard from './TeamCard'

const team = {
    name: 'Collabra team long name',
    slug: 'collabra-team',
    // image: null,
    color: '#12ff56',
    members: [
        {
            avatar: 'http://localhost:5173/images/timur.jpg',
            generated_avatar: {
                first_color: 'a18cd1',
                second_color: 'fbc2eb',
            },
            first_name: 'Leonid',
            last_name: 'Prokopev',
        },
        {
            avatar: 'http://localhost:5173/images/alex.jpg',
            generated_avatar: {
                first_color: 'ff9a9e',
                second_color: 'fecfef',
            },
            first_name: 'Alexey',
            last_name: 'Zavadsky',
        },
        {
            avatar: 'http://localhost:5173/images/leonid.jpg',
            generated_avatar: {
                first_color: 'f6d365',
                second_color: 'fda085',
            },
            first_name: 'Timur',
            last_name: 'Ramazanov',
        },
    ],
    image: 'https://i0.wp.com/www.digital-photography-school.com/wp-content/uploads/2011/11/square-format-01.jpg',
}

const TeamsList = () => {
    return (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 pt-5 pr-5">
            {Array(7)
                .fill(0)
                .map((el, key) => (
                    <TeamCard key={key} team={{ ...team, id: key }} />
                ))}
        </ul>
    )
}

export default TeamsList
