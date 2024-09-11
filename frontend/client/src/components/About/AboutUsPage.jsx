// path: frontend/client/src/components/About/AboutUsPage.jsx
import { useState } from 'react';
import Sidebar from '../Navbar/SideVar';
import Members from './Members';

const sections = [
    {
        name: 'Mission and Purpose', content: (
            <section className="bg-white rounded-lg p-6 mb-8 w-auto">
                {/* Your existing content */}
            </section>
        ),
    },
    {
        name: 'Our Team',
        content: (
            <Members /> // Now this will display members from the API
        ),
    },
    { name: 'Our Partners', content: 'Details about our partners.' },
    { name: 'Our Funding', content: 'Funding information.' },
    { name: 'Join or Commission EduLibya', content: 'How to join or commission EduLibya.' },
    { name: 'Job Opportunities', content: 'Available job opportunities.' },
    { name: 'Internship Opportunities', content: 'Available internship opportunities.' },
];

const AboutUsPage = () => {
    const [activeSection, setActiveSection] = useState(sections[0].name);

    const handleSectionClick = (sectionName) => {
        setActiveSection(sectionName);
    };

    const activeContent = sections.find(section => section.name === activeSection).content;

    return (
        <div className="flex lg:mx-80">
            <Sidebar sections={sections} onSectionClick={handleSectionClick} />
            <div className="p-8 w-full">
                <h2 className="text-2xl font-bold">{activeSection}</h2>
                <div className="mt-4">{activeContent}</div>
            </div>
        </div>
    );
};

export default AboutUsPage;
