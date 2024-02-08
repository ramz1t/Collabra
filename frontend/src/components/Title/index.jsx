import cn from 'classnames'
import Divider from '../Divider'

const Title = ({ children, className, position = 'center' }) => {
    return (
        <h1
            className={cn(
                'font-bold text-xl md:text-3xl py-5 mx-auto w-full flex gap-3 items-center sticky top-0 bg-white dark:bg-slate-800 after:bg-red-500 after:w-full after:absolute',
                position === 'center' ? 'justify-center' : '',
                position === 'left' ? 'justify-start' : '',
                position === 'right' ? 'justify-end' : '',
                className
            )}
        >
            {children}
        </h1>
    )
}

export default Title
