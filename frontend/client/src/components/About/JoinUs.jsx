import { useTranslation } from 'react-i18next';

const JoinOrCommission = () => {
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';

    return (
        <div dir={isArabic ? "rtl" : "ltr"} className={`lg:font-arabic ssm:font-arabic md:font-arabic container mx-auto px-4 py-6 ${isArabic ? 'direction-rtl text-right' : 'direction-ltr '}`}>
            <h2 className={`text-3xl font-bold text-gray-600 mb-6 ${isArabic ? 'text-right' : ''}`}>
                {t('joinUs.header')}
            </h2>

            <div dir={isArabic ? "rtl" : "ltr"} className={`text-2xl font-semibold text-gray-600 mb-4 ${isArabic ? 'text-right' : ''}`}>
                <h3 className={`text-2xl font-semibold text-gray-700 mb-4 ${isArabic ? 'text-right' : ''}`}>
                    {t('joinUs.sharePublications')}
                </h3>
                <p className={`text-lg text-gray-600 mb-4 ${isArabic ? 'text-right' : ''}`}>
                    {t('joinUs.description')}
                </p>
                <p className={`text-lg text-gray-600 mb-4 ${isArabic ? 'text-right' : ''}`}>
                    {t('joinUs.steps.description')}
                </p>
                <ul dir={isArabic ? "rtl" : "ltr"} className={`list-disc list-inside text-lg text-gray-600 mb-4 ${isArabic ? '' : ''}`}>
                    <li dir={isArabic ? "rtl" : "ltr"}>
                        <strong dir={isArabic ? "rtl" : "ltr"}>{t('joinUs.steps.submitYourWork')}</strong>
                    </li>
                    <li>
                        <strong>{t('joinUs.steps.reviewProcess')}</strong>
                    </li>
                    <li>
                        <strong>{t('joinUs.steps.publicationDisplay')}</strong>
                    </li>
                </ul>
            </div>

            <div dir={isArabic ? "rtl" : "ltr"}>
                <p className={`text-lg text-gray-600 mb-4 ${isArabic ? 'text-right' : ''}`}>
                    {t('joinUs.contribution')}
                </p>
                <p className={`text-lg text-gray-600 ${isArabic ? 'text-right' : ''}`}>
                    {t('joinUs.contact')}
                    <a href="mailto:contact@edulibya.ly" className='underline hover:text-blue-950' > contact@edulibya.ly</a>
                </p>
            </div>
        </div>
    );
};

export default JoinOrCommission;
