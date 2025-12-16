import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image, FileText } from 'lucide-react';
import { bookService } from '../services/bookService';

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Classic Literature',
    description: '',
  });
  const [coverFile, setCoverFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      
      if (coverFile) {
        formDataToSend.append('cover', coverFile);
      }
      
      if (bookFile) {
        formDataToSend.append('bookFile', bookFile);
      }

      await bookService.uploadBook(formDataToSend);
      navigate('/library');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">Upload a Book</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Book Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option>Classic Literature</option>
            <option>Science Fiction</option>
            <option>Romance</option>
            <option>Mystery</option>
            <option>Non-Fiction</option>
            <option>Biography</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
              id="cover-upload"
              required
            />
            <label htmlFor="cover-upload" className="cursor-pointer">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="max-h-48 mx-auto mb-4 rounded" />
              ) : (
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              )}
              <p className="text-gray-600">Click to upload cover image</p>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF (Max 5MB)</p>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Book File *</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition cursor-pointer">
            <input
              type="file"
              accept=".pdf,.epub"
              onChange={handleBookFileChange}
              className="hidden"
              id="book-upload"
              required
            />
            <label htmlFor="book-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {bookFile ? (
                <p className="text-green-600 mb-2">✓ {bookFile.name}</p>
              ) : (
                <p className="text-gray-600">Click to upload book file</p>
              )}
              <p className="text-sm text-gray-500 mt-2">PDF, EPUB (Max 50MB)</p>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>{loading ? 'Uploading...' : 'Upload Book'}</span>
        </button>
      </form>
    </div>
  );
}
