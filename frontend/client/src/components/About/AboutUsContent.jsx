import { useTranslation } from 'react-i18next';
const AboutUsContent = () => {

    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';

    return (
        <section className=" text-gray-500  p-6 mb-8 lg:font-arabic ssm:font-arabic md:font-arabic">
            <p className={`mb-4 lg:font-arabic ssm:font-arabic md:font-arabic ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part1')}.
            </p>
            <p className={`mb-4 ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part2')}
            </p>
            <p className={`mb-4 ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part3')}
            </p>
            <p className={`mb-4 ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part4')}
            </p>
            <p className={`mb-4 ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part5')}
            </p>
            <p className={`mb-4 ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part6')}
            </p>
            <p className={`mb-4 ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part7')}
            </p>
            <p className={`mb-4 ${isArabic ? 'text-right text-lg' : 'text-left'}`}>
                {t('eduLibyaDescription.part8')}
            </p>
        </section>
    );
};
export default AboutUsContent