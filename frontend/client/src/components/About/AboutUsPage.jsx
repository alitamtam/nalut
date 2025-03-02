import { useState, useEffect, useMemo } from 'react';
import Sidebar from '../Navbar/Sidebar';
import Members from './Members';
import JoinOrCommission from './JoinUs';
import AboutUsContent from './AboutUsContent';
import { useTranslation } from 'react-i18next';

const AboutUsPage = () => {
    const { t, i18n } = useTranslation('navbar');
    const isArabic = i18n.language === 'ar';

    // Recreate sections every time the language changes
    const sections = useMemo(() => [
        { name: t('about.title'), id: 'about-us', content: <AboutUsContent /> },
        { name: t('our team'), id: 'our-team', content: <Members /> },
        { name: t('join us'), id: 'join-us', content: <JoinOrCommission /> },
    ], [t]);

    const [activeSection, setActiveSection] = useState(sections[0].name);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const handleSectionClick = (sectionName) => {
        setActiveSection(sectionName);
        const section = sections.find(sec => sec.name === sectionName);
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update the active section when language changes
    useEffect(() => {
        setActiveSection(sections[0].name);
    }, [sections]);

    useEffect(() => {
        // Check if the hash in the URL matches any section and scroll to it
        const hash = window.location.hash.substring(1);
        const section = sections.find(sec => sec.id === hash);
        if (section) {
            setActiveSection(section.name);
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [sections]);

    return (
        <div className="lg:mx-80 font-arabic text-sky-950">
            <div className={`flex ${isArabic ? 'text-right  flex-row-reverse' : ''}`}>
                {!isMobile && <Sidebar sections={sections} onSectionClick={handleSectionClick} />}
                <div className="p-8 w-full">
                    <h2 className="text-5xl font-bold hover:underline-offset-8">{activeSection}</h2>
                    {sections.map((section) => (
                        <div key={section.id} id={section.id} className="mt-4">
                            {section.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
