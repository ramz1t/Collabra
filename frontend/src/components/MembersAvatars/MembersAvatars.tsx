import { Avatar } from '../index'
import React from 'react'
import { User } from '../../types'

const MembersAvatars = ({
    users,
    size,
}: {
    users: User[]
    size?: string
}): React.ReactElement => {
    const placeholderUser = {
        id: 1,
        avatar: null,
        generated_avatar: {
            first_color: 'cfe2f3',
            second_color: 'cfe2f3',
        },
        first_name: '+',
        last_name: `${users.length - 3}`,
        username: '',
        email: '',
        description: '',
        timezone: '',
        links: [],
        date_joined: '',
    }

    return (
        <div className="flex -space-x-2 flex-wrap">
            {users.slice(0, 3).map((user, key) => (
                <Avatar user={user} size={size ? size : 'task'} key={key} />
            ))}
            {users.length > 3 ? (
                <Avatar
                    user={placeholderUser}
                    size={size ? size : 'task'}
                    className="border-accent border !text-accent"
                />
            ) : null}
        </div>
    )
}

export default MembersAvatars
