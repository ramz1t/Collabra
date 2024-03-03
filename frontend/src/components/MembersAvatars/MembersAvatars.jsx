import { Avatar } from '../index.js'

const MembersAvatars = ({ members }) => {
    return (
        <div className="flex overflow-x-scroll scrollbar-hide">
            {members.map((member, key) => (
                <Avatar
                    user={member}
                    size="task"
                    className="border-2 border-white dark:border-slate-800"
                    style={{ transform: `translate(${-10 * key}px, 0)` }}
                />
            ))}
        </div>
    )
}

export default MembersAvatars
