import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SpanishShoeSizeConverter = () => {
  const [category, setCategory] = useState('women'); // Default category
  const [toUnit, setToUnit] = useState('UK'); // Default "To" unit
  const [size, setSize] = useState(''); // Selected size in Spanish (EU)
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight

  // Spanish Shoe size data
  const spanishShoeSizeData = {
    categories: {
      women: {
        title: "Women's Shoe Sizes - International Conversion",
        data: [
          { unit: 'Spanish (EU)', sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43'] },
          { unit: 'UK', sizes: ['2.55', '3.56', '4.57', '5.58', '6.59', '7.60', '8.61', '9.62', '10.63'] },
          { unit: 'US', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'CAN & AUS', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'EUR', sizes: ['35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5'] },
          { unit: 'JAP (cm)', sizes: ['22', '22.5', '23', '23.5', '24', '24.5', '25', '25.5', '26'] },
        ],
      },
      men: {
        title: "Men's Shoe Sizes - International Conversion",
        data: [
          { unit: 'Spanish (EU)', sizes: ['39', '40', '42', '43', '44', '45', '46', '47', '48'] },
          { unit: 'UK', sizes: ['6.57', '6.57', '7.58', '8.59', '9.51', '10.51', '11.12', '12.13', '13'] },
          { unit: 'US', sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'] },
          { unit: 'CAN & AUS', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'EUR', sizes: ['39', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5'] },
          { unit: 'JAP (cm)', sizes: ['24', '24.5', '25', '25.5', '26', '26.5', '27', '27.5', '28'] },
        ],
      },
    },
  };

  // Extract category names for display purposes
  const categoryNames = {
    women: "Women's",
    men: "Men's",
  };

  // Update "To" unit and reset states when category changes
  useEffect(() => {
    setToUnit(spanishShoeSizeData.categories[category].data[1].unit); // Default "To" unit as first "To" unit
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

    const categoryData = spanishShoeSizeData.categories[category].data;
    const fromRow = categoryData.find((row) => row.unit === 'Spanish (EU)');

    if (!fromRow) {
      toast.error(`Spanish (EU) data not found for category: ${category}`, {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const fromIndex = fromRow.sizes.indexOf(size);

    if (fromIndex !== -1) {
      setHighlightIndex(fromIndex); // Highlight the matching column
      const toRow = categoryData.find((row) => row.unit === toUnit);
      if (toRow && toRow.sizes[fromIndex]) {
        setConvertedSize(toRow.sizes[fromIndex]); // Display the conversion result
      } else {
        setConvertedSize('Invalid "To" unit');
        toast.error(`Invalid "To" unit: ${toUnit}`, {
          position: 'top-center',
          autoClose: 2000,
        });
      }
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
    setCategory('women'); // Default category
    setToUnit(spanishShoeSizeData.categories['women'].data[1].unit); // Reset "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">Spanish Shoe Size Converter</h2>

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
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="women">Women's</option>
              <option value="men">Men's</option>
            </select>
          </div>

          {/* Size */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              Size (Spanish EU):
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
              {spanishShoeSizeData.categories[category].data
                .find((row) => row.unit === 'Spanish (EU)')
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
              {spanishShoeSizeData.categories[category].data
                .filter((row) => row.unit !== 'Spanish (EU)')
                .map((row, index) => (
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
         
        </div>

        {/* Result */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>{`Size ${size} Spanish (EU) = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Size ${size} Spanish (EU) = ${convertedSize} ${toUnit}`);
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

              <button
            onClick={handleReset}
            className="px-6 py-2 ms-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Reset
          </button>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>

      {/* Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{spanishShoeSizeData.categories[category].title}</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              {spanishShoeSizeData.categories[category].data.map((row, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
                >
                  {row.unit}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spanishShoeSizeData.categories[category].data[0].sizes.map((_, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {spanishShoeSizeData.categories[category].data.map((row, index) => (
                  <td
                    key={index}
                    className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                      highlightIndex === i && row.unit !== 'Spanish (EU)' ? 'bg-blue-100 font-bold' : ''
                    }`}
                  >
                    {row.sizes[i] !== '-' ? row.sizes[i] : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpanishShoeSizeConverter;
