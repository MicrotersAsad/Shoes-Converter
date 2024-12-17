import { useState } from "react";

const ShimanoShoeSizeChart = () => {
  const [gender, setGender] = useState("mens");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState([]);

  // Shimano Shoe Size Data
  const sizeData = {
    mens: [
      { EU: 33, US: "1.5", CM: 20.4 },
      { EU: 34, US: "2.5", CM: 21.1 },
      { EU: 35, US: "3", CM: 21.8 },
      { EU: 36, US: "4", CM: 22.4 },
      { EU: 37, US: "4.5-5", CM: 23.2 },
      { EU: 38, US: "5.5", CM: 23.8 },
      { EU: 39, US: "5.5-6", CM: 24.2 },
      { EU: 40, US: "6.5", CM: 24.9 },
      { EU: 41, US: "7.5", CM: 25.8 },
      { EU: 42, US: "8.5", CM: 26.2 },
      { EU: 43, US: "9", CM: 27.2 },
      { EU: 44, US: "10", CM: 27.8 },
      { EU: 45, US: "10-10.5", CM: 28.2 },
      { EU: 46, US: "11", CM: 28.5 },
      { EU: 47, US: "12", CM: 30.1 },
      { EU: 48, US: "12.5", CM: 31.1 },
    ],
    womens: [
      { EU: 36, US: "5", CM: 22.4 },
      { EU: 37, US: "5.5", CM: 23.2 },
      { EU: 37.5, US: "6", CM: 23.5 },
      { EU: 38, US: "6.5", CM: 24.0 },
      { EU: 38.5, US: "6.5-7", CM: 24.2 },
      { EU: 39, US: "7.5", CM: 24.5 },
      { EU: 40, US: "8", CM: 25.2 },
      { EU: 41, US: "8.5-9", CM: 25.8 },
      { EU: 42, US: "9.5", CM: 26.2 },
      { EU: 43, US: "10", CM: 27.2 },
      { EU: 44, US: "11", CM: 27.8 },
    ],
  };

  const handleConvert = () => {
    const selectedData = sizeData[gender];
    const matchedSizes = selectedData.filter((row) => row.US === shoeSize);
    setConvertedSizes(matchedSizes.length > 0 ? matchedSizes : []);
  };

  const handleReset = () => {
    setGender("mens");
    setShoeSize("");
    setConvertedSizes([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white max-w-5xl mx-auto shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Shimano Shoe Size Conversion
        </h1>

        {/* Gender and Size Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-bold">Select Category</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="mens">Men</option>
              <option value="womens">Women</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold">Select US Size</label>
            <select
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Choose Size</option>
              {sizeData[gender].map((row, idx) => (
                <option key={idx} value={row.US}>
                  {row.US}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-9">
            <button
              onClick={handleConvert}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              Convert
            </button>
          </div>
        </div>

        {/* Converted Sizes Table */}
        {convertedSizes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Converted Sizes</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border px-4 py-2">EU</th>
                  <th className="border px-4 py-2">US</th>
                  <th className="border px-4 py-2">CM</th>
                </tr>
              </thead>
              <tbody>
                {convertedSizes.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="border px-4 py-2 text-center">{row.EU}</td>
                    <td className="border px-4 py-2 text-center">{row.US}</td>
                    <td className="border px-4 py-2 text-center">{row.CM}</td>
                  </tr>
                ))}
              </tbody>
            </table>
             {/* Reset Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
          >
            Reset
          </button>
        </div>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default ShimanoShoeSizeChart;
