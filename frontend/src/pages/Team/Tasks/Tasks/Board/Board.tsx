import Column from './Column'
import { useTranslation } from 'react-i18next'

const Board = () => {
    const { t } = useTranslation()
    return (
        <div className="bg-gray-100 dark:bg-slate-900 grow grid grid-cols-[1fr_1fr_1fr_1fr] p-5 gap-5 items-start max-w-screen md:max-w-slot overflow-x-auto">
            <Column title={t('to_do')} color={'#ff9100'} status={'to_do'} />
            <Column
                title={t('in_progress')}
                color={'#006fff'}
                status={'in_progress'}
            />
            <Column
                title={t('need_review')}
                color={'#ffdd00'}
                status={'need_review'}
                canAdd={false}
            />
            <Column
                title={t('done')}
                color={'#1cc01f'}
                status={'done'}
                canAdd={false}
            />
        </div>
    )
}

export default Board
