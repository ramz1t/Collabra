import useInput from '../../../hooks/useInput'
import { Button, Input } from '../../../components'
import { IoTrashOutline } from 'react-icons/io5'
import React, { SetStateAction } from 'react'

interface LinkCellProps {
    links: string[]
    setLinks: React.Dispatch<SetStateAction<string[]>>
    index: number
    errors?: string[] | undefined
}

const LinkCell = ({
    links,
    setLinks,
    index,
    errors,
}: LinkCellProps): React.ReactElement => {
    const inputInstance = useInput(links[index])

    return (
        <li className="flex gap-5 items-center">
            <Input
                instance={inputInstance}
                onChange={(value) => {
                    setLinks((links) => {
                        let updatedLinks = [...links]
                        updatedLinks[index] = value
                        return updatedLinks
                    })
                }}
                errors={errors}
            />
            <Button
                style="destructive"
                className="min-w-10 !min-h-10 !p-0"
                action={() =>
                    setLinks((links) => {
                        let updatedLinks = [...links]
                        updatedLinks.splice(index, 1)
                        return updatedLinks
                    })
                }
                type="button"
            >
                <IoTrashOutline />
            </Button>
        </li>
    )
}

export default LinkCell
