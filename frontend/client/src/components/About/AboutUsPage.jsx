// path: frontend/client/src/components/About/AboutUsPage.jsx
import { useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import Members from './Members';
import JoinOrCommission from './JoinUs';
const sections = [
    {
        name: 'About Us', content: (
            <section className="bg-white rounded-lg p-6 mb-8 w-auto">
                <section className="text-gray-700 mb-4 flex-grow">
                    <p className="mb-4">All of us in EduLibya are linked to the education sector as students, teachers, parents, workshop leaders, researchers, psycho-social practitioners and so forth.</p>
                    <p className="mb-4">We are a network of pedagogues / educationalists interested in various dimensions of education across Libya.</p>
                    <p className="mb-4">We are a community of people who care enough to try and make a difference in our society by making our education system more meaningful for students and teachers. The value we will create is for society, not for us as individuals.</p>
                    <p className="mb-4">The network aims to remain flexible and responsive – it continuously waits for you and us all to decide what it will be.</p>
                    <p className="mb-4">Before you commit to this Network and choose a suitable time for our first meeting (see below), let me share some important details:</p>
                    <p className="mb-4">1. There is no monetary reward for joining this network. Most of the work we will do is voluntary (because we believe it is vital and part of what we do already) but there will be no pressure to give up more time and effort than you are able to.</p>
                    <p className="mb-4">2. This is not an established network or organisation with any accreditation power. Attending our online workshops, discussions, meetings will not give you a certificate. We attend these meetings because we want to learn and improve our thinking and practice in the field of education.</p>
                    <p className="mb-4">At the heart of EduLibya is a commitment to conversation and community-building around the role of education in Libya. We see education as part of a greater ecology of human practices in society – education (formal and informal) interacts with various threads that make up the fabric of our Libyan culture.</p>
                    <p className="mb-4">We do not aim to offer solutions to problems; instead, we aim to make deeper connections between each other, our thoughts and our practices in the hope of seeing ourselves more clearly and in the hope of proposing ways to face our futures.</p>
                    <p className="mb-4">EduLibya moves through time and space organically, with ever-fluctuating members communicating about ever-changing needs. The intentionally elusive nature of this space is the co-construction of a community that can build a common language for change and movement in whatever direction is desired.</p>
                </section>            </section>
        ),
    },
    {
        name: 'Our Team',
        content: (
            <Members /> // Now this will display members from the API
        ),
    },
    // { name: 'Our Partners', content: 'Details about our partners.' },
    // { name: 'Our Funding', content: 'Funding information.' },
    { name: 'Join or Commission EduLibya', content: <JoinOrCommission /> },
    // { name: 'Job Opportunities', content: 'Available job opportunities.' },
    // { name: 'Internship Opportunities', content: 'Available internship opportunities.' },
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
