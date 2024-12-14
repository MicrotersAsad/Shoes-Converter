import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrazilianShoeSizeConverter = () => {
  const [category, setCategory] = useState('men'); // Default category
  const [toUnit, setToUnit] = useState('US & Canada'); // Default output unit
  const [size, setSize] = useState(''); // Selected size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight

  // Shoe size data for Men's, Women's, and Kids' categories
  const shoeSizeData = {
    men: {
      title: "Men's Brazilian Shoe Size Conversion",
      data: [
        { unit: 'Brazil', sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
        { unit: 'US & Canada', sizes: [7,7.5,8,8.5,9,10.5,11.5,12.5,14] },
        { unit: 'UK', sizes: [6.5	,7	,7.5	,8	,8.5	,10	,11	,12	,13.5] },
        { unit: 'EU', sizes: [39	,40	,41	,42	,43	,44	,45	,46.5	,48.5] },
      ],
    },
    women: {
      title: "Women's Brazilian Shoe Size Conversion",
      data: [
        { unit: 'Brazil', sizes: [34, 35, 36, 37, 38, 39, 40, 41] },
        { unit: 'US & Canada', sizes: [8.5,	9	,9.5	,10	,10.5	,12	,13	,14	,15.5] },
        { unit: 'UK', sizes: [6	,6.5	,7	,7.5	,8	,9.5	,10.5	,11.5	,13] },
        { unit: 'EU', sizes: [39	,40	,41	,42	,43	,44	,45	,46.5	,48.5] },
      ],
    },
  };

  const categoryNames = {
    men: "Men's",
    women: "Women's",
  };

  const handleConversion = () => {
    const categoryData = shoeSizeData[category].data;
    const fromRow = categoryData.find((row) => row.unit === 'Brazil');
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
    setCategory('men'); // Default category
    setToUnit('US & Canada'); // Default "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">Brazilian Shoe Size Converter</h2>

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
              <option value="men">Men's</option>
              <option value="women">Women's</option>
            </select>
          </div>

          {/* Fixed From Unit */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 text-sm font-medium text-gray-700">From:</label>
            <div className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
              Brazil
            </div>
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
                .data.find((row) => row.unit === 'Brazil')
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
        </div>

        {/* Result */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>
                {`${categoryNames[category]} size `}
              </span>
              <span className="font-bold text-blue-600">
                {`${size} Brazil`}
              </span>
              <span>
                {` = size `}
              </span>
              <span className="font-bold text-red-600">
                {`${convertedSize} ${toUnit}`}
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${categoryNames[category]} size ${size} Brazil = size ${convertedSize} ${toUnit}`
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
              className="px-6 ms-2 py-2 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
    </div>
  );
};

export default BrazilianShoeSizeConverter;
