import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IndiaToUSShoeSizeConverter = () => {
  const [category, setCategory] = useState('women'); // Default category: women
  const [toUnit, setToUnit] = useState('US'); // Default "To" unit
  const [size, setSize] = useState(''); // Selected India size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);

  const shoeSizeData = {
    categories: {
      women: {
        title: "Women's India to US Shoe Size Conversion",
        data: [
          { unit: 'India', sizes: ['2','2.5','3','3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11.5','13','14','15']},
          { unit: 'US', sizes: ['4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13','14','15','16','17'] },
          { unit: 'UK', sizes: ['2','2.5','3','3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11.5','13','14','15'] },
          { unit: 'Europe', sizes: ['35','35','35-36','36','36-37','37','37-38','38','38-39','39','39-40','40','40-41','41','41-42','42','42-43','45','46.5','48','49','50'] },
          { unit: 'CM', sizes: ['20.8','21.3','21.6','22.2','22.5','23','23.5','23.8','24.1','24.6','25.1','25.4','25.9','26.2','26.7','27.1','27.6','27.9','28.6','31.12','32.2','33'] },
          { unit: 'Inches', sizes: ['8.19','8.38','8.5','8.75','8.88','9.06','9.25','9.38','9.5','9.69','9.88','10','10.19','10.31','10.5','10.69','10.88','11','11.25','12.25','12.68','12.99'] },
        ],
      },
      men: {
        title: "Men's India to US Shoe Size Conversion",
        data: [
          { unit: 'India', sizes: ['5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12.5','13.5','14.5','15.5'] },
          { unit: 'US', sizes: ['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13','14','15','16'] },
          { unit: 'UK', sizes: ['5.5','6','6.5','7','7.5','8','8.5','9','9.45','10','10.5','11','11.5','12.5','13.5','14.5','15.5'] },
          { unit: 'Europe', sizes: ['39','39','40','40-41','41','41-42','42','42-43','43','43-44','44','44-45','45','46','47','48','49'] },
          { unit: 'CM', sizes: ['23.5','24.1','24.4','24.8','25.4','25.7','26','26.7','27','27.3','27.9','28.3','28.6','29.4','30.2','31','31.8'] },
          { unit: 'Inches', sizes: ['9.25','9.5','9.63','9.75','9.94','10.13','10.25','10.44','10.56','10.75','10.94','11.13','11.25','11.56','11.88','12.19','12.5'] },
        ],
      },
    },
  };

  const categoryNames = {
    women: "Women's",
    men: "Men's",
  };

  // Update default "To" unit when category changes
  useEffect(() => {
    const catData = shoeSizeData.categories[category].data;
    // Default "To" unit to "US" since focusing on India -> US conversions
    setToUnit('US');
    setSize('');
    setConvertedSize('');
    setHighlightIndex(null);
  }, [category]);

  const handleConversion = () => {
    if (!size) {
      toast.error('Please select an India size first.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const categoryData = shoeSizeData.categories[category].data;
    const fromRow = categoryData.find((row) => row.unit === 'India');

    if (!fromRow) {
      toast.error('India size data not found.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const fromIndex = fromRow.sizes.indexOf(size);

    if (fromIndex === -1) {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
      toast.error('Selected India size is invalid or not available.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setHighlightIndex(fromIndex);
    const toRow = categoryData.find((row) => row.unit === toUnit);
    if (!toRow) {
      setConvertedSize('Invalid "To" unit');
      toast.error(`Invalid "To" unit: ${toUnit}`, {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const result = toRow.sizes[fromIndex];
    if (!result) {
      setConvertedSize('No corresponding size found.');
      toast.error('No corresponding size found for the selected India size.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setConvertedSize(result);
  };

  const handleReset = () => {
    setCategory('women');
    setToUnit('US');
    setSize('');
    setConvertedSize('');
    setHighlightIndex(null);
  };

  const { title, data } = shoeSizeData.categories[category];

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">India to US Shoe Size Conversion</h2>

        <div className="flex flex-wrap gap-6">
          {/* Category Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              <option value="women">Women's</option>
              <option value="men">Men's</option>
            </select>
          </div>

          {/* India Size Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              India Size:
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              <option value="" disabled>Select an India size</option>
              {data.find((row) => row.unit === 'India')?.sizes.map((indiaSize, idx) => (
                <option key={idx} value={indiaSize}>
                  {indiaSize}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="toUnit" className="block mb-2 text-sm font-medium text-gray-700">
              To Unit:
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              {data.filter((row) => row.unit !== 'India').map((row, index) => (
                <option key={index} value={row.unit}>
                  {row.unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 border-b pb-2">
          <button
            onClick={handleConversion}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Convert Size
          </button>
         
        </div>

        {/* Result Display */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>{`India Size ${size} = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`India Size ${size} = ${convertedSize} ${toUnit}`);
                  toast.success('Copied to Clipboard!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }}
                className="px-4 py-2 ms-3 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none"
              >
                Copy
              </button>
              <button
            onClick={handleReset}
            className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Reset
          </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>

      {/* Data Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{title}</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              {data.map((row, index) => (
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
            {data[0].sizes.map((_, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {data.map((row, index) => (
                  <td
                    key={index}
                    className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                      highlightIndex === i && row.unit !== 'India' ? 'bg-blue-100 font-bold' : ''
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

export default IndiaToUSShoeSizeConverter;
