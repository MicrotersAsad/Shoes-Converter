import { useState } from "react";

const AdidasShoeSizeConverter = () => {
  const [gender, setGender] = useState("Men"); // Default gender
  const [shoeSize, setShoeSize] = useState(""); // Selected shoe size
  const [convertedSizes, setConvertedSizes] = useState({}); // Converted sizes

  const adidasSizeData = {
    Men: {
      US: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      EU: ["36", "36 2/3", "37 1/3", "38", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3", "42", "42 2/3", "43 1/3", "44", "44 2/3", "45 1/3", "46", "46 2/3"],
      Inches: [8.7, 8.9, 9.0, 9.2, 9.4, 9.5, 9.7, 9.8, 10.0, 10.2, 10.4, 10.5, 10.7, 10.9, 11.0, 11.2, 11.3],
    },
    Women: {
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
      EU: ["35", "36", "36.5", "37", "37.5", "38", "38.5", "39", "39.5", "40", "40.5", "41", "42"],
      Inches: [8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2, 9.4, 9.5, 9.7, 9.8, 10, 10.2],
    },
    BabiesToddlers: {
      US: ["1k", "2k", "3k", "4k", "5k", "6k"],
      UK: ["0k", "1k", "2k", "3k", "4k", "5k"],
      EU: [16, 17, 18, 19, 20, 21],
      Inches: [3.2, 3.5, 3.9, 4.2, 4.5, 4.8],
    },
    Children: {
      US: ["10.5k", "11k", "11.5k", "12k", "12.5k", "13k"],
      UK: ["10k", "10.5k", "11k", "11.5k", "12k", "12.5k"],
      EU: [28, 28.5, 29, 30, 30.5, 31],
      Inches: [6.5, 6.7, 6.9, 7.0, 7.2, 7.4],
    },
    YouthTeens: {
      US: ["3.5", "4", "4.5", "5", "5.5", "6"],
      UK: ["3", "3.5", "4", "4.5", "5", "5.5"],
      EU: [35.5, 36, "36 2/3", "37 1/3", 38, "38 2/3"],
      Inches: [8.5, 8.7, 8.9, 9.0, 9.2, 9.4],
    },
  };

  const handleConvert = () => {
    if (!shoeSize) {
      setConvertedSizes({});
      return;
    }

    const sizes = adidasSizeData[gender]["US"];
    const index = sizes.findIndex((size) => size.toString() === shoeSize.toString()); // Ensure comparison works for both numeric and string sizes
    if (index === -1) {
      setConvertedSizes({});
      return;
    }

    const results = {};
    Object.keys(adidasSizeData[gender]).forEach((key) => {
      results[key] = adidasSizeData[gender][key][index];
    });

    setConvertedSizes(results);
  };

  const handleReset = () => {
    setGender("Men");
    setShoeSize("");
    setConvertedSizes({});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert("Size copied to clipboard!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-5 mb-5 bg-white  rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Adidas Shoe Size Converter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2">Category:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="BabiesToddlers">Babies & Toddlers</option>
            <option value="Children">Children</option>
            <option value="YouthTeens">Youth & Teens</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Shoe Size:</label>
          <select
            value={shoeSize}
            onChange={(e) => setShoeSize(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select size</option>
            {adidasSizeData[gender]["US"].map((size, idx) => (
              <option key={idx} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <button
            onClick={handleConvert}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Convert Size
          </button>
        </div>
      </div>

      {Object.keys(convertedSizes).length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Converted Sizes:</h2>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Region</th>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(convertedSizes).map(([region, size], idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{region}</td>
                  <td className="border px-4 py-2">{size}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleCopy(size)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mt-3">
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdidasShoeSizeConverter;
