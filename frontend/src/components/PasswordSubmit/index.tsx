import useInput from '../../hooks/useInput'
import { Button, Form, Input } from '../index'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import React from 'react'
import { AxiosRequestConfig } from 'axios'
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
    const { t } = useTranslation()
    return (
        <Form
            onSubmit={() =>
                submitFn({ ...submitData, password: password.value }, options)
            }
            className={cn('!flex-row gap-2 md:gap-5', className)}
        >
            <Input
                autoRef={autoRef}
                type="password"
                instance={password}
                hint={t('pass_to_submit', {
                    action: actionText?.toLowerCase(),
                })}
            />
            <Button
                style="destructive"
                isLoading={isLoading}
                disabled={!password.value}
            >
                {buttonText || actionText}
            </Button>
        </Form>
    )
}

export default PasswordSubmit
