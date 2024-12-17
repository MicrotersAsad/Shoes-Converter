import { useState } from "react";

const SheinShoeSizeChart = () => {
  const [category, setCategory] = useState("women"); // Default category
  const [region, setRegion] = useState("US"); // Default region
  const [selectedSize, setSelectedSize] = useState(""); // Selected shoe size
  const [filteredSizes, setFilteredSizes] = useState([]); // Filtered results

  // SHEIN Shoe Size Data
  const sizeData = {
    women: [
      { EU: 35.5, CN: 35, FootLength: "8.8", US: 5.5, UK: 3.5, BR: 33.5, MXJP: 22.5 },
      { EU: 36, CN: 36, FootLength: "9", US: 6, UK: 4, BR: 34, MXJP: 23 },
      { EU: 36.5, CN: 37, FootLength: "9.3", US: 6.5, UK: 4.5, BR: 35, MXJP: 23.5 },
      { EU: 37.5, CN: 38, FootLength: "9.4", US: 7, UK: 5, BR: 35.5, MXJP: 24 },
      { EU: 38, CN: 39, FootLength: "9.6", US: 7.5, UK: 5.5, BR: 36, MXJP: 24.5 },
      { EU: 39, CN: 40, FootLength: "9.8", US: 8, UK: 6, BR: 37, MXJP: 25 },
      { EU: 39.5, CN: 41, FootLength: "10", US: 8.5, UK: 6.5, BR: 37.5, MXJP: 25.5 },
      { EU: 40.5, CN: 42, FootLength: "10.2", US: 9, UK: 7, BR: 38, MXJP: 26 },
    ],
    men: [
      { EU: 38, CN: 39, FootLength: "9.6", US: 7, UK: 6, MX: 25, BR: 36, JP: 24.5 },
      { EU: 39, CN: 40, FootLength: "9.9", US: 7.5, UK: 6.5, MX: 25.5, BR: 37, JP: 25 },
      { EU: 40, CN: 41, FootLength: "10.1", US: 8, UK: 7, MX: 26, BR: 38, JP: 25.5 },
      { EU: 41, CN: 42, FootLength: "10.3", US: 9, UK: 7.5, MX: 26.5, BR: 39, JP: 26 },
      { EU: 42, CN: 44, FootLength: "10.6", US: 10, UK: 8.5, MX: 27.5, BR: 40, JP: 27 },
      { EU: 43, CN: 45, FootLength: "10.9", US: 10.5, UK: 9, MX: 28, BR: 41, JP: 27.5 },
      { EU: 44, CN: 46, FootLength: "11.1", US: 11, UK: 10, MX: 29, BR: 42, JP: 28 },
      { EU: 45, CN: 47, FootLength: "11.4", US: 12, UK: 11, MX: 29.5, BR: 43, JP: 28.5 },
    ],
  };

  // Get unique sizes for the selected region
  const getRegionSizes = () => {
    const currentData = sizeData[category];
    const uniqueSizes = [...new Set(currentData.map((row) => row[region]))];
    return uniqueSizes.filter((size) => size); // Exclude undefined values
  };

  // Filter sizes based on selected size
  const handleFilter = () => {
    const currentData = sizeData[category];
    const filtered = currentData.filter((row) => row[region]?.toString() === selectedSize);
    setFilteredSizes(filtered);
  };

  // Reset inputs and results
  const handleReset = () => {
    setSelectedSize("");
    setFilteredSizes([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          Shein Shoe Size Conversion Tool
        </h1>

        {/* Dropdown Selections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Category Selection */}
          <div>
            <label className="block mb-2 font-bold">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSelectedSize("");
                setFilteredSizes([]);
              }}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="women">Women's Shoes</option>
              <option value="men">Men's Shoes</option>
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label className="block mb-2 font-bold">Region</label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setSelectedSize("");
                setFilteredSizes([]);
              }}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="EU">EU</option>
              <option value="CN">CN</option>
              <option value="BR">BR</option>
              <option value="MXJP">MX/JP</option>
              <option value="JP">JP</option>
            </select>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block mb-2 font-bold">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Size</option>
              {getRegionSizes().map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center mb-6">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 mr-4"
          >
            Filter
          </button>
        
        </div>

        {/* Filtered Table */}
        {filteredSizes.length > 0 && (
            <>
           
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(filteredSizes[0]).map((key) => (
                  <th key={key} className="border px-4 py-2 capitalize">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSizes.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-100 text-center">
                  {Object.values(row).map((value, id) => (
                    <td key={id} className="border px-4 py-2">
                      {value || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-3">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
          >
            Reset
          </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SheinShoeSizeChart;
