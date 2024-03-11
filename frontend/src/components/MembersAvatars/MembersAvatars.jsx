import { Avatar } from '../index.js'

const MembersAvatars = ({ members }) => {
    return (
        <div className="flex -space-x-2 overflow-hidden flex-wrap">
            {members.map((member, key) => (
                <Avatar
                    user={member}
                    size="task"
                    className="outline outline-white dark:outline-slate-800 first:outline-none"
                />
            ))}
        </div>
    )
}

export default MembersAvatars
