import useInput from '../../hooks/useInput.js'
import { Button, Form, Input } from '../index.js'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

const PasswordSubmit = ({
    actionText,
    submitData = {},
    submitFn = () => {},
    className,
    buttonText,
    isLoading,
    options = {},
    autoRef = false,
}) => {
    const password = useInput('')
    const { t } = useTranslation()
    return (
        <Form
            onSubmit={() =>
                submitFn({ ...submitData, password: password.value }, options)
            }
            className={cn('!flex-row gap-5', className)}
        >
            <Input
                autoRef={autoRef}
                type="password"
                instance={password}
                hint={t('pass_to_submit', { action: actionText.toLowerCase() })}
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
