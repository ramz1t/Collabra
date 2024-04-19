import { Avatar } from '../index.js'

const MembersAvatars = ({ members }) => {
    return (
        <div className="flex -space-x-2 flex-wrap">
            {members.map((member, key) => (
                <Avatar user={member} size="task" key={key} />
            ))}
        </div>
    )
}

export default MembersAvatars
