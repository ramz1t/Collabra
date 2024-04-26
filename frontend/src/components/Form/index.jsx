import cn from 'classnames'

const Form = ({ onSubmit, children, className, autoComplete, disabled }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (disabled) return
                onSubmit && onSubmit()
            }}
            className={cn('flex flex-col gap-3 md:gap-5', className)}
            noValidate
            autoComplete={autoComplete}
        >
            {children}
        </form>
    )
}

export default Form
