import useLocalStorage from '../../../../hooks/useLocalStorage'
import Board from './Board/Board'
import List from './List/List'
import { StorageKey } from '../../../../utils/constants'

const TasksContainer = () => {
    const [viewOption, setViewOption] = useLocalStorage(
        StorageKey.TASKS_VIEW_OPTION,
        'board'
    )

    switch (viewOption) {
        case 'board':
            return <Board />
        case 'list':
            return <List />
        default:
            return 'unknown tasks layout'
    }
}

export default TasksContainer
