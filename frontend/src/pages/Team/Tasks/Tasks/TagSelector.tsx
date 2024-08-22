import React, { SetStateAction, useState } from 'react'
import cn from 'classnames'
import { Button } from '../../../../components'
import TaskTag from './TaskTag'
import { useCreateTag, useTags } from '../../../../api/tags'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { hexToRGBA } from '../../../../utils'
import { IoAdd } from 'react-icons/io5'

interface TagSelectorProps {
    selected: number | undefined
    setSelected: React.Dispatch<SetStateAction<number | undefined>>
    canEdit?: boolean
}

const TagSelector = ({ selected, setSelected, canEdit }: TagSelectorProps) => {
    const { t } = useTranslation()
    const { teamSlug } = useParams()
    const { data: tags } = useTags(teamSlug!)
    const { mutate: createTag } = useCreateTag(teamSlug!)
    const [newTag, setNewTag] = useState('')
    const initialColor = '#5b5b5b'
    const [color, setColor] = useState(initialColor)

    return (
        <ul className="flex gap-2 flex-wrap">
            {canEdit && (
                <div
                    className="w-fit bg-gray-100 rounded-full flex items-center pl-1"
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
                        placeholder={t('new_tag')}
                        className="focus:outline-none w-28 bg-transparent h-full px-2 placeholder:text-[--accent-placeholder]"
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <Button
                        className="min-w-8 h-full !text-[--accent]"
                        action={() => {
                            if (newTag.trim() === '') return
                            createTag(
                                { title: newTag.trim(), color: color },
                                {
                                    onSuccess: (res) => {
                                        setColor(initialColor)
                                        setNewTag('')
                                        setSelected(res.data.id)
                                    },
                                }
                            )
                        }}
                    >
                        <IoAdd size="1.3em" />
                    </Button>
                </div>
            )}
            {tags &&
                tags.map((tag) => (
                    <li
                        className={cn(
                            'rounded-full transition-all duration-[50ms] outline outline-[--accent]',
                            selected === tag.id ? 'outline-2' : 'outline-0'
                        )}
                        key={tag.id}
                        style={
                            {
                                '--accent': tag.color,
                            } as React.CSSProperties
                        }
                    >
                        <Button
                            action={() =>
                                selected === tag.id
                                    ? setSelected(undefined)
                                    : setSelected(tag.id)
                            }
                        >
                            <TaskTag tag={tag} canDelete={canEdit} />
                        </Button>
                    </li>
                ))}
        </ul>
    )
}

export default TagSelector
