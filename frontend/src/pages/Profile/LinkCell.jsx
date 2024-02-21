import useInput from '../../hooks/useInput'
import { Button, Input } from '../../components'
import { IoTrashOutline } from 'react-icons/io5'

const LinkCell = ({ links, setLinks, index }) => {
    const inputInstance = useInput(links[index])

    return (
        <li className="flex gap-5 items-center">
            <Input
                instance={inputInstance}
                onChange={(e) => {
                    setLinks((links) => {
                        let updatedLinks = [...links]
                        updatedLinks[index] = e.target.value
                        return updatedLinks
                    })
                }}
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
