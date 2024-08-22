import { IoCheckmark, IoClose, IoReceiptOutline } from 'react-icons/io5'
import {
    Button,
    Checkbox,
    DialogWindow,
    Form,
    Input,
    TextField,
} from '../../../../components'
import { useTranslation } from 'react-i18next'
import React, { SetStateAction, useState } from 'react'
import useInput from '../../../../hooks/useInput'
import TagSelector from './TagSelector'

interface AddTaskDialogProps {
    icon: React.ReactNode | React.ReactElement
    title: string
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
    status: string
}

const AddTaskDialog = ({
    icon,
    title: dialogTitle,
    open,
    setOpen,
    status,
}: AddTaskDialogProps) => {
    const { t } = useTranslation()

    const title = useInput('')
    const description = useInput('')
    const nextStep = useInput('')
    const [steps, setSteps] = useState<string[]>([])
    const [requiresReview, setRequiresReview] = useState(false)
    const [selectedTag, setSelectedTag] = useState<number | undefined>()

    const addStep = () => {
        if (nextStep.value.trim() === '') return
        setSteps((prev) => [...prev, nextStep.value.trim()])
        nextStep.clear()
    }

    const removeStep = (step: string) => {
        setSteps((prev) => prev.filter((el) => el !== step))
    }

    return (
        <DialogWindow
            icon={icon}
            title={dialogTitle}
            isOpen={open}
            onSuccess={() => setOpen(false)}
            successButtonStyle="primary"
            successButtonText={t('create')}
            close={() => setOpen(false)}
        >
            <Form>
                <Input must title={t('title')} instance={title} />
                <TagSelector
                    selected={selectedTag}
                    setSelected={setSelectedTag}
                    canEdit
                />
                <TextField
                    must
                    title={t('description')}
                    instance={description}
                />
                <div className="flex items-end gap-3">
                    <Input title={t('subtasks')} instance={nextStep} />
                    <Button
                        action={addStep}
                        className="min-w-10 !p-0"
                        style="primary"
                    >
                        <IoCheckmark />
                    </Button>
                </div>
                {steps.length > 0 && (
                    <ul className="flex flex-wrap gap-3">
                        {steps.map((step, key) => (
                            <li
                                className="bg-gray-200 flex items-center rounded-full pr-3 w-fit gap-0.5"
                                key={key}
                            >
                                <Button
                                    className="px-2 hover:bg-gray-300 min-h-8 rounded-full"
                                    action={() => removeStep(step)}
                                >
                                    <IoClose />
                                </Button>
                                {step}
                            </li>
                        ))}
                    </ul>
                )}
                <Checkbox
                    value={requiresReview}
                    text={t('requires_review')}
                    setValue={setRequiresReview}
                />
            </Form>
        </DialogWindow>
    )
}

export default AddTaskDialog
