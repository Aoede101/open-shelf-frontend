import { Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Shield className="h-20 w-20 text-purple-600" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900">Community Guidelines</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Help us maintain a safe, respectful, and welcoming environment for all members.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Principles</h2>
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            OpenShelf is built on the foundation of respect, integrity, and the shared love of literature. Every member of our community plays a vital role in maintaining a positive environment.
          </p>
          <p className="leading-relaxed">
            By using OpenShelf, you agree to follow these guidelines and help us create a welcoming space for readers worldwide.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <GuidelineSection
          icon={CheckCircle}
          title="Do's"
          color="green"
          items={[
            "Share books that you have the right to distribute",
            "Write honest, constructive reviews",
            "Engage in respectful discussions",
            "Report inappropriate content or behavior",
            "Give credit to authors and creators",
            "Help new members feel welcome",
            "Use appropriate language in discussions",
            "Respect copyright and intellectual property",
          ]}
        />

        <GuidelineSection
          icon={XCircle}
          title="Don'ts"
          color="red"
          items={[
            "Upload copyrighted material without permission",
            "Share personal information of others",
            "Post spam, advertisements, or irrelevant content",
            "Harass, bully, or discriminate against others",
            "Use offensive or inappropriate language",
            "Create multiple accounts to manipulate ratings",
            "Share malicious files or links",
            "Impersonate other users or public figures",
          ]}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Copyright Notice</h3>
            <p className="text-gray-700 mb-3">
              OpenShelf respects copyright laws and intellectual property rights. Users are responsible for ensuring they have the right to share any content they upload.
            </p>
            <p className="text-gray-700">
              If you believe your copyrighted work has been uploaded without authorization, please contact us immediately with details, and we will investigate promptly.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Enforcement</h2>
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            Violations of these guidelines may result in:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Warning and request to correct behavior</li>
            <li>Temporary suspension of account</li>
            <li>Permanent ban from the platform</li>
            <li>Removal of content</li>
            <li>Legal action in severe cases</li>
          </ul>
          <p className="leading-relaxed mt-4">
            We review all reports carefully and take appropriate action based on the severity and frequency of violations.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
        <p className="text-gray-700 mb-6">
          If you have questions about these guidelines or need to report a violation, please contact us.
        </p>
        <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}

function GuidelineSection({ icon: Icon, title, color, items }) {
  const colorClasses = {
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Icon className={`h-8 w-8 ${colorClasses[color].split(' ')[0]}`} />
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Icon className={`h-5 w-5 ${colorClasses[color].split(' ')[0]} flex-shrink-0 mt-0.5`} />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

