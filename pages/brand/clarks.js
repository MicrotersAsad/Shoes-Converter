import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const ClarksShoeSizeConverter = ({ content, locale }) => {
  const [gender, setGender] = useState('Men'); // Default gender
  const [region, setRegion] = useState('US'); // Default region
  const [shoeSize, setShoeSize] = useState(''); // Selected shoe size
  const [convertedSizes, setConvertedSizes] = useState({}); // Resultant converted sizes
  const [copyMessage, setCopyMessage] = useState(''); // Copy confirmation message

  // Clarks shoe size data
  const clarksSizeData = {
    Men: {
      US: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      EU: [39, 40, 40.5, 41, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46],
      Inches: [9.3, 9.5, 9.7, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6],
    },
    Women: {
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],
      EU: [35, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5],
      Inches: [8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2, 9.4, 9.5, 9.7, 9.8],
    },
    Kids: {
      US: [3.5, 4, 4.5, 5, 5.5, 6],
      UK: [2.5, 3, 3.5, 4, 4.5, 5],
      EU: [34, 34.5, 35, 35.5, 36, 36.5],
      Inches: [8.5, 8.7, 8.8, 9, 9.2, 9.4],
    },
  };

  const handleConvert = () => {
    const sizes = clarksSizeData[gender][region];
    const index = sizes.indexOf(Number(shoeSize));
    if (index === -1) {
      setConvertedSizes({});
      return;
    }

    const results = {};
    Object.keys(clarksSizeData[gender]).forEach((key) => {
      results[key] = clarksSizeData[gender][key][index];
    });

    setConvertedSizes(results);
  };

  const handleCopy = (region, size) => {
    const textToCopy = `${region}: ${size}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyMessage(`Copied "${textToCopy}" to clipboard!`);
      setTimeout(() => setCopyMessage(''), 2000); // Clear message after 2 seconds
    });
  };

  return (
    <div className="max-w-7xl mx-auto ">
      
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-100 shadow-md rounded-lg">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
        Clarks Shoe Size Converter
      </h1>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region:</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="EU">EU</option>
            <option value="Inches">Inches</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shoe Size:</label>
          <select
            value={shoeSize}
            onChange={(e) => setShoeSize(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a size</option>
            {clarksSizeData[gender][region].map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleConvert}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          Convert Size
        </button>
      </div>

      {/* Results */}
      {Object.keys(convertedSizes).length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Converted Sizes:</h2>
          <table className="w-full border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Region</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(convertedSizes).map(([key, value]) => (
                <tr key={key} className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{key}</td>
                  <td className="border border-gray-300 px-4 py-2">{value}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleCopy(key, value)}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {copyMessage && (
            <div className="mt-4 text-green-600 text-center font-medium">{copyMessage}</div>
          )}
        </div>
      )}

      {Object.keys(convertedSizes).length === 0 && shoeSize && (
        <div className="mt-10 text-center text-red-600 font-semibold">
          Invalid size or conversion unavailable.
        </div>
      )}
    </div>
    <div className="content pt-6 pb-5">
        <article
          dangerouslySetInnerHTML={{ __html: content?.content || "No content available." }}
          style={{ listStyleType: "none" }}
        ></article>
      </div>
    </div>
  );
};
export async function getStaticProps({ locale }) {
  try {
    // Define the authorization token (you can replace this with an actual token)
    const AUTH_TOKEN = 'AZ-fc905a5a5ae08609ba38b046ecc8ef00';  // Replace with your token or fetch from an env variable

    // Fetch the content data with authorization header
    const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=tagGenerator&language=${locale}`, {
      method: 'GET',  // You can also specify POST, PUT, etc. if needed
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,  // Add Authorization header
        'Content-Type': 'application/json',       // Set Content-Type to JSON
      },
    });

    // Check if the response is successful (status 200)
    if (!contentResponse.ok) {
      throw new Error('Failed to fetch content');
    }

    const contentData = await contentResponse.json();

    // Fetch translations (static)
    const translations = await serverSideTranslations(locale, ['common', 'shoeSizeConverter']);

    return {
      props: {
        content: contentData?.translations?.[locale] || {},
        ...translations,
      },
      revalidate: 60 * 60 * 24,  // 24 hours revalidation
    };
  } catch (error) {
    console.error('Error fetching content:', error);

    // Return default content in case of error
    return {
      props: {
        content: {
          categoryLabel: 'Shoe Size Converter',
          sizeLabel: 'Select Shoe Size',
          // Add default values for other fields...
        },
        translations: await serverSideTranslations(locale, ['common', 'shoeSizeConverter']),
      },
    };
  }
}
export default ClarksShoeSizeConverter;
