import React, { SetStateAction } from 'react'
import cn from 'classnames'
import { Button, LoadingState, TaskTag } from '../../../../../components'
import { useTags } from '../../../../../api/tags'
import { useParams } from 'react-router-dom'

interface TagSelectorProps {
    selected: number | undefined | null
    setSelected: React.Dispatch<SetStateAction<number | undefined | null>>
    unselectToNull?: boolean // Whether selecting the same tag should deselect it
    canSelectNone?: boolean // If true, the "No tag" button sets value to undefined instead of null
}

const TagSelector = ({
    selected,
    setSelected,
    unselectToNull,
    canSelectNone,
}: TagSelectorProps) => {
    const { teamSlug } = useParams()
    const { data: tags, isLoading } = useTags(teamSlug!)

    return (
        <ul className="flex gap-2 flex-wrap">
            <li>
                <Button
                    action={() =>
                        setSelected(() => {
                            if (selected === null) {
                                return canSelectNone ? undefined : null
                            } else {
                                return null
                            }
                        })
                    }
                    className={cn(
                        '!rounded-full transition-all duration-[50ms] outline outline-black dark:outline-white',
                        selected === null ? 'outline-2' : 'outline-0'
                    )}
                >
                    <TaskTag tag={null} />
                </Button>
            </li>
            {isLoading ? (
                <LoadingState.TagPill />
            ) : (
                tags?.map((tag) => (
                    <li
                        className={cn(
                            'rounded-full transition-all duration-[50ms] outline outline-[--accent] dark:outline-white',
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
                            action={() => {
                                if (selected === tag.id) {
                                    setSelected(
                                        unselectToNull ? null : undefined
                                    )
                                } else {
                                    setSelected(tag.id)
                                }
                            }}
                            className="!rounded-full"
                        >
                            <TaskTag tag={tag} />
                        </Button>
                    </li>
                ))
            )}
        </ul>
    )
}

export default TagSelector
