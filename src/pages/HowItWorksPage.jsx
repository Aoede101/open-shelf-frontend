import { UserPlus, Search, Upload, MessageSquare, Download, Star } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">How It Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Getting started with OpenShelf is easy. Follow these simple steps to join our community.
        </p>
      </div>

      <div className="space-y-8">
        <StepCard
          number="1"
          icon={UserPlus}
          title="Create Your Account"
          description="Sign up for free in seconds. All you need is an email address to get started."
          color="purple"
        />
        <StepCard
          number="2"
          icon={Search}
          title="Explore the Library"
          description="Browse thousands of books across multiple categories. Use our search and filter tools to find exactly what you're looking for."
          color="blue"
        />
        <StepCard
          number="3"
          icon={Upload}
          title="Share Your Books"
          description="Upload your favorite books to share with the community. Help others discover great literature."
          color="indigo"
        />
        <StepCard
          number="4"
          icon={Download}
          title="Download & Read"
          description="Download books in various formats. Read on any device, anytime, anywhere."
          color="purple"
        />
        <StepCard
          number="5"
          icon={Star}
          title="Review & Rate"
          description="Share your thoughts by writing reviews and rating books. Help others discover their next great read."
          color="blue"
        />
        <StepCard
          number="6"
          icon={MessageSquare}
          title="Join Discussions"
          description="Participate in book discussions, join book clubs, and connect with fellow readers."
          color="indigo"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureBox
            title="Smart Search"
            description="Find books by title, author, category, or keywords with our powerful search engine."
          />
          <FeatureBox
            title="AI Recommendations"
            description="Get personalized book recommendations based on your interests and reading history."
          />
          <FeatureBox
            title="Community Driven"
            description="Connect with readers worldwide, share insights, and discover new perspectives."
          />
          <FeatureBox
            title="Multiple Formats"
            description="Access books in PDF, EPUB, and other popular formats for maximum compatibility."
          />
          <FeatureBox
            title="Reading Lists"
            description="Create and manage your personal reading lists and track your progress."
          />
          <FeatureBox
            title="Free Forever"
            description="OpenShelf is completely free to use. No hidden fees, no subscriptions."
          />
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, icon: Icon, title, description, color }) {
  const colorClasses = {
    purple: 'bg-purple-600',
    blue: 'bg-blue-600',
    indigo: 'bg-indigo-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-6 hover:shadow-lg transition">
      <div className={`${colorClasses[color]} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold flex-shrink-0`}>
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <Icon className={`h-6 w-6 text-${color}-600`} />
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FeatureBox({ title, description }) {
  return (
    <div className="p-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
