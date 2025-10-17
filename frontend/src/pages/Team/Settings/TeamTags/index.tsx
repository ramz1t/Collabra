import { useTranslation } from 'react-i18next'
import {
    Button,
    LoadingState,
    SettingsSection,
    TaskTag,
} from '../../../../components'
import React, { useCallback, useState } from 'react'
import { hexToRGBA } from '../../../../utils'
import { IoAdd } from 'react-icons/io5'
import { useCreateTag, useTags } from '../../../../api/tags'
import { useParams } from 'react-router-dom'

const TeamTags = (): React.ReactElement => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const [newTag, setNewTag] = useState('')
    const initialColor = '#5b5b5b'
    const [color, setColor] = useState(initialColor)
    const { mutate: createTag, isPending } = useCreateTag(teamSlug!)
    const { data: tags, isLoading } = useTags(teamSlug!)

    const createTagCallback = useCallback(() => {
        if (newTag.trim() === '') return
        createTag(
            { title: newTag.trim(), color: color },
            {
                onSuccess: (res) => {
                    setColor(initialColor)
                    setNewTag('')
                },
            }
        )
    }, [newTag, createTag, setColor, setNewTag, color])

    return (
        <SettingsSection
            title={t('team_tags_head')}
            description={t('team_tags_desc')}
        >
            <div>
                <p className="font-semibold text-sm pb-2">
                    {t('create_new_tag')}
                </p>
                <div
                    className="w-fit bg-gray-100 rounded-full flex items-center pl-1 min-h-8"
                    style={
                        {
                            backgroundColor: hexToRGBA(color, 0.2),
                            '--accent': color,
                        } as React.CSSProperties
                    }
                >
                    <input
                        type="color"
                        className="size-6 rounded-full border-none [&::-moz-color-swatch]:border-none"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <input
                        style={
                            {
                                color: color,
                                '--accent-placeholder': hexToRGBA(color, 0.45),
                            } as React.CSSProperties
                        }
                        value={newTag}
                        placeholder={t('title')}
                        className="focus:outline-none w-28 bg-transparent h-full px-2 placeholder:text-[--accent-placeholder]"
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <Button
                        className="min-w-8 min-h-8 !rounded-full disabled:!bg-transparent !text-[--accent]"
                        action={createTagCallback}
                        disabled={isPending}
                    >
                        <IoAdd size="1.3em" />
                    </Button>
                </div>
                <p className="font-semibold text-sm pb-2 pt-4">
                    {t('manage_tags')}
                </p>
                <ul className="flex flex-wrap gap-2">
                    {isLoading ? (
                        <LoadingState.TagPill />
                    ) : tags?.results.length ? (
                        tags?.results.map((tag) => (
                            <TaskTag tag={tag} canEdit key={tag.id} />
                        ))
                    ) : (
                        t('no_created_tags')
                    )}
                </ul>
            </div>
        </SettingsSection>
    )
}

export default TeamTags
