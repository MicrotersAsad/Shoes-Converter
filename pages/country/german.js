// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const GermanShoeSizeConverter = () => {
 
//   const [category, setCategory] = useState("women");
//   const [size, setSize] = useState("");
//   const [toUnit, setToUnit] = useState("Germany (EU) size");
//   const [convertedSize, setConvertedSize] = useState("");
//   const [highlightIndex, setHighlightIndex] = useState(null);


//   return (
//     <div className="container mx-auto max-w-5xl p-6">
//       <div className="p-6 bg-white border rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-4">
//           German Shoe Size Converter
//         </h1>

//         {/* Input Fields */}
//         <div className="flex gap-4 mb-4">
//           {/* Category Selector */}
//           <div className="flex-1">
//             <label className="block mb-2 font-medium">Category:</label>
//             <select
//               className="w-full p-2 border rounded"
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//                 handleReset();
//               }}
//             >
//               <option value="women">Women</option>
//               <option value="men">Men</option>
//             </select>
//           </div>

          

//           {/* Convert To */}
//           <div className="flex-1">
//             <label className="block mb-2 font-medium">Convert To:</label>
//             <select
//               className="w-full p-2 border rounded"
//               value={toUnit}
//               onChange={(e) => setToUnit(e.target.value)}
//             >
//               {Object.keys(sizeData[category]).map(
//                 (unit) =>
//                   unit !== "UK size" && (
//                     <option key={unit} value={unit}>
//                       {unit}
//                     </option>
//                   )
//               )}
//             </select>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={handleConversion}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Convert
//           </button>
//           <button
//             onClick={handleReset}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Reset
//           </button>
//         </div>

//         {/* Result */}
//         {convertedSize && (
//           <div className="mt-6 text-center">
//             <p className="text-xl font-semibold">
//               UK Size {size} ={" "}
//               <span className="text-red-500">
//                 {convertedSize} {toUnit}
//               </span>
//             </p>
//             <button
//               onClick={handleCopy}
//               className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               Copy Result
//             </button>
//           </div>
//         )}
//       </div>

    
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default GermanShoeSizeConverter;
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GermanShoeSizeConverter = () => {
    const sizeData = {
        women: {
          "UK size": [2.5, 3.5, 4, 5, 6, 6.5, 7, 8],
          "US size": [5, 5.5, 6, 7, 8, 8.5, 9, 10],
          "Germany (EU) size": [35, 36, 37, 38, 39, 40, 41, 43],
        },
        men: {
          "UK size": [6, 6.5, 7, 7.5, 8, 9.5, 10.5, 11, 12],
          "US size": [7, 7.5, 8, 8.5, 9, 10.5, 11.5, 12, 13],
          "Germany (EU) size": [39, 40, 41, 42, 43, 44, 45, 46, 47],
        },
      };
    
  const [category, setCategory] = useState("men");
  const [size, setSize] = useState("");
  const [toUnit, setToUnit] = useState("Germany (EU) size");
  const [convertedSize, setConvertedSize] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleConversion = () => {
    if (!size) {
      toast.error("Please select a UK size.");
      return;
    }
    const fromIndex = sizeData[category]["UK size"].indexOf(Number(size));
    if (fromIndex === -1) {
      toast.error("Invalid size selected.");
      return;
    }
    setConvertedSize(sizeData[category][toUnit][fromIndex]);
    setHighlightIndex(fromIndex);
  };

 

  const handleReset = () => {
    setSize("");
    setConvertedSize("");
    setHighlightIndex(null);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(`UK Size ${size} = ${convertedSize} ${toUnit}`);
    toast.success("Result copied to clipboard!");
  };


  return (
    <div className="container mx-auto max-w-7xl p-6">
       <div className="flex flex-col max-w-4xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">German Shoe Size Converter</h1>

      
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

      
      {/* UK Size Selector */}
      <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 font-medium">UK Size:</label>
            <select
              className="w-full p-2 border rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {sizeData[category]["UK size"].map((s, i) => (
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


      {/* Data Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(sizeData[category]).map((key) => (
                <th key={key} className="border p-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeData[category]["UK size"].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  highlightIndex === rowIndex ? "bg-yellow-200 font-bold" : ""
                }
              >
                {Object.values(sizeData[category]).map((sizes, colIndex) => (
                  <td key={colIndex} className="border p-2">
                    {sizes[rowIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    <ToastContainer/>
    </div>
  );
};

export default GermanShoeSizeConverter;
