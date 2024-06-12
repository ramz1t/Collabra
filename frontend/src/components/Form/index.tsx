import cn from 'classnames'
import React, { FormEvent } from 'react'

export interface FormProps {
    children: React.ReactNode
    className?: string
    autoComplete?: string
    disabled?: boolean
    onSubmit?(): void
}

const Form = ({
    onSubmit,
    children,
    className,
    autoComplete,
    disabled,
}: FormProps): React.ReactElement => {
    return (
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
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
