// src/pages/AboutUs.jsx



const AboutUs = () => {
    return (
        <div>

            <main className="container mx-auto px-4 py-8">
                <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">About Us</h2>
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
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Founding Members</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Repeat this block for each profile */}
                        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Reem Ben Giaber</h3>
                                <p className="text-gray-600">Profile description here...</p>
                            </div>
                        </article>
                        {/* Repeat above block for other members */}
                    </div>
                </section>
            </main>


        </div >
    );
};

export default AboutUs;
