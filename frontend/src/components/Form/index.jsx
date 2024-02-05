import cn from 'classnames'

const Form = ({ onSubmit, children, className }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }}
            className={cn(
                'flex flex-col gap-3 md:gap-5 border dark:border-slate-600 p-7 rounded-sm',
                className
            )}
        >
            {children}
        </form>
    )
}

export default Form
