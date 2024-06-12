import { Avatar } from '../index'
import { AvatarProps } from '../Avatar'
import React from 'react'
import { Member } from '../../types'

const MembersAvatars = ({
    members,
}: {
    members: Member[]
}): React.ReactElement => {
    return (
        <div className="flex -space-x-2 flex-wrap">
            {members.map((member, key) => (
                <Avatar user={member.user} size="task" key={key} />
            ))}
        </div>
    )
}

export default MembersAvatars
