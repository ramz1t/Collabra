import { Tag } from '../../../../types'
import React, { useCallback, useState } from 'react'
import { IoPencil } from 'react-icons/io5'
import { Button, DialogWindow, Input } from '../../../../components'
import { useTranslation } from 'react-i18next'
import useInput from '../../../../hooks/useInput'
import cn from 'classnames'
import { useDeleteTag, useEditTag } from '../../../../api/tags'
import { useParams } from 'react-router-dom'

const EditTagDialog = ({
    tag,
    isOpen,
    setIsOpen,
}: {
    tag: Tag
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { t } = useTranslation()
    const title = useInput(tag.title, { isEmpty: true })
    const [color, setColor] = useState(tag.color)
    const { teamSlug } = useParams()

    const { mutate: deleteTag, isPending: isDeleting } = useDeleteTag(teamSlug!)
    const { mutate: editTag, isPending: isEditing } = useEditTag(teamSlug!)

    const isValid =
        title.allValid && (title.value !== tag.title || color !== tag.color)

    const handleSubmit = useCallback(() => {
        editTag({
            tagId: tag.id,
            data: { title: title.value.trim(), color: color },
        })
    }, [editTag, tag, title, color])

    return (
        <DialogWindow
            icon={<IoPencil />}
            title={t('edit_tag')}
            isOpen={isOpen}
            isLoading={isEditing}
            onSuccess={handleSubmit}
            closeOnSuccess
            disabled={!isValid}
            close={() => setIsOpen(false)}
            successButtonStyle="primary"
            successButtonText={t('save')}
            extraButtons={
                <Button
                    action={() => {
                        deleteTag(tag.id, { onSuccess: () => setIsOpen(false) })
                    }}
                    style="destructive"
                    isLoading={isDeleting}
                >
                    {t('delete')}
                </Button>
            }
        >
            <div className="pt-4 md:pt-2 grid gap-5">
                <Input title={t('title')} instance={title} must />
                <div className="flex flex-col gap-1">
                    <label
                        className='pl-1 after:content-["*"] after:text-red-500 dark:after:text-red-700 after:pl-0.5'
                        htmlFor="#color"
                    >
                        {t('color')}
                    </label>
                    <input
                        id="color"
                        type="color"
                        className="size-8 rounded-md border-none [&::-moz-color-swatch]:border-none"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <p className="font-semibold text-xs pt-2 text-gray-500">
                    {t('delete_tag_warning')}
                </p>
            </div>
        </DialogWindow>
    )
}

export default EditTagDialog
