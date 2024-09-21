import { useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import Members from './Members';
import JoinOrCommission from './JoinUs';
import AboutUsContent from './AboutUsContent';
// import Navbar from '../Navbar/Navbar';

const sections = [
    { name: 'About Us', content: <AboutUsContent /> },
    { name: 'Our Team', content: <Members /> },
    { name: 'Join or Commission EduLibya', content: <JoinOrCommission /> },
];

const AboutUsPage = () => {
    const [activeSection, setActiveSection] = useState(sections[0].name);
    const [showSidebar,] = useState(true);

    const handleSectionClick = (sectionName) => {
        setActiveSection(sectionName);
    };



    const activeContent = sections.find(section => section.name === activeSection).content;

    return (
        <div className="flex lg:mx-80">
            {showSidebar && <Sidebar sections={sections} onSectionClick={handleSectionClick} />}
            <div className="p-8 w-full">
                <h2 className="text-2xl font-bold">{activeSection}</h2>
                <div className="mt-4">{activeContent}</div>
            </div>
        </div>
    );
};

export default AboutUsPage;
