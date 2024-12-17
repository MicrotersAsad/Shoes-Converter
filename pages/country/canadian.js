// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CanadianShoeSizeConverter = () => {
//   // Shoe Size Data
//   const shoeSizeData = {
//     women: {
//       CANADA_US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
//       EUROPE: ["35-36", "36", "36-37", "37", "37-38", "38", "38-39", "39", "39-40", "40", "40-41", "41", "41-42", "42", "42-43"],
//       UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
//       AU_BLUNDSTONE: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
//       CM: [21.6, 22.2, 22.5, 23, 23.5, 23.8, 24.1, 24.6, 25.1, 25.4, 25.9, 26.2, 26.7, 27.1, 27.6],
//     },
//     men: {
//       CANADA_US: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15, 16],
//       EUROPE: ["40", "40-41", "41", "41-42", "42", "42-43", "43", "43-44", "44", "44-45", "45", "46", "47", "48", "49"],
//       UK: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5, 15.5],
//       AU_BLUNDSTONE: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14, 15],
//       CM: [24.6, 24.8, 25.4, 25.7, 26.2, 26.7, 27, 27.1, 27.9, 28.3, 28.6, 29.4, 30.2, 31, 31.8],
//     },
//     youth: {
//       CANADA_US: [13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
//       EUROPE: ["31", "31", "32", "33", "33", "34", "34", "35", "36", "36", "37", "37", "38", "38", "39"],
//       UK: [12, 12.5, 13, 14, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
//       AU_BLUNDSTONE: [12, 12.5, 13, 14, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
//       CM: [19.1, 19.4, 19.7, 20.3, 20.6, 21, 21.6, 21.9, 22.2, 22.9, 23.2, 23.5, 24.1, 24.4, 24.8],
//     },
//   };

//   // States
//   const [category, setCategory] = useState("women");
//   const [size, setSize] = useState("");
//   const [toUnit, setToUnit] = useState("EUROPE");
//   const [convertedSize, setConvertedSize] = useState("");

//   const handleConversion = () => {
//     if (!size) {
//       toast.error("Please select a size first.");
//       return;
//     }
//     const fromIndex = shoeSizeData[category]["CANADA_US"].indexOf(Number(size));
//     const result = shoeSizeData[category][toUnit][fromIndex];
//     setConvertedSize(result);
//   };

//   return (
//     <div className="container mx-auto max-w-5xl p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold text-center mb-4">Canadian Shoe Size Converter</h1>

    //   {/* Category Selector */}
    //   <div className="mb-4">
    //     <label className="block mb-2 font-medium">Category:</label>
    //     <select
    //       className="w-full p-2 border rounded"
    //       value={category}
    //       onChange={(e) => {
    //         setCategory(e.target.value);
    //         setConvertedSize("");
    //         setSize("");
    //       }}
    //     >
    //       <option value="women">Women</option>
    //       <option value="men">Men</option>
    //       <option value="youth">Youth</option>
    //     </select>
    //   </div>

//       {/* Input Selector */}
//       <div className="flex gap-4 mb-6">
//         <div className="flex-1">
//           <label className="block mb-2 font-medium">Canada/US Size:</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//           >
//             <option value="">Select Size</option>
//             {shoeSizeData[category]["CANADA_US"].map((s, i) => (
//               <option key={i} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex-1">
//           <label className="block mb-2 font-medium">Convert To:</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={toUnit}
//             onChange={(e) => setToUnit(e.target.value)}
//           >
//             {Object.keys(shoeSizeData[category]).map((unit, i) => (
//               unit !== "CANADA_US" && (
//                 <option key={i} value={unit}>
//                   {unit.replace("_", " ")}
//                 </option>
//               )
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Buttons */}
//       <button
//         onClick={handleConversion}
//         className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Convert
//       </button>

//       {/* Result */}
//       {convertedSize && (
//         <div className="mt-4 text-center text-lg font-semibold">
//           Converted Size: <span className="text-red-500">{convertedSize}</span>
//         </div>
//       )}

//       <ToastContainer />

