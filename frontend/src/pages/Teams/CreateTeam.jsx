import useInput from '../../hooks/useInput.js'
import { Button, Divider, Form, Input, Title } from '../../components/index.js'
import { useTranslation } from 'react-i18next'
import { useCreateTeam } from '../../api/team.js'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'

const CreateTeam = () => {
    const name = useInput('')
    const { t } = useTranslation()
    const { mutate: createTeam } = useCreateTeam()
    const [allValid, setAllValid] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null)
    const colorOptions = [
        '#c20000',
        '#e84200',
        '#008606',
        '#007f85',
        '#0023d2',
        '#a90096',
    ]

    useEffect(() => {
        if (name.value.trim() !== '' && selectedColor !== null) {
            setAllValid(true)
        } else {
            setAllValid(false)
        }
    }, [name.value, selectedColor])

    return (
        <div className="container mx-auto">
            <Title backButton>{t('create_team')}</Title>
            <Form
                className="grid md:grid-cols-[2fr_3fr] gap-x-10 !gap-y-10 pt-px"
                disabled={!allValid}
                onSubmit={() =>
                    createTeam({
                        title: name.value,
                        color: selectedColor.slice(1),
                    })
                }
            >
                <Input
                    instance={name}
                    title={t('team_name')}
                    split
                    w_full
                    hint={t('team_name_desc')}
                    must
                />
                <Divider horizontal />
                <div className="flex flex-col gap-3">
                    <p
                        className="font-bold text-3xl"
                        style={{ color: selectedColor }}
                    >
                        {t('team_color')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('team_color_desc')}
                    </p>
                </div>
                <ul className="flex gap-3">
                    {colorOptions.map((color, key) => (
                        <li
                            key={key}
                            style={{ background: color }}
                            onClick={() => setSelectedColor(color)}
                            className={cn(
                                'size-10 hover:cursor-pointer rounded-full transition-all duration-75',
                                color === selectedColor
                                    ? 'border-2 border-accent dark:border-accent-dark'
                                    : 'hover:border hover:border-accent/50 hover:dark:border-accent-dark/50'
                            )}
                        ></li>
                    ))}
                </ul>
                <Divider horizontal />
                <span></span>
                <Button style="primary" type="submit" disabled={!allValid}>
                    {t('create')}
                </Button>
            </Form>
        </div>
    )
}

export default CreateTeam
