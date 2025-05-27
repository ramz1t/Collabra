import useInput from '../../hooks/useInput'
import { Button, Form, Input } from '../index'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import React, { useState } from 'react'
import { UseMutateFunction } from '@tanstack/react-query'

export interface PasswordSubmitProps {
    actionText: string
    submitData?: Record<string, any>
    className?: string
    buttonText?: string
    isLoading: boolean
    options?: { [key: string]: any }
    autoRef?: boolean
    submitFn: UseMutateFunction<any, Error, any, unknown>
}

const PasswordSubmit = ({
    actionText,
    submitData,
    submitFn,
    className,
    buttonText,
    isLoading,
    options = {},
    autoRef = false,
}: PasswordSubmitProps): React.ReactElement => {
    const password = useInput('')
    const [errors, setErrors] = useState([])
    const { t } = useTranslation()
    return (
        <Form
            onSubmit={() => {
                setErrors([])
                submitFn(
                    { ...submitData, password: password.value },
                    {
                        ...options,
                        onError: (err: any) => {
                            if (err?.response?.status === 400) {
                                setErrors(err?.response?.data?.password)
                            }
                            if (typeof options?.onError === 'function') {
                                options.onError(err)
                            }
                        },
                    }
                )
            }}
            className={cn('!flex-row gap-2 md:gap-5', className)}
        >
            <Input
                autoRef={autoRef}
                type="password"
                instance={password}
                hint={t('pass_to_submit', {
                    action: actionText?.toLowerCase(),
                })}
                errors={errors}
            />
            <Button
                style="destructive"
                isLoading={isLoading}
                disabled={!password.value}
                type="submit"
            >
                {buttonText || actionText}
            </Button>
        </Form>
    )
}

export default PasswordSubmit
