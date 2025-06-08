import PolicyLayout from '../components/PolicyLayout';
import PropTypes from 'prop-types';

const RuleSection = ({ title, content, listItems }) => (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 group">
        <h3 className="w-full lg:w-[40%] text-xl lg:text-2xl font-bold uppercase text-gray-800 group-hover:text-purpleMain transition-colors duration-300">
            {title}
        </h3>
        <div className="w-full lg:w-[60%] space-y-4">
            <p className="text-gray-600 leading-relaxed">{content}</p>
            {listItems && (
                <ul className="space-y-3 list-disc pl-5 marker:text-purpleMain">
                    {listItems.map((item, index) => (
                        <li key={index} className="text-gray-600 pl-2">{item}</li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

const Rules = () => {
    return (
        <PolicyLayout 
            title="Community Guidelines"
            subtitle="To maintain a constructive and safe environment for everyone, we ask all users to adhere to the following guidelines when using SnapSolve. By accessing SnapSolve, you agree to these terms."
        >
            <RuleSection 
                title="1. Respectful and Appropriate Content"
                content="Do not submit content that is offensive, obscene, or inappropriate. This includes language, images, or other materials that:"
                listItems={[
                    "Are sexually explicit or contain nudity",
                    "Are violent or promote harm",
                    "Use hateful, racist, or discriminatory language",
                    "Contain personal information of others",
                    "Violate intellectual property rights"
                ]}
            />

            <RuleSection 
                title="2. Academic Integrity"
                content="While SnapSolve is designed to help you learn and understand concepts, you should:"
                listItems={[
                    "Use the platform as a learning tool, not just to get answers",
                    "Understand the solutions provided and learn from them",
                    "Follow your institution's academic integrity policies",
                    "Cite SnapSolve when using it as a reference",
                    "Not use the platform during exams or closed-book assessments"
                ]}
            />

            <RuleSection 
                title="3. Appropriate Usage"
                content="To ensure the best experience for all users:"
                listItems={[
                    "Submit clear, legible images of questions",
                    "One question per submission for accurate responses",
                    "Do not spam or submit duplicate questions",
                    "Use appropriate language in communications",
                    "Report any technical issues or inappropriate content"
                ]}
            />

            <RuleSection 
                title="4. Privacy & Security"
                content="To protect your privacy and maintain security:"
                listItems={[
                    "Do not share your login credentials",
                    "Keep your personal information private",
                    "Report any suspicious activity",
                    "Use strong, unique passwords",
                    "Log out when using shared devices"
                ]}
            />

            <RuleSection 
                title="5. Content Rights"
                content="Regarding content submitted to SnapSolve:"
                listItems={[
                    "You retain rights to content you submit",
                    "Grant SnapSolve license to use submitted content",
                    "Respect copyright and intellectual property rights",
                    "Do not share solutions without permission",
                    "Credit original sources when applicable"
                ]}
            />

            <RuleSection 
                title="6. Consequences"
                content="Violation of these guidelines may result in:"
                listItems={[
                    "Temporary suspension of account access",
                    "Permanent account termination",
                    "Removal of submitted content",
                    "Reporting to relevant authorities if necessary",
                    "No refund of any paid services"
                ]}
            />
        </PolicyLayout>
    );
};

RuleSection.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    listItems: PropTypes.arrayOf(PropTypes.string)
};

RuleSection.defaultProps = {
    listItems: null
};

export default Rules;