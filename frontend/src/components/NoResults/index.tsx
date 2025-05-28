import { IInputInstance } from '../../hooks/useInput'
import { useTranslation } from 'react-i18next'
import { Button } from '../index'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

const NoResults = ({
    title,
    description,
    input,
    onReset,
    onResetText,
}: {
    title: string
    description: string
    input?: IInputInstance
    onReset?: () => void
    onResetText?: string
}) => {
    const { t } = useTranslation()

    return (
        <div className="grow flex flex-col items-center justify-center col-span-full w-full gap-5">
            <span className="text-accent dark:text-accent-dark text-6xl">
                <IoSearch />
            </span>
            <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
            <p className="text-lg md:text-xl text-gray-600 text-center">
                {input?.value.trim().length
                    ? t('no_results_for', {
                          search: input.value.trim(),
                      })
                    : description}
            </p>
            {onReset !== undefined ? (
                <Button
                    style="primary"
                    action={onReset}
                    className="font-semibold"
                >
                    {onResetText}
                </Button>
            ) : null}
        </div>
    )
}

export default NoResults
