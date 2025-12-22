import { BookOpen, Users, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">About OpenShelf</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Building a community-driven digital library for students, educators, and book enthusiasts worldwide.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          OpenShelf was created with a simple yet powerful vision: to make knowledge accessible to everyone, everywhere. We believe that books have the power to transform lives, and everyone deserves access to quality literature regardless of their circumstances.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          By creating a community-driven platform, we empower readers to share, discover, and discuss books while fostering a global community of learners and thinkers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ValueCard
          icon={BookOpen}
          title="Knowledge Sharing"
          description="We believe in the free exchange of ideas and knowledge through literature."
        />
        <ValueCard
          icon={Users}
          title="Community First"
          description="Our platform thrives on the contributions and engagement of our members."
        />
        <ValueCard
          icon={Heart}
          title="Passion for Reading"
          description="We're driven by our love for books and the stories they tell."
        />
        <ValueCard
          icon={Target}
          title="Accessibility"
          description="Making quality literature available to everyone, everywhere."
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p className="leading-relaxed">
            OpenShelf began as a small project by a group of book lovers who wanted to create something meaningful. We noticed that many people struggled to access the books they needed for learning, whether due to cost, availability, or location.
          </p>
          <p className="leading-relaxed">
            Today, OpenShelf has grown into a thriving community where thousands of readers come together to share their favorite books, engage in thoughtful discussions, and discover new perspectives through literature.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Community</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Be part of a global community of readers, learners, and book enthusiasts.
        </p>
        <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Get Started Today
        </button>
      </div>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

