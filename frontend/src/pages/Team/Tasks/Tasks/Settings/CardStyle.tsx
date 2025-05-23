import { SettingsSection } from '../../../../../components'
import { useTranslation } from 'react-i18next'
import useLocalStorage from '../../../../../hooks/useLocalStorage'
import { useUser } from '../../../../../api/user'
import RadioButton from '../../../../../components/RadioButton'

const CardStyle = () => {
    const { t } = useTranslation()
    const [cardStyle, setCardStyle] = useLocalStorage('cardStyle', 'expanded')
    const { data: user } = useUser('me')

    if (!user) return

    return (
        <SettingsSection
            title={t('card_style')}
            description={t('card_style_desc')}
        >
            <div className="flex flex-col gap-3">
                <RadioButton
                    value="expanded"
                    name="cardStyle"
                    text={t('expanded')}
                    selectedValue={cardStyle!}
                    onChange={setCardStyle}
                />
                <RadioButton
                    value="collapsed"
                    name="cardStyle"
                    text={t('collapsed')}
                    selectedValue={cardStyle!}
                    onChange={setCardStyle}
                />
            </div>
        </SettingsSection>
    )
}

export default CardStyle
