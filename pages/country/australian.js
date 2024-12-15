import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AustralianShoeSizeConverter = ({ content, locale }) => {
  const [category, setCategory] = useState('men'); // Default category
  const [toUnit, setToUnit] = useState('US'); // Default output unit
  const [size, setSize] = useState(''); // Selected size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight
  const [fromUnit, setFromUnit] = useState('AU'); // Derived from category

  // Shoe size data for various categories
  const shoeSizeData = {
    women: {
      title: "Women's Shoe Size Conversion",
      data: [
        { unit: 'Centimeters', sizes: [21.6, 22.2, 23.0, 23.4, 23.8, 24.6, 25.1, 25.8, 26.5, 27.1, 27.8, 28.4, 29.0, 29.6] },
        { unit: 'Europe', sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'] },
        { unit: 'AU', sizes: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
        { unit: 'US', sizes: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
        { unit: 'UK', sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5] },
      ],
    },
    men: {
      title: "Men's Shoe Size Conversion",
      data: [
        { unit: 'Centimeters', sizes: [26.3, 26.7, 27.4, 28.0, 28.8, 29.2, 29.6, 30.0, 30.5, 31.3, 32.2, 32.7, 33.3, 34.0, 34.5, 35.0, 35.5, 36.0, 36.5, 37.0] },
        { unit: 'Europe', sizes: ['39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58'] },
        { unit: 'US', sizes: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25] },
        { unit: 'AU', sizes: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] },
        { unit: 'UK', sizes: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] },
      ],
    },
    baby: {
      title: "Baby Size Guide (EU15 - 24) Pre Walking",
      data: [
        { unit: 'Centimeters', sizes: [8.4, 9.0, 9.8, 10.4, 11.1, 11.8, 12.5, 13.2, 13.9, 14.5] },
        { unit: 'Europe', sizes: ['15', '-', '16', '17', '18', '19', '20', '21', '22', '23'] },
        { unit: 'US', sizes: ['-', '-', '0', '1', '2', '3', '4', '5', '6', '7'] },
        { unit: 'AU', sizes: ['-', '-', '1', '2', '3', '4', '5', '6', '7', '8'] },
        { unit: 'UK', sizes: ['-', '-', '1', '2', '3', '4', '5', '6', '7', '8'] },
      ],
    },
    toddler: {
      title: "Toddlers' Shoe Size Conversion (EU22 - 35) Walking - 3 Yrs",
      data: [
        { unit: 'Centimeters', sizes: [13.3, 14.0, 14.6, 14.9, 15.3, 15.9, 16.0, 16.6, 16.7, 17.0, 17.3, 17.6, 18.0, 18.3, 18.6, 19.3, 20.0, 20.3, 20.7, 21.0, 21.4, 22.1, 22.4, 22.8] },
        { unit: 'Europe', sizes: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'] },
        { unit: 'US', sizes: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28] },
        { unit: 'AU', sizes: [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16] },
        { unit: 'UK', sizes: [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16] },
      ],
    },
    youngKids: {
      title: "Young Kids Size Guide (EU25 - 40) 3 - 8 Yrs",
      data: [
        { unit: 'Centimeters', sizes: [15.3, 15.9, 16.0, 16.6, 16.7, 17.0, 17.3, 17.6, 18.0, 18.3, 18.6, 19.3, 20.0, 20.3, 20.7, 21.0, 21.4, 22.1, 22.4, 22.8, 23.1, 23.5, 23.8, 24.2, 24.5, 24.9, 25.3, 25.6, 25.9] },
        { unit: 'Europe', sizes: ['25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'] },
        { unit: 'US', sizes: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
        { unit: 'AU', sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] },
        { unit: 'UK', sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] },
      ],
    },
    olderKids: {
      title: "Older Kids Size Guide (EU33 - 43) 8+ Yrs",
      data: [
        { unit: 'Centimeters', sizes: [20.7, 21.3, 21.6, 21.9, 22.0, 22.2, 22.7, 23.0, 23.1, 23.4, 23.5, 23.7, 23.8, 24.1, 24.5, 24.8, 25.1, 25.3, 25.6, 25.9, 26.3, 26.7, 27.0, 27.3, 27.6, 27.9, 28.0, 28.4, 28.5, 28.6, 28.8, 29.0, 29.2, 29.6, 30.0, 30.5] },
        { unit: 'Europe', sizes: ['33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'] },
        { unit: 'US', sizes: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { unit: 'AU', sizes: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6] },
        { unit: 'UK', sizes: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6] },
      ],
    },
  };

  const categoryNames = {
    women: "Women's",
    men: "Men's",
    baby: "Baby's",
    toddler: "Toddlers'",
    youngKids: "Young Kids'",
    olderKids: "Older Kids'",
  };

  // Mapping of category to "From" unit
  const fromUnits = {
    women: 'AU', // Assuming AU as default for Women
    men: 'AU',
    baby: 'AU',
    toddler: 'AU',
    youngKids: 'AU',
    olderKids: 'AU',
  };

  // Update "From" unit when category changes
  useEffect(() => {
    setFromUnit(fromUnits[category]);
    setToUnit('US'); // Reset "To" unit to default when category changes
    setSize(''); // Reset size when category changes
    setConvertedSize(''); // Reset conversion result
    setHighlightIndex(null); // Reset highlight
  }, [category]);

  const handleConversion = () => {
    if (!size) {
      toast.error('Please select a size.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const categoryData = shoeSizeData[category].data;
    const fromRow = categoryData.find((row) => row.unit === fromUnit);
    const fromIndex = fromRow.sizes.indexOf(parseFloat(size));

    if (fromIndex !== -1) {
      setHighlightIndex(fromIndex); // Highlight the matching column
      const toRow = categoryData.find((row) => row.unit === toUnit);
      setConvertedSize(toRow.sizes[fromIndex]); // Display the conversion result
    } else {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
      toast.error('Selected size is invalid or not available.', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  const handleReset = () => {
    setCategory('men'); // Default category
    setToUnit('US'); // Default "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
  };

  return (
    <div className="max-w-7xl mx-auto pb-5 ps-3 pe-3">
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">Australian Shoe Size Converter</h2>

        {/* Input Fields */}
        <div className="flex flex-wrap gap-6">
          {/* Category */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                // The useEffect will handle resetting related states
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="women">Women's</option>
              <option value="men">Men's</option>
              <option value="baby">Baby</option>
              <option value="toddler">Toddlers'</option>
              <option value="youngKids">Young Kids'</option>
              <option value="olderKids">Older Kids'</option>
            </select>
          </div>

          {/* Fixed From Unit */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-700">From:</label>
            <div className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
              {fromUnit}
            </div>
          </div>

          {/* Size */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              Size ({fromUnit}):
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
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Convert Size
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>

        {/* Result */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>{`${categoryNames[category]} size ${size} ${fromUnit} = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${categoryNames[category]} size ${size} ${fromUnit} = size ${convertedSize} ${toUnit}`
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
                className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>

      {/* Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{shoeSizeData[category].title}</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Unit</th>
              {shoeSizeData[category].data
                .find((row) => row.unit === fromUnit)
                .sizes.map((_, index) => (
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
                {row.sizes.map((sizeItem, i) => (
                  <td
                    key={i}
                    className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                      highlightIndex === i ? 'bg-blue-100 font-bold' : ''
                    }`}
                  >
                    {sizeItem !== '-' ? sizeItem : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      {/* Content Section */}
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
    const AUTH_TOKEN = 'AZ-fc905a5a5ae08609ba38b046ecc8ef00'; // Replace with your token or fetch from an env variable

    // Fetch the content data with authorization header
    const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=tagGenerator&language=${locale}`, {
      method: 'GET', // You can also specify POST, PUT, etc. if needed
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`, // Add Authorization header
        'Content-Type': 'application/json', // Set Content-Type to JSON
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
      revalidate: 60 * 60 * 24, // 24 hours revalidation
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

export default AustralianShoeSizeConverter;
