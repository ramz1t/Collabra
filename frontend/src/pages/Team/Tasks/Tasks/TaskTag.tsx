import { Tag } from '../../../../types'

const TaskTag = ({ tag }: { tag: Tag }) => {
    return (
        <span
            className="rounded-full px-3 py-1 bg-orange-100 dark:bg-orange-500 text-orange-500 dark:text-orange-100 font-bold w-fit line-clamp-1"
            // style={{ color: tag.color, backgroundColor: tag.color }}
        >
            {tag.title}
        </span>
    )
}

export default TaskTag
