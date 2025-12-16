import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold">OpenShelf</span>
            </div>
            <p className="text-gray-400 text-sm">
              Building a community-driven digital library for students,
              educators, and book enthusiasts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link to="/guidelines" className="hover:text-white">Guidelines</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/library?category=Classic Literature" className="hover:text-white">Classic Literature</Link></li>
              <li><Link to="/library?category=Science Fiction" className="hover:text-white">Science Fiction</Link></li>
              <li><Link to="/library?category=Non-Fiction" className="hover:text-white">Non-Fiction</Link></li>
              <li><Link to="/library?category=Biography" className="hover:text-white">Biography</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/community" className="hover:text-white">Discussion Rooms</Link></li>
              <li><Link to="/book-clubs" className="hover:text-white">Book Clubs</Link></li>
              <li className="hover:text-white cursor-pointer">Author Talks</li>
              <li className="hover:text-white cursor-pointer">Events</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 OpenShelf. All rights reserved. Built with ❤️ for book lovers.</p>
        </div>
      </div>
    </footer>
  );
}
