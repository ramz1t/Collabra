import { useTranslation } from 'react-i18next'
import useLocalStorage from '../../hooks/useLocalStorage'
import { OrderingKey, SortingOption } from '../../types'
import { Button, Dropdown } from '../index'
import { IoArrowDown, IoArrowUp, IoText } from 'react-icons/io5'
import { StorageKey } from '../../utils/constants'

interface SortingDropdownProps {
    storageKey: string
    sortingOptions: string[]
    position?: 'left' | 'right'
}

const SortingDropdown = ({
    storageKey,
    sortingOptions,
    position,
}: SortingDropdownProps) => {
    const { t } = useTranslation()

    const [value, setValue] = useLocalStorage<OrderingKey>(
        // @ts-ignore
        StorageKey.ORDER_BY(storageKey),
        'modified_at'
    )

    const sortingButtons: Record<string, SortingOption> = {
        title: { title: t('alphabetical'), icon: <IoText /> },
        '-id': { title: t('newer_first'), icon: <IoArrowDown /> },
        id: { title: t('older_first'), icon: <IoArrowUp /> },
        modified_at: { title: t('updated_first'), icon: <IoArrowDown /> },
    }

    const filteredOptions = sortingOptions.reduce<
        Record<string, SortingOption>
    >((acc, key) => {
        if (sortingButtons[key]) {
            acc[key] = sortingButtons[key]
        }
        return acc
    }, {})

    return (
        <Dropdown<SortingOption>
            selected={value!}
            setSelected={setValue}
            values={filteredOptions}
            renderOption={(option, isSelected) => (
                <div className="flex items-center w-full gap-3 md:gap-8">
                    {option.title}
                    <span className="max-md:order-first md:ml-auto">
                        {option.icon}
                    </span>
                </div>
            )}
            renderSelected={(option) => (
                <Button className="bg-gray-100 dark:bg-slate-800 min-h-10 min-w-10 px-3 rounded-md">
                    {option.icon}
                    {option.title}
                </Button>
            )}
            position={position}
        />
    )
}

export default SortingDropdown
