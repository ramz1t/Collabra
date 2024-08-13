import { IoReceiptOutline } from 'react-icons/io5'
import { DialogWindow, Form, Input, TextField } from '../../../../components'
import { useTranslation } from 'react-i18next'
import React, { SetStateAction, useState } from 'react'
import useInput from '../../../../hooks/useInput'

interface AddTaskDialogProps {
    icon: React.ReactNode | React.ReactElement
    title: string
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

const AddTaskDialog = ({
    icon,
    title: dialogTitle,
    open,
    setOpen,
}: AddTaskDialogProps) => {
    const { t } = useTranslation()
    const title = useInput('')
    const description = useInput('')
    const nextStep = useInput('')
    const [steps, setSteps] = useState<string[]>([])
    return (
        <DialogWindow
            icon={icon}
            title={dialogTitle}
            isOpen={open}
            onSuccess={() => setOpen(false)}
            successButtonStyle="primary"
            successButtonText={t('create')}
            close={() => setOpen(false)}
            extraActions={
                <Form>
                    <Input title={t('title')} instance={title} />
                    <TextField
                        title={t('description')}
                        instance={description}
                    />
                    <Form
                        onSubmit={() => {
                            if (nextStep.value.trim() === '') return
                            setSteps((prev) => [...prev, nextStep.value.trim()])
                            nextStep.clear
                        }}
                    >
                        <Input title={t('steps')} instance={nextStep} />
                        <ul>
                            {steps.map((step, key) => (
                                <li key={key}>{step}</li>
                            ))}
                        </ul>
                    </Form>
                </Form>
            }
        />
    )
}

export default AddTaskDialog
