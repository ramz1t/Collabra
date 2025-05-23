import { NavLink } from 'react-router-dom'
import cn from 'classnames'

interface TaskboardHeaderLinkProps {
    title: string
    to: string
}

const TaskboardHeaderLink = ({ title, to }: TaskboardHeaderLinkProps) => {
    return (
        <NavLink
            end
            className={({ isActive }) =>
                cn(
                    'relative font-semibold px-3 md:px-5 pt-2 pb-4 flex items-center justify-center transition-all duration-75 after:transition-all after:duration-150',
                    'after:absolute after:rounded-t-full after:h-1 after:bottom-0 after:bg-accent dark:after:bg-accent-dark whitespace-nowrap',
                    isActive
                        ? 'after:w-[80%] after:opacity-100'
                        : 'after:w-0 after:opacity-0 hover:opacity-70'
                )
            }
            to={to}
        >
            {title}
        </NavLink>
    )
}

export default TaskboardHeaderLink
