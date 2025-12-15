import { BookOpen } from "lucide-react";

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
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">How It Works</li>
              <li className="hover:text-white cursor-pointer">Guidelines</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                Classic Literature
              </li>
              <li className="hover:text-white cursor-pointer">
                Science Fiction
              </li>
              <li className="hover:text-white cursor-pointer">Non-Fiction</li>
              <li className="hover:text-white cursor-pointer">Biography</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">
                Discussion Rooms
              </li>
              <li className="hover:text-white cursor-pointer">Book Clubs</li>
              <li className="hover:text-white cursor-pointer">Author Talks</li>
              <li className="hover:text-white cursor-pointer">Events</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © 2024 OpenShelf. All rights reserved. Built with ❤️ for book
            lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
