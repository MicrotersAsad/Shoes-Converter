// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PhilippinesShoeSizeConverter = () => {
//   const sizeData = {
//     women: {
//       "US/PH": [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
//       "Australia": [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5],
//       "UK": [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8.5],
//       "Europe": ["35-36", 36, "36-37", 37, "37-38", 38, "38-39", 39, "39-40", 40, "40-41", "41-42"],
//       "Japan": [21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27.5],
//     },
//     men: {
//       "US/PH": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
//       "Australia": [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5],
//       "UK": [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5],
//       "Europe": ["38-39", 39, 40, "40-41", 41, "41-42", 42, "42-43", 43, "43-44", 44, 45],
//       "Japan": [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 30],
//     },
//     girls: {
//       "US/PH": [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
//       "UK": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
//       "Europe": [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 30],
//       "Japan": [12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18],
//     },
//     boys: {
//       "US/PH": [11.5, 12, 12.5, 13, 1, 1.5, 2, 2.5, 3, 3.5, 4],
//       "UK": [11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3],
//       "Europe": [29, 29.5, 30.5, 31, 32, 32.5, 33, 33.5, 34, 34.5, 35],
//       "Japan": [16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5],
//     },
//   };

//   const [category, setCategory] = useState("women");
//   const [fromUnit, setFromUnit] = useState("US/PH");
//   const [toUnit, setToUnit] = useState("UK");
//   const [size, setSize] = useState("");
//   const [convertedSize, setConvertedSize] = useState("");
//   const [highlightIndex, setHighlightIndex] = useState(null);

//   const handleConversion = () => {
//     const index = sizeData[category][fromUnit].indexOf(Number(size));
//     if (index === -1) {
//       toast.error("Invalid size selected.");
//       return;
//     }
//     setConvertedSize(sizeData[category][toUnit][index]);
//     setHighlightIndex(index);
//   };

//   const handleReset = () => {
//     setSize("");
//     setConvertedSize("");
//     setHighlightIndex(null);
//   };

//   return (
//     <div className="container mx-auto max-w-7xl p-6">
//       <div className="max-w-4xl mx-auto p-6 bg-white border rounded shadow">
//         <h1 className="text-2xl font-bold text-center mb-4">Philippines to US Shoe Size Converter</h1>
//         <div className="flex flex-wrap gap-4">
//           <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
//             <option value="women">Women</option>
//             <option value="men">Men</option>
//             <option value="girls">Girls</option>
//             <option value="boys">Boys</option>
//           </select>
        
//           <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="p-2 border rounded">
//             {Object.keys(sizeData[category]).map((unit) => (
//               <option key={unit} value={unit}>{unit}</option>
//             ))}
//           </select>
        //   <select value={size} onChange={(e) => setSize(e.target.value)} className="p-2 border rounded">
        //     <option value="">Select Size</option>
        //     {sizeData[category][fromUnit].map((size, index) => (
        //       <option key={index} value={size}>{size}</option>
        //     ))}
        //   </select>
//         </div>
//         <div className="text-center mt-4">
//           <button onClick={handleConversion} className="bg-blue-500 text-white px-4 py-2 rounded">Convert</button>
//           <button onClick={handleReset} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">Reset</button>
//         </div>
//         {convertedSize && (
//           <p className="mt-4 text-xl text-center">
//             {fromUnit} Size {size} = <span className="text-red-500">{convertedSize} {toUnit}</span>
//           </p>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default PhilippinesShoeSizeConverter;
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PhilippinesShoeSizeConverter = () => {
    const sizeData = {
        women: {
          "US/PH": [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11],
          "Australia": [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5],
          "UK": [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8.5],
          "Europe": ["35-36", 36, "36-37", 37, "37-38", 38, "38-39", 39, "39-40", 40, "40-41", "41-42"],
          "Japan": [21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27.5],
        },
        men: {
          "US/PH": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
          "Australia": [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5],
          "UK": [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5],
          "Europe": ["38-39", 39, 40, "40-41", 41, "41-42", 42, "42-43", 43, "43-44", 44, 45],
          "Japan": [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 30],
        },
        girls: {
          "US/PH": [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
          "UK": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
          "Europe": [24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 30],
          "Japan": [12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18],
        },
        boys: {
          "US/PH": [11.5, 12, 12.5, 13, 1, 1.5, 2, 2.5, 3, 3.5, 4],
          "UK": [11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3],
          "Europe": [29, 29.5, 30.5, 31, 32, 32.5, 33, 33.5, 34, 34.5, 35],
          "Japan": [16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5],
        },
      };

  
  const [category, setCategory] = useState("women");
  const [fromUnit, setFromUnit] = useState("US/PH");
  const [toUnit, setToUnit] = useState("UK");
  const [size, setSize] = useState("");
  const [convertedSize, setConvertedSize] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const handleConversion = () => {
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    const fromIndex = sizeData[category][fromUnit].indexOf(Number(size));
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
    navigator.clipboard.writeText(` ${convertedSize} ${toUnit}`);
    toast.success("Result copied to clipboard!");
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
         <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Philippines to US Shoe Size Converter</h1>

        <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
             <option value="women">Women</option>
          <option value="men">Men</option>
       <option value="girls">Girls</option>
          <option value="boys">Boys</option>
          </select>
</div>
<div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {Object.keys(sizeData[category]).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          </div>

          <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.keys(sizeData[category]).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          </div>
          <div className="flex-1 min-w-[200px]">
          <select value={size} onChange={(e) => setSize(e.target.value)} className="p-2 border rounded">
            <option value="">Select Size</option>
            {sizeData[category][fromUnit].map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
          </div>
        
        </div>

        <div className="flex justify-center gap-4">
        <button onClick={handleConversion} className="px-4 py-2 bg-blue-500 text-white rounded">Convert</button>
        </div>
     

        {/* {convertedSize && <p className="text-center text-xl">Converted Size: {convertedSize} {toUnit}</p> } */}

         {/* Result */}
         {convertedSize && (
  <div className="mt-6 text-center">
    <p className="text-xl font-semibold">
      {fromUnit} Size {size} = <span className="text-red-500">{convertedSize} {toUnit}</span>
    </p>
    <button
      onClick={() => {
        navigator.clipboard.writeText(`${fromUnit} Size ${size} = ${convertedSize} ${toUnit}`);
        toast.success("Result copied to clipboard!");
      }}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Copy
    </button>
    <button
      onClick={handleReset}
      className="px-4 py-2 ms-3 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Reset
    </button>
  </div>
)}

        
      </div>
        <ToastContainer />

        <table className="w-full border mt-6">
          <thead>
            <tr>
              {Object.keys(sizeData[category]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeData[category][fromUnit].map((_, i) => (
              <tr key={i} className={highlightIndex === i ? "bg-yellow-200" : ""}>
                {Object.values(sizeData[category]).map((sizes) => (
                  <td key={sizes[i]} className="border p-2">{sizes[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default PhilippinesShoeSizeConverter;
