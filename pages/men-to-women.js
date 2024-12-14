import { useState } from 'react';
import { Switch } from '@headlessui/react'; // For toggle switch
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ShoeSizeConverter = ({ content, locale }) => {
  const [gender, setGender] = useState('Men'); // Default gender
  const [sizeSystem, setSizeSystem] = useState('US'); // Default size system
  const [shoeSize, setShoeSize] = useState(''); // Selected shoe size
  const [showWomenSize, setShowWomenSize] = useState(false); // Toggle for Women's sizes

  // Shoe size data
  const shoeSizeData = {
    Men: {
      US: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      EU: [36, 36.5, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46],
      AUS: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      China: [36, 36.5, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46],
      Japan: [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30],
      CM: [22.1, 22.5, 22.9, 23.3, 23.7, 24.1, 24.5, 24.9, 25.3, 25.7, 26.1, 26.5, 26.9, 27.3, 27.7, 28.1, 28.5],
      Inches: [8.7, 8.9, 9, 9.2, 9.3, 9.5, 9.6, 9.8, 10, 10.1, 10.3, 10.4, 10.6, 10.8, 10.9, 11.1, 11.2],
    },
    Women: {
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      EU: [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42],
      AUS: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
      China: [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42],
      Japan: [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29],
      CM: [20.8, 21.3, 21.7, 22.2, 22.5, 22.9, 23.5, 23.8, 24.1, 24.5, 24.9, 25.3, 25.8, 26.2, 26.7],
      Inches: [8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2, 9.4, 9.5, 9.7, 9.8, 10, 10.2, 10.3, 10.5],
    },
  };

  const getConvertedSizes = () => {
    const sizes = shoeSizeData[gender][sizeSystem];
    const selectedIndex = sizes.indexOf(Number(shoeSize));
    if (selectedIndex === -1) return {};
    const results = {};
    Object.keys(shoeSizeData[gender]).forEach((system) => {
      results[system] = shoeSizeData[gender][system][selectedIndex];
    });
    return results;
  };

  const convertedSizes = getConvertedSizes();
  const womenConvertedSizes =
    gender === 'Men' && showWomenSize
      ? getConvertedSizes('Women')
      : {};

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">Shoe Size Converter</h2>

        {/* Controls */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-700">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Men">Men's</option>
              <option value="Women">Women's</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-700">Size System:</label>
            <select
              value={sizeSystem}
              onChange={(e) => setSizeSystem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(shoeSizeData[gender]).map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-700">Shoe Size:</label>
            <select
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a size
              </option>
              {shoeSizeData[gender][sizeSystem].map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          
        </div>
        <div className="flex items-center space-x-4 ms-auto">
            <Switch
              checked={showWomenSize}
              onChange={setShowWomenSize}
              className={`${
                showWomenSize ? 'bg-blue-500' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Show corresponding Women's Size</span>
              <span
                className={`${
                  showWomenSize ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <span className="text-sm font-medium text-gray-700">Show corresponding Women's Size</span>
          </div>
        {/* Results */}
        <div>
          <h3 className="text-lg font-bold mb-4">Your Size:</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(convertedSizes).map(([system, value]) => (
              <li key={system} className="text-center bg-gray-100 px-4 py-2 rounded-lg list-none">
                <strong>{system}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
        {showWomenSize && (
          <div>
            <h3 className="text-lg font-bold mt-6 mb-4">Women's Sizes:</h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(womenConvertedSizes).map(([system, value]) => (
                <li key={system} className="text-center bg-green-100 px-4 py-2 rounded-lg list-none">
                  <strong>{system}:</strong> {value}
                </li>
              ))}
            </ul>
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
    const contentResponse = await fetch(`https://shoes-converter.vercel.app/api/content?category=tagGenerator&language=${locale}`, {
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
export default ShoeSizeConverter;
