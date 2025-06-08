import PolicyLayout from '../components/PolicyLayout';
import PropTypes from 'prop-types';

const PolicySection = ({ title, children }) => (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 group">
        <h3 className="w-full lg:w-[40%] text-xl lg:text-2xl font-bold uppercase text-gray-800 group-hover:text-purpleMain transition-colors duration-300">
            {title}
        </h3>
        <div className="w-full lg:w-[60%]">
            {children}
        </div>
    </div>
);

const PrivacyPolicy = () => {
    return (
        <PolicyLayout 
            title="Privacy Policies"
            subtitle="At SnapSolve, we are committed to protecting your privacy and ensuring the security of your information. This Privacy Policy outlines how we collect, use, and protect the data you provide when using SnapSolve."
        >
            <PolicySection title="1. Information We Collect">
                <ul className="space-y-4 list-none">
                    {[
                        {
                            title: "Uploaded Content",
                            content: "When you upload images of equations or mathematical problems, SnapSolve collects these images solely to process and provide accurate solutions."
                        },
                        {
                            title: "Usage Data",
                            content: "We may collect information on how you use SnapSolve, including page views, clicks, and interaction data. This helps us improve our app and deliver a better user experience."
                        },
                        {
                            title: "Account Information",
                            content: "When you create an account, we collect basic information such as your email address and username to provide you with personalized services."
                        },
                        {
                            title: "Device Information",
                            content: "We collect information about the device and browser you use to access SnapSolve, including IP address, browser type, and operating system."
                        }
                    ].map((item, index) => (
                        <li key={index} className="pl-4 border-l-2 border-purpleMain hover:border-l-4 transition-all duration-300">
                            <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </PolicySection>

            <PolicySection title="2. How We Use Your Information">
                <ul className="space-y-4 list-none">
                    {[
                        {
                            title: "Service Provision",
                            content: "We use your information to provide and improve our services, process your requests, and enhance your user experience."
                        },
                        {
                            title: "Communication",
                            content: "We may use your email address to send important updates about SnapSolve, respond to your inquiries, or provide support."
                        },
                        {
                            title: "Analytics",
                            content: "We analyze usage patterns to improve our services, fix bugs, and develop new features that better serve our users."
                        },
                        {
                            title: "Security",
                            content: "Your information helps us detect and prevent fraud, abuse, and security breaches on our platform."
                        }
                    ].map((item, index) => (
                        <li key={index} className="pl-4 border-l-2 border-purpleMain hover:border-l-4 transition-all duration-300">
                            <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </PolicySection>

            <PolicySection title="3. Data Protection">
                <ul className="space-y-4 list-none">
                    {[
                        {
                            title: "Security Measures",
                            content: "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse."
                        },
                        {
                            title: "Data Retention",
                            content: "We retain your data only for as long as necessary to provide our services and comply with legal obligations."
                        },
                        {
                            title: "Third-Party Access",
                            content: "We do not sell your personal information to third parties. Access to your data is strictly limited to authorized personnel."
                        },
                        {
                            title: "User Control",
                            content: "You can request access to, correction of, or deletion of your personal information at any time through your account settings."
                        }
                    ].map((item, index) => (
                        <li key={index} className="pl-4 border-l-2 border-purpleMain hover:border-l-4 transition-all duration-300">
                            <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </PolicySection>

            <PolicySection title="4. Updates to Privacy Policy">
                <ul className="space-y-4 list-none">
                    {[
                        {
                            title: "Policy Changes",
                            content: "We may update this Privacy Policy periodically. We will notify you of any significant changes through email or app notifications."
                        },
                        {
                            title: "User Consent",
                            content: "Continued use of SnapSolve after changes to this policy constitutes acceptance of the updated terms."
                        }
                    ].map((item, index) => (
                        <li key={index} className="pl-4 border-l-2 border-purpleMain hover:border-l-4 transition-all duration-300">
                            <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </PolicySection>

            <PolicySection title="Cookie Usage">
                <ul className="space-y-4 list-none">
                    {[
                        {
                            title: "Essential Cookies",
                            content: "We use necessary cookies to make our website work. These cookies are required for basic functionality like authentication and security."
                        },
                        {
                            title: "Preference Cookies",
                            content: "These cookies allow us to remember your preferences (like dark mode) to provide you with a more personalized experience."
                        },
                        {
                            title: "Analytics Cookies",
                            content: "We use analytics cookies to understand how you interact with our website, helping us improve our services."
                        },
                        {
                            title: "Your Control",
                            content: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed."
                        }
                    ].map((item, index) => (
                        <li key={index} className="pl-4 border-l-2 border-purpleMain hover:border-l-4 transition-all duration-300">
                                        <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.content}</p>
                        </li>
                    ))}
                </ul>
            </PolicySection>
        </PolicyLayout>
    );
};

PolicySection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default PrivacyPolicy;