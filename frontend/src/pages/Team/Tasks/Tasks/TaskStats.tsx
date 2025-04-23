import { Link } from 'react-router-dom'
import {
    IoChatboxEllipsesOutline,
    IoDocumentAttachOutline,
} from 'react-icons/io5'
import { Task } from '../../../../types'

const TaskStats = ({ task }: { task: Task }) => {
    return (
        <div className="flex gap-3">
            <Link
                to={`${task.id}`}
                className="flex text-gray-400 dark:text-gray-500 items-center gap-1.5 font-semibold hover:text-gray-500 transition-all duration-75"
            >
                <IoChatboxEllipsesOutline />
                {task.messages_count}
            </Link>
            {/*<Link*/}
            {/*    to={`${task.id}`}*/}
            {/*    className="flex text-gray-400 dark:text-gray-500 items-center gap-1.5 font-semibold hover:text-gray-500 transition-all duration-75"*/}
            {/*>*/}
            {/*    <IoDocumentAttachOutline />*/}
            {/*    {task.attachments.length}*/}
            {/*</Link>*/}
        </div>
    )
}

export default TaskStats
