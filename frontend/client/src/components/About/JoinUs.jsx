import { useTranslation } from 'react-i18next';

const JoinOrCommission = () => {
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';

    return (
        <div className={`container mx-auto px-4 py-6 ${isArabic ? 'direction-rtl' : 'direction-ltr'}`}>
            <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${isArabic ? 'text-end' : 'text-start'}`}>
                {t('joinUs.header')}
            </h2>

            <div className="mb-6">
                <h3 className={`text-2xl font-semibold text-gray-700 mb-4 ${isArabic ? 'text-end' : 'text-start'}`}>
                    {t('joinUs.sharePublications')}
                </h3>
                <p className={`text-lg text-gray-600 mb-4 ${isArabic ? 'text-end' : 'text-start'}`}>
                    {t('joinUs.description')}
                </p>
                <p className={`text-lg text-gray-600 mb-4 ${isArabic ? 'text-end' : 'text-start'}`}>
                    {t('joinUs.steps.description')}
                </p>
                <ul className={`list-disc list-inside text-lg text-gray-600 mb-4 ${isArabic ? 'text-end' : 'text-start'}`}>
                    <li>
                        <strong>{t('joinUs.steps.submitYourWork')}</strong>
                    </li>
                    <li>
                        <strong>{t('joinUs.steps.reviewProcess')}</strong>
                    </li>
                    <li>
                        <strong>{t('joinUs.steps.publicationDisplay')}</strong>
                    </li>
                </ul>
            </div>

            <div>
                <p className={`text-lg text-gray-600 mb-4 ${isArabic ? 'text-end' : 'text-start'}`}>
                    {t('joinUs.contribution')}
                </p>
                <p className={`text-lg text-gray-600 ${isArabic ? 'text-end' : 'text-start'}`}>
                    {t('joinUs.contact')}
                </p>
            </div>
        </div>
    );
};

export default JoinOrCommission;
