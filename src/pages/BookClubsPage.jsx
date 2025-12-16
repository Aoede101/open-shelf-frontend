import { Users, Calendar, Book } from 'lucide-react';

export default function BookClubsPage() {
  const clubs = [
    {
      id: 1,
      name: 'Classic Literature Society',
      members: 156,
      currentBook: 'Pride and Prejudice',
      meetingDate: '2024-12-20',
      description: 'Exploring timeless classics and their impact on modern literature.',
    },
    {
      id: 2,
      name: 'Sci-Fi Enthusiasts',
      members: 203,
      currentBook: '1984',
      meetingDate: '2024-12-18',
      description: 'Diving into futuristic worlds and speculative fiction.',
    },
    {
      id: 3,
      name: 'Mystery Readers Unite',
      members: 89,
      currentBook: 'The Hound of the Baskervilles',
      meetingDate: '2024-12-22',
      description: 'Solving mysteries one book at a time.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">Book Clubs</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join a book club and connect with readers who share your interests.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{club.name}</h3>
            <p className="text-gray-600 mb-4">{club.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Users className="h-4 w-4 text-purple-600" />
                <span>{club.members} members</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Book className="h-4 w-4 text-purple-600" />
                <span>Currently reading: {club.currentBook}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span>Next meeting: {new Date(club.meetingDate).toLocaleDateString()}</span>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Join Club
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
