import cn from 'classnames'
import Divider from '../Divider'

const Title = ({ children, className }) => {
    return (
        <h1
            className={cn(
                'font-bold text-3xl mb-5 pt-5 mx-auto w-full flex gap-3 justify-center items-center sticky top-0 bg-white after:bg-red-500 after:w-full after:absolute',
                className
            )}
        >
            {children}
        </h1>
    )
}

export default Title