//       {/* Full Table */}
//       <h2 className="text-xl font-bold mt-6 mb-4 text-center">Size Conversion Table</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border">
//           <thead>
//             <tr className="bg-gray-200">
//               {Object.keys(shoeSizeData[category]).map((unit, i) => (
//                 <th key={i} className="border p-2">{unit.replace("_", " ")}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {shoeSizeData[category]["CANADA_US"].map((_, index) => (
//               <tr key={index} className={index % 2 ? "bg-gray-100" : "bg-white"}>
//                 {Object.values(shoeSizeData[category]).map((sizes, i) => (
//                   <td key={i} className="border p-2 text-center">
//                     {sizes[index]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CanadianShoeSizeConverter;
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CanadianShoeSizeConverter = () => {
  const shoeSizeData = {
    women: {
      CANADA_US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      EUROPE: ["35-36", "36", "36-37", "37", "37-38", "38", "38-39", "39", "39-40", "40", "40-41", "41", "41-42", "42", "42-43"],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      AU_BLUNDSTONE: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
      CM: [21.6, 22.2, 22.5, 23, 23.5, 23.8, 24.1, 24.6, 25.1, 25.4, 25.9, 26.2, 26.7, 27.1, 27.6],
    },
    men: {
        CANADA_US: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15, 16],
        EUROPE: ["40", "40-41", "41", "41-42", "42", "42-43", "43", "43-44", "44", "44-45", "45", "46", "47", "48", "49"],
        UK: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5, 15.5],
        AU_BLUNDSTONE: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14, 15],
        CM: [24.6, 24.8, 25.4, 25.7, 26.2, 26.7, 27, 27.1, 27.9, 28.3, 28.6, 29.4, 30.2, 31, 31.8],
      },
      youth: {
        CANADA_US: [13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
        EUROPE: ["31", "31", "32", "33", "33", "34", "34", "35", "36", "36", "37", "37", "38", "38", "39"],
        UK: [12, 12.5, 13, 14, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
        AU_BLUNDSTONE: [12, 12.5, 13, 14, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
        CM: [19.1, 19.4, 19.7, 20.3, 20.6, 21, 21.6, 21.9, 22.2, 22.9, 23.2, 23.5, 24.1, 24.4, 24.8],
      },
  };

  
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [category, setCategory] = useState("women");
  const [size, setSize] = useState("");
  const [toUnit, setToUnit] = useState("EUROPE");
  const [convertedSize, setConvertedSize] = useState("");
  const handleConversion = () => {
    if (!size) {
      toast.error("Please select a size first.");
      return;
    }
    const fromIndex = shoeSizeData[category]["CANADA_US"].indexOf(Number(size));
    const result = shoeSizeData[category][toUnit][fromIndex];
    setConvertedSize(result);
    setHighlightIndex(fromIndex);
  };

  const handleReset = () => {
    setSize("");
    setConvertedSize("");
    setHighlightIndex(null);
    toast.info("Selections reset.");
  };

  const handleCopy = () => {
    const text = `Canada/US Size ${size} = ${convertedSize} ${toUnit}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Canadian Shoe Size Converter</h1>
      <div className="flex flex-col max-w-4xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
     
      {/* Selectors */}
      <div className="flex flex-wrap gap-6">
         {/* Category Selector */}
         <div className="flex-1 min-w-[200px]">
        <label className="block mb-2 font-medium">Category:</label>
        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setConvertedSize("");
            setSize("");
          }}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="youth">Youth</option>
        </select>
      </div>
      <div className="flex-1 min-w-[200px]">
          <label className="block mb-2 font-medium">Canada/US Size:</label>
          <select
            className="w-full p-2 border rounded"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {shoeSizeData[category]["CANADA_US"].map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-2 font-medium">Convert To:</label>
          <select
            className="w-full p-2 border rounded"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {Object.keys(shoeSizeData[category]).map(
              (unit) => unit !== "CANADA_US" && <option key={unit} value={unit}>{unit}</option>
            )}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleConversion}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Convert
        </button>
      
      </div>

      {/* Result */}
      {convertedSize && (
        <div className="text-center mb-4">
          <p className="text-xl font-semibold">
            Canada/US Size {size} ={" "}
            <span className="text-red-500">
              {convertedSize} {toUnit}
            </span>
          </p>
         <div className="mt-3">
         <button
          onClick={handleCopy}
          className="px-4 py-2 shadow bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!convertedSize}
        >
          Copy
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 ms-3 shadow bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reset
        </button>
         </div>
        </div>
      )}

      <ToastContainer />
</div>
      {/* Conversion Table */}
      <h2 className="text-xl font-bold mt-6 mb-4 text-center">Size Conversion Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(shoeSizeData[category]).map((unit, i) => (
                <th key={i} className="border p-2">
                  {unit.replace("_", " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shoeSizeData[category]["CANADA_US"].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  highlightIndex === rowIndex ? "bg-yellow-200 font-bold" : rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                }
              >
                {Object.values(shoeSizeData[category]).map((sizes, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border p-2 ${
                      highlightIndex === rowIndex ? "bg-yellow-200 font-bold" : ""
                    }`}
                  >
                    {sizes[rowIndex]}
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

export default CanadianShoeSizeConverter;
