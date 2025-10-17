import { Step, Task, ValidationErrors } from '../../../../../types'
import React, { SetStateAction, useEffect } from 'react'
import { UseMutateFunction, UseMutationResult } from '@tanstack/react-query'
import {
    Button,
    DialogWindow,
    Form,
    Input,
    LoadingState,
} from '../../../../../components'
import { useTranslation } from 'react-i18next'
import {
    IoCheckmarkSharp,
    IoListOutline,
    IoTrashOutline,
} from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { useSteps } from '../../../../../api/steps'
import useInput from '../../../../../hooks/useInput'
import { AxiosError, AxiosResponse } from 'axios'

interface ManageSubtasksDialogProps {
    task: Task
    isOpen: boolean
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
    mutation: UseMutationResult<
        AxiosResponse<{ steps: Step[] }, any>,
        AxiosError<ValidationErrors[], any>,
        any[],
        unknown
    >
}

const ManageSubtasksDialog = ({
    task,
    isOpen,
    setIsOpen,
    mutation,
}: ManageSubtasksDialogProps) => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { data: steps, isLoading, isError } = useSteps(teamSlug!, task.id)
    const [editableSteps, setEditableSteps] = React.useState<any[]>([])

    const dummyStepTitleInstance = useInput('', {})

    useEffect(() => {
        if (steps) {
            setEditableSteps(steps.results.map((s) => ({ ...s })))
        }
    }, [steps])

    const newStep = useInput('', { isEmpty: true })

    const addNewStep = () => {
        if (newStep.value.trim() === '') return
        setEditableSteps((prevState) => [
            ...prevState,
            { title: newStep.value.trim() },
        ])
        newStep.clear()
    }

    return (
        <DialogWindow
            icon={<IoListOutline />}
            title={
                task.steps_count > 0 ? t('edit_subtasks') : t('add_subtasks')
            }
            isOpen={isOpen}
            close={() => setIsOpen(false)}
            onSuccess={() => mutation.mutateAsync(editableSteps)}
            successButtonStyle="primary"
            successButtonText={t('save')}
            isLoading={mutation.isPending}
            closeOnSuccess
        >
            {isLoading ? (
                <LoadingState titleKey="loading_subtasks" />
            ) : isError ? (
                t('error')
            ) : (
                <Form className="pt-0.5">
                    {editableSteps.length > 0 && (
                        <ul className="grid gap-5">
                            {editableSteps.map((step, index) => {
                                const possibleError =
                                    mutation.error?.response?.data?.[index]
                                        ?.title

                                return (
                                    <li
                                        key={step.id ?? index}
                                        className="flex gap-5 items-start"
                                    >
                                        <Input
                                            value={step.title}
                                            instance={dummyStepTitleInstance}
                                            onChange={(value) => {
                                                const updated = [
                                                    ...editableSteps,
                                                ]
                                                updated[index].title = value
                                                setEditableSteps(updated)
                                            }}
                                            errors={
                                                Array.isArray(possibleError)
                                                    ? possibleError
                                                    : undefined
                                            }
                                        />
                                        <Button
                                            style="destructive"
                                            action={() =>
                                                setEditableSteps(
                                                    editableSteps.filter(
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }
                                            className="min-w-10 !px-0"
                                        >
                                            <IoTrashOutline />
                                        </Button>
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    <div className="flex gap-5">
                        <Input
                            instance={newStep}
                            placeholder={t('new_subtask')}
                        />
                        <Button
                            style="secondary"
                            className="min-w-10 !px-0"
                            action={addNewStep}
                        >
                            <IoCheckmarkSharp />
                        </Button>
                    </div>
                    <p className="text-xs font-semibold text-gray-400">
                        {t('subtasks_desc')}
                    </p>
                </Form>
            )}
        </DialogWindow>
    )
}

export default ManageSubtasksDialog
