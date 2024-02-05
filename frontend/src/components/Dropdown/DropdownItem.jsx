import Button from '../Button'
import cn from 'classnames'

const DropdownItem = ({ children, value, setter, active }) => {
    return (
        <Button
            className={cn(
                'px-2 py-1 hover:bg-slate-50 rounded-sm w-full',
                active
                    ? 'bg-accent/5 dark:bg-slate-600'
                    : 'hover:slate-600 dark:hover:bg-slate-700/70'
            )}
            action={() => setter(value)}
        >
            {children}
        </Button>
    )
}

export default DropdownItem
