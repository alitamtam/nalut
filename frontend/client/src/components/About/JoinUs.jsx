
const JoinOrCommission = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                How to Collaborate with EduLibya
            </h2>

            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                    Share Your Publications
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                    EduLibya is dedicated to fostering a community of knowledge and learning. We welcome contributions in the form of publications, research, and educational materials that align with our mission.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                    To share your work with us, follow these simple steps:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-600 mb-4">
                    <li>
                        <strong>Submit Your Work:</strong> Use our{' '}
                        <a href="#" className="text-teal-500 hover:underline">
                            publication submission form
                        </a>{' '}
                        to provide details about your publication.
                    </li>
                    <li>
                        <strong>Review Process:</strong> Our team will review your submission and get in touch if any further information is needed.
                    </li>
                    <li>
                        <strong>Publication Display:</strong> Accepted publications will be featured on our platform, allowing others to benefit from your work.
                    </li>
                </ul>
            </div>

            <div>
                <p className="text-lg text-gray-600 mb-4">
                    By sharing your publications with EduLibya, you contribute to a broader exchange of knowledge and help advance educational and cultural initiatives.
                </p>
                <p className="text-lg text-gray-600">
                    For more information or to get started, reach out to us at{' '}
                    <a href="mailto:contact@edulibya.ly" className="text-teal-500 hover:underline">
                        contact@edulibya.org
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default JoinOrCommission;
