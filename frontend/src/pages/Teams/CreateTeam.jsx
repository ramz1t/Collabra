import useInput from '../../hooks/useInput.js'
import {
    BackgroundGradient,
    Button,
    Divider,
    Form,
    Input,
    TeamImage,
    Title,
} from '../../components/index.js'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useCreateTeam } from '../../api/team.js'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

const CreateTeam = () => {
    const name = useInput('')
    const { t } = useTranslation()
    const { mutate: createTeam } = useCreateTeam()
    const [allValid, setAllValid] = useState(false)

    useEffect(() => {
        if (name.value.trim() !== '') {
            setAllValid(true)
        } else {
            setAllValid(false)
        }
    }, [name.value])

    return (
        <div className="container mx-auto grid md:grid-cols-2 place-items-center my-auto max-md:pt-3 gap-10">
            <div className="w-fit max-md:w-full">
                <Link
                    to={'/teams'}
                    className="text-lg flex items-center gap-1.5 hover:text-accent dark:hover:text-accent-dark w-fit"
                >
                    <IoChevronBackOutline />
                    {t('back')}
                </Link>
                <Form
                    className="flex flex-col md:flex-row gap-5 p-5 border dark:border-slate-700 !rounded-2xl max-w-2xl bg-white dark:bg-slate-800 shadow-sm mt-2"
                    onSubmit={() =>
                        createTeam({
                            name: name.value,
                        })
                    }
                >
                    <TeamImage
                        team={{
                            name: name.value,
                        }}
                    />
                    <div className="grid gap-3">
                        <Input instance={name} title={'Team name'} must />
                        <Button
                            style="primary"
                            type="submit"
                            disabled={!allValid}
                            className="mt-3 ml-auto"
                        >
                            {t('create_team')}
                        </Button>
                    </div>
                </Form>
            </div>
            <img src={'/images/team_ill.png'} />
        </div>
    )
}

export default CreateTeam
