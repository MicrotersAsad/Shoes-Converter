import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Layout from './layout';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';

Modal.setAppElement('#__next');

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // এই URL এ আমাদের লোকাল এক্সপ্রেস সার্ভার চলছে
  const BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/images`);
        console.log(response);
        
        const data = await response.json();
        console.log(data);
        
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFile(null);
    setTitle('');
    setMessage('');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);   // ব্যাকএন্ডে upload.single('file')
    formData.append('title', title);

    try {
      const response = await fetch(`${BASE_URL}/images`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        // নতুন আপলোড হওয়া ইমেজকে লিস্টে অ্যাড করে নিই
        setImages((prev) => [...prev, data.data]);
        closeModal();
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (imageId) => {
    console.log(`Deleting image with id: ${imageId}`);
    try {
      const response = await fetch(`${BASE_URL}/images/${imageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        // সফল হলে ফ্রন্টএন্ডের লিস্ট থেকে রিমুভ
        setImages((prev) => prev.filter((img) => img._id !== imageId));
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  // লোকাল সার্ভার থেকে আপলোডের জন্য ইমেজ URL তৈরি
  // (ব্যাকএন্ডে app.use('/uploads', express.static('uploads'))
  const getImageUrl = (filename) => {
    return `${BASE_URL}/uploads/${filename}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Media List</h1>
        <button onClick={openModal} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">
          Create
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/12 py-2 px-4">SL</th>
                <th className="w-2/12 py-2 px-4">File</th>
                <th className="w-4/12 py-2 px-4">Local Path</th>
                <th className="w-3/12 py-2 px-4">Title</th>
                <th className="w-2/12 py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image, index) => {
                const localUrl = getImageUrl(image.filename);
                return (
                  <tr key={image._id} className="text-gray-700">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      {/* Next.js Image কম্পোনেন্ট */}
                      <Image 
                        src={localUrl} 
                        alt={image.title} 
                        width={64} 
                        height={64} 
                        style={{ objectFit: 'cover' }}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <a href={localUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {localUrl}
                      </a>
                    </td>
                    <td className="border px-4 py-2">{image.title}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(image._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Upload Image"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              maxWidth: '500px',
              width: '100%',
            },
          }}
        >
          <h2 className="text-2xl font-bold mb-4">Upload Image</h2>
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700 font-bold mb-2">
                Upload Image File
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload Image
            </button>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
          <button onClick={closeModal} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">
            Close
          </button>
        </Modal>
      </div>
    </Layout>
  );
}
