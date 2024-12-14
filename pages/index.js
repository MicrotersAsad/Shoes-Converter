
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoeSizeCalculator =({ content, locale }) => {
  const [category, setCategory] = useState('women'); // Default category
  const [fromUnit, setFromUnit] = useState('US & Canada'); // Default input unit
  const [toUnit, setToUnit] = useState('Europe'); // Default output unit
  const [size, setSize] = useState(''); // Selected size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight

  
  const shoeSizeData = {
    women: {
      title: "Women's Shoe Size Conversion",
      data: [
        { unit: 'US & Canada', sizes: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12] },
        { unit: 'UK', sizes: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] },
        { unit: 'Europe', sizes: ['35', '35', '35-36', '36', '36-37', '37', '37-38', '38', '38-39', '39', '39-40', '40', '40-41', '41', '41-42', '42', '42-43'] },
        { unit: 'Inches', sizes: [8.2, 8.3, 8.5, 8.8, 8.9, 9.1, 9.3, 9.4, 9.5, 9.7, 9.9, 10, 10.2, 10.3, 10.5, 10.7, 10.9] },
        { unit: 'Centimeters', sizes: [20.8, 21.3, 21.6, 22.2, 22.5, 23, 23.5, 23.8, 24.1, 24.6, 25.1, 25.4, 25.9, 26.2, 26.7, 27.1, 27.6] },
      ],
    },
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
    bigKids: {
        title: "Big Kids' Shoe Size Conversion (7–12 Years)",
        data: [
          { unit: 'US & Canada', sizes: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7] },
          { unit: 'UK', sizes: [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6] },
          { unit: 'Europe', sizes: ['35', '36', '36', '37', '37', '38', '38', '39'] },
          { unit: 'Inches', sizes: [8.6, 8.8, 9, 9.1, 9.3, 9.5, 9.6, 9.8] },
          { unit: 'Centimeters', sizes: [21.9, 22.2, 22.9, 23.2, 23.5, 24.1, 24.4, 24.8] },
        ],
      },
      littleKids: {
        title: "Little Kids' Shoe Size Conversion (4–7 Years)",
        data: [
          { unit: 'US & Canada', sizes: [10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3] },
          { unit: 'UK', sizes: [9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 1, 1.5, 2] },
          { unit: 'Europe', sizes: ['27', '28', '29', '30', '30', '31', '31', '32', '33', '33', '34', '34'] },
          { unit: 'Inches', sizes: [6.6, 6.8, 7, 7.1, 7.3, 7.5, 7.6, 7.8, 8, 8.1, 8.3, 8.5] },
          { unit: 'Centimeters', sizes: [16.8, 17.1, 17.8, 18.1, 18.4, 19.1, 19.4, 19.7, 20.3, 20.6, 21, 21.6] },
        ],
      },
      toddlers: {
        title: "Toddlers' Shoe Size Conversion (9 Months - 4 Years)",
        data: [
          { unit: 'US & Canada', sizes: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] },
          { unit: 'UK', sizes: [19, 19, 20, 20, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27] },
          { unit: 'Europe', sizes: ['2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'Inches', sizes: [4.3, 4.5, 4.6, 4.8, 5, 5.1, 5.3, 5.5, 5.6, 5.8, 6, 6.1, 6.3, 6.5] },
          { unit: 'Centimeters', sizes: [10.8, 11.4, 11.7, 12.1, 12.7, 13, 13.3, 14, 14.3, 14.6, 15.2, 15.6, 15.9, 16.5] },
        ],
      },
      infants: {
        title: "Infants' Shoe Size Conversion (0–9 Months)",
        data: [
          { unit: 'US & Canada', sizes: [0, 1, 1.5, 2, 2.5, 3] },
          { unit: 'UK', sizes: [0, 0.5, 1, 1, 1.5, 2] },
          { unit: 'Europe', sizes: ['15', '16', '17', '17', '18', '18'] },
          { unit: 'Inches', sizes: [3.1, 3.5, 3.6, 3.8, 4, 4.1] },
          { unit: 'Centimeters', sizes: [7.9, 8.9, 9.2, 9.5, 10.2, 10.5] },
        ],
      },
   
  };
  const categoryNames = {
    women: "Women's",
    men: "Men's",
    bigKids: "Big Kid's (7 - 12 years)",
    littleKids: "Little Kid's (4 - 7 years)",
    toddlers: "Toddlers' (9 months - 4 years)",
    infants: "Infants' (0 - 9 months)"
  };
  
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
  const handleReset = () => {
    setCategory('women'); // Default category
    setFromUnit('US & Canada'); // Default "From" unit
    setToUnit('Europe'); // Default "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
  };
  
  return (

    <div className='max-w-7xl mx-auto pb-5'> 

<div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
  {/* Title */}
  <h2 className="text-2xl font-bold text-gray-800 text-center">Shoe Size Calculator</h2>

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
          setHighlightIndex(null); // Reset highlight
          setConvertedSize(''); // Reset result
          setSize(''); // Reset size
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="women">Women's</option>
        <option value="men">Men's</option>
        <option value="bigKids">Big Kid's (7 - 12 years)</option>
        <option value="littleKids">Little Kid's (4 - 7 years)</option>
        <option value="toddlers">Toddlers' (9 month - 4 years)</option>
        <option value="infants">Infants' (0 - 9 months)</option>
      </select>
    </div>

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
          position: "top-center",
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
export default ShoeSizeCalculator;
