import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FranceShoeSizeConverter = () => {
  const sizeData = {
    men: {
      UK: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      USA: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5],
      France: [40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47],
    },
    women: {
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
      USA: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      France: [35, 36, 37, 37.5, 38, 38.7, 39.3, 40, 40.5, 41, 42, 42.5, 43],
    },
  };

  const [category, setCategory] = useState("men");
  const [size, setSize] = useState("");
  const [toUnit, setToUnit] = useState("France");
  const [convertedSize, setConvertedSize] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleConversion = () => {
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    const fromIndex = sizeData[category]["UK"].indexOf(Number(size));
    if (fromIndex === -1) {
      toast.error("Invalid size selected.");
      return;
    }
    setConvertedSize(sizeData[category][toUnit][fromIndex]);
    setHighlightIndex(fromIndex);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`UK Size ${size} = ${convertedSize} ${toUnit}`);
    toast.success("Result copied to clipboard!");
  };

  const handleReset = () => {
    setSize("");
    setConvertedSize("");
    setHighlightIndex(null);
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
       <div className="flex flex-col max-w-4xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">France Shoe Size Converter</h1>

      
        <div className="flex flex-wrap gap-6">
          {/* Category Selector */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 font-medium">Category:</label>
            <select
              className="w-full p-2 border rounded"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                handleReset();
              }}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>

          {/* Size Selector */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 font-medium">UK Size:</label>
            <select className="w-full p-2 border rounded" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Select Size</option>
              {sizeData[category]["UK"].map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Convert To */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 font-medium">Convert To:</label>
            <select className="w-full p-2 border rounded" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {Object.keys(sizeData[category]).map(
                (unit, i) => unit !== "UK" && <option key={i} value={unit}>{unit}</option>
              )}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button onClick={handleConversion} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Convert
          </button>
         
        </div>

        {/* Result */}
        {convertedSize && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">
              UK Size {size} = <span className="text-red-500">{convertedSize} {toUnit}</span>
            </p>
            <button
              onClick={handleCopy}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Copy
            </button>
            <button onClick={handleReset} className="px-4 py-2 ms-3 bg-red-500 text-white rounded hover:bg-red-600">
            Reset
          </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(sizeData[category]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeData[category]["UK"].map((_, rowIndex) => (
              <tr key={rowIndex} className={highlightIndex === rowIndex ? "bg-yellow-200 font-bold" : ""}>
                {Object.values(sizeData[category]).map((sizes, colIndex) => (
                  <td key={colIndex} className="border p-2">{sizes[rowIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FranceShoeSizeConverter;
