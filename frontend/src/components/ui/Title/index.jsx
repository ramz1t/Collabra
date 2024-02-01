import cn from 'classnames'

const Title = ({ children, className }) => {
    return (
        <h1 className={cn('font-bold text-3xl mb-5', className)}>{children}</h1>
    )
}

export default Title
