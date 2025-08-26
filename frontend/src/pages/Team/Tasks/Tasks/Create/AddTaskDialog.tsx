import { IoCheckmark, IoClose, IoReceiptOutline } from 'react-icons/io5'
import {
    Button,
    Checkbox,
    DialogWindow,
    Form,
    Input,
    TextField,
} from '../../../../../components'
import { useTranslation } from 'react-i18next'
import React, { SetStateAction, useCallback, useMemo, useState } from 'react'
import useInput from '../../../../../hooks/useInput'
import TagSelector from './TagSelector'
import { Member, Step, Tag, Task } from '../../../../../types'
import { objectsDifference } from '../../../../../utils'
import AssigneeSelector from './AssigneeSelector'
import { UseMutateFunction } from '@tanstack/react-query'

interface AddTaskDialogProps {
    icon: React.ReactNode | React.ReactElement
    title: string
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
    initialTask?: Task
    onSuccess: UseMutateFunction<any, Error, any, unknown>
    status?: string
    clearOnClose?: boolean
    successButtonText: string
}

const AddTaskDialog = ({
    icon,
    title: dialogTitle,
    open,
    setOpen,
    initialTask,
    onSuccess,
    status,
    clearOnClose,
    successButtonText,
}: AddTaskDialogProps) => {
    const { t } = useTranslation()
    const title = useInput(initialTask?.title ?? '', { isEmpty: true })
    const description = useInput(initialTask?.description ?? '', {
        isEmpty: true,
    })
    const nextStep = useInput('')
    const [steps, setSteps] = useState<string[]>(
        initialTask?.steps.map((step) => step.title) ?? []
    )
    const [requiresReview, setRequiresReview] = useState(
        initialTask?.requires_review ?? false
    )
    const [selectedTag, setSelectedTag] = useState<number | null | undefined>(
        initialTask?.tag?.id ?? null
    )
    const [assignee, setAssignee] = useState<Member | null>(
        initialTask?.assignee ?? null
    )
    const deadline = useInput(initialTask?.deadline ?? '')

    const addStep = useCallback(() => {
        const nextStepValue = nextStep.value.trim()
        if (nextStepValue === '') return
        setSteps((prev) => [...prev, nextStepValue])
        nextStep.clear()
    }, [nextStep.value, setSteps, nextStep])

    const removeStep = useCallback(
        (step: string) => {
            setSteps((prev) => prev.filter((el) => el !== step))
        },
        [setSteps]
    )

    const clearForm = useCallback(() => {
        title.clear()
        description.clear()
        setSelectedTag(null)
        setRequiresReview(false)
        setSteps([])
        setAssignee(null)
        deadline.clear
    }, [
        title,
        description,
        setSelectedTag,
        setRequiresReview,
        setSteps,
        setAssignee,
        deadline,
    ])

    const closeForm = useCallback(() => {
        setOpen(false)
        clearOnClose && clearForm()
    }, [setOpen, clearForm, clearOnClose])

    const formData = useMemo(
        () => ({
            title: title.value.trim(),
            description: description.value.trim(),
            requires_review: requiresReview,
            tag: selectedTag,
            steps,
            assignee: assignee?.id,
            deadline: deadline.value,
        }),
        [
            title.value,
            description.value,
            requiresReview,
            selectedTag,
            steps,
            assignee,
            deadline,
        ]
    )

    const diff = useMemo(
        () =>
            objectsDifference(initialTask || {}, formData, {
                tag: (
                    lhs: Tag | null | undefined,
                    rhs: number | null
                ): boolean => {
                    const lhsUnset = lhs === null || lhs === undefined
                    const rhsUnset = rhs === null
                    if (lhsUnset && rhsUnset) return true
                    if (lhs && rhs !== null) return lhs.id === rhs
                    return false
                },
                assignee: (lhs: Member | null, rhs: number | null) => {
                    return lhs?.id === rhs
                },
                steps: (lhs: Step[] = [], rhs: string[] = []) => {
                    if (lhs.length !== rhs.length) return false
                    return lhs.every((step, index) => step.title === rhs[index])
                },
            }),
        [formData, initialTask]
    )

    const canSave =
        Object.keys(diff).length > 0 &&
        title.allValid &&
        description.allValid &&
        assignee !== null
    const isEditMode = !!initialTask

    return (
        <DialogWindow
            icon={icon}
            title={dialogTitle}
            isOpen={open}
            onSuccess={() => {
                onSuccess(
                    isEditMode ? { ...diff, status } : { ...formData, status },
                    {
                        onSuccess: closeForm,
                    }
                )
            }}
            successButtonStyle="primary"
            successButtonText={successButtonText}
            close={closeForm}
            disabled={!canSave}
            isCover
            expandable
        >
            <Form>
                <Input must title={t('title')} instance={title} />
                <div className="flex flex-col gap-1.5">
                    <TagSelector
                        selected={selectedTag}
                        setSelected={setSelectedTag}
                        unselectToNull
                    />
                    <p className="text-xs font-semibold text-gray-400">
                        {t('to_tag_settings')}
                    </p>
                </div>
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
                                className="bg-gray-200 dark:bg-slate-700 flex items-center rounded-full pl-3 w-fit gap-0.5"
                                key={key}
                            >
                                {step}
                                <Button
                                    className="px-2 hover:bg-gray-300 dark:hover:bg-slate-600 min-h-8 !rounded-full"
                                    action={() => removeStep(step)}
                                >
                                    <IoClose />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
                <Input instance={deadline} title={t('deadline')} type="date" />
                <AssigneeSelector
                    assignee={assignee}
                    setAssignee={setAssignee}
                />
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
