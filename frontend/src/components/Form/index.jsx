import cn from 'classnames'

const Form = ({ onSubmit, children, className }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }}
            className={cn(
                'flex flex-col gap-3 md:gap-5 p-7 rounded-sm',
                className
            )}
            noValidate
        >
            {children}
        </form>
    )
}

export default Form
