import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoeSizeCalculator =({ content, locale }) => {
  const [category, setCategory] = useState('men'); // Default category
  const [fromUnit, setFromUnit] = useState('US & Canada'); // Default input unit
  const [toUnit, setToUnit] = useState('Europe'); // Default output unit
  const [size, setSize] = useState(''); // Selected size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight

  // Shoe size data for Men's category
  const shoeSizeData = {
    men: {
      title: "Men's Shoe Size Conversion",
      data: [
        { unit: 'US & Canada', sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15, 16] },
        { unit: 'UK', sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5, 15.5] },
        { unit: 'Europe', sizes: ['39', '39', '40', '40-41', '41', '41-42', '42', '42-43', '43', '43-44', '44', '44-45', '45', '46', '47', '48', '49'] },
        { unit: 'Inches', sizes: [9.3, 9.5, 9.6, 9.8, 9.9, 10.1, 10.3, 10.4, 10.6, 10.8, 10.9, 11.1, 11.3, 11.6, 11.9, 12.2, 12.5] },
        { unit: 'Centimeters', sizes: [23.5, 24.1, 24.4, 24.8, 25.4, 25.7, 26, 26.7, 27, 27.3, 27.9, 28.3, 28.6, 29.4, 30.2, 31, 31.8] },
      ],
    },
  };

  const categoryNames = {
    men: "Men's",
  };

  // Handle size conversion
  const handleConversion = () => {
    const categoryData = shoeSizeData[category].data;
    const fromRow = categoryData.find((row) => row.unit === fromUnit);
    const fromIndex = fromRow.sizes.indexOf(Number(size));

    if (fromIndex !== -1) {
      setHighlightIndex(fromIndex); // Highlight the matching column
      const toRow = categoryData.find((row) => row.unit === toUnit);
      setConvertedSize(toRow.sizes[fromIndex]); // Display the conversion result
    } else {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
    }
  };

  // Reset all fields to default
  const handleReset = () => {
    setCategory('men'); // Default category
    setFromUnit('US & Canada'); // Default "From" unit
    setToUnit('Europe'); // Default "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">Men's Shoe Size Calculator</h2>

        {/* Input Fields */}
        <div className="flex flex-wrap gap-6">
          {/* From Unit */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="fromUnit" className="block mb-2 text-sm font-medium text-gray-700">
              From:
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                setSize(''); // Reset size
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {shoeSizeData[category].data.map((row, index) => (
                <option key={index} value={row.unit}>
                  {row.unit}
                </option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              Size:
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a size
              </option>
              {shoeSizeData[category]
                .data.find((row) => row.unit === fromUnit)
                .sizes.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>

          {/* To Unit */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="toUnit" className="block mb-2 text-sm font-medium text-gray-700">
              To:
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {shoeSizeData[category].data.map((row, index) => (
                <option key={index} value={row.unit}>
                  {row.unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 border-b pb-2">
          <button
            onClick={handleConversion}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Convert Size
          </button>
        </div>

        {/* Result */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>
                {`${categoryNames[category]} size `}
              </span>
              <span className="font-bold text-blue-600">
                {`${size} ${fromUnit}`}
              </span>
              <span>
                {` = ${categoryNames[category]} size `}
              </span>
              <span className="font-bold text-red-600">
                {`${convertedSize} ${toUnit}`}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${categoryNames[category]} size ${size} ${fromUnit} = ${categoryNames[category]} size ${convertedSize} ${toUnit}`
                );
                toast.success('Copied to Clipboard!', {
                  position: 'top-center',
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                });
              }}
              className="mt-4 px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Copy
            </button>
            <button
              onClick={handleReset}
              className="px-6 ms-3 py-2 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        )}

        <ToastContainer />
      </div>

      {/* Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{shoeSizeData[category].title}</h3>
      <div className="overflow-x-auto md:overflow-x-visible mt-4">
        <table className="w-full min-w-[500px] border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Unit</th>
              {shoeSizeData[category].data[0].sizes.map((_, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
                >
                  Size {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shoeSizeData[category].data.map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">{row.unit}</td>
                {row.sizes.map((size, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                      highlightIndex === i ? 'bg-blue-100 font-bold' : ''
                    }`}
                  >
                    {size}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
export default ShoeSizeCalculator;
