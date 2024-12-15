import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const UggShoeSizeConverter = ({ content, locale }) => {
    const [category, setCategory] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});
  const [region, setRegion] = useState('US'); // New state for region
  const sizeData = {
    Women: [
      { heelToe: 8.66, US: 5, UK: 3, Europe: 36, Japan: 22, Mexico: 22, China: 220 },
      { heelToe: 8.86, US: 5.5, UK: 3.5, Europe: 36.5, Japan: 22.5, Mexico: 22.5, China: 225 },
      { heelToe: 9.06, US: 6, UK: 4, Europe: 37, Japan: 23, Mexico: 23, China: 230 },
      { heelToe: 9.25, US: 6.5, UK: 4.5, Europe: 37.5, Japan: 23.5, Mexico: 23.5, China: 235 },
      { heelToe: 9.45, US: 7, UK: 5, Europe: 38, Japan: 24, Mexico: 24, China: 240 },
      { heelToe: 9.65, US: 7.5, UK: 5.5, Europe: 38.5, Japan: 24.5, Mexico: 24.5, China: 245 },
      { heelToe: 9.84, US: 8, UK: 6, Europe: 39, Japan: 25, Mexico: 25, China: 250 },
      { heelToe: 10.04, US: 8.5, UK: 6.5, Europe: 39.5, Japan: 25.5, Mexico: 25.5, China: 255 },
      { heelToe: 10.24, US: 9, UK: 7, Europe: 40, Japan: 26, Mexico: 26, China: 260 },
      { heelToe: 10.43, US: 9.5, UK: 7.5, Europe: 40.5, Japan: 26.5, Mexico: 26.5, China: 265 },
      { heelToe: 10.63, US: 10, UK: 8, Europe: 41, Japan: 27, Mexico: 27, China: 270 },
      { heelToe: 10.83, US: 10.5, UK: 8.5, Europe: 41.5, Japan: 27.5, Mexico: 27.5, China: 275 },
      { heelToe: 11.02, US: 11, UK: 9, Europe: 42, Japan: 28, Mexico: 28, China: 280 },
      { heelToe: 11.22, US: 11.5, UK: 9.5, Europe: 42.5, Japan: 28.5, Mexico: 28.5, China: 285 },
      { heelToe: 11.42, US: 12, UK: 10, Europe: 43, Japan: 29, Mexico: 29, China: 290 },
      { heelToe: 11.81, US: 13, UK: 11, Europe: 44, Japan: 30, Mexico: 30, China: 300 },
      { heelToe: 12.20, US: 14, UK: 12, Europe: 45, Japan: 31, Mexico: 31, China: 310 }
    ],
    Men: [
      { heelToe: 9.06, US: 5, UK: 4, Europe: 38, Japan: 23, Mexico: 23, China: 230 },
      { heelToe: 9.45, US: 6, UK: 5, Europe: 39, Japan: 24, Mexico: 24, China: 240 },
      { heelToe: 9.65, US: 6.5, UK: 5.5, Europe: 39.5, Japan: 24.5, Mexico: 24.5, China: 245 },
      { heelToe: 9.84, US: 7, UK: 6, Europe: 40, Japan: 25, Mexico: 25, China: 250 },
      { heelToe: 10.04, US: 7.5, UK: 6.5, Europe: 40.5, Japan: 25.5, Mexico: 25.5, China: 255 },
      { heelToe: 10.24, US: 8, UK: 7, Europe: 41, Japan: 26, Mexico: 26, China: 260 },
      { heelToe: 10.43, US: 8.5, UK: 7.5, Europe: 41.5, Japan: 26.5, Mexico: 26.5, China: 265 },
      { heelToe: 10.63, US: 9, UK: 8, Europe: 42, Japan: 27, Mexico: 27, China: 270 },
      { heelToe: 10.83, US: 9.5, UK: 8.5, Europe: 42.5, Japan: 27.5, Mexico: 27.5, China: 275 },
      { heelToe: 11.02, US: 10, UK: 9, Europe: 43, Japan: 28, Mexico: 28, China: 280 },
      { heelToe: 11.22, US: 10.5, UK: 9.5, Europe: 43.5, Japan: 28.5, Mexico: 28.5, China: 285 },
      { heelToe: 11.42, US: 11, UK: 10, Europe: 44, Japan: 29, Mexico: 29, China: 290 },
      { heelToe: 11.81, US: 12, UK: 11, Europe: 46, Japan: 30, Mexico: 30, China: 300 },
      { heelToe: 12.20, US: 13, UK: 12, Europe: 48.5, Japan: 31, Mexico: 31, China: 310 }
    ],
    Kids: {
      Toddler: [
        { heelToe: 4.53, US: 4, UK: 3.5, Europe: 19.5, Japan: 11.5, Mexico: 11.5, China: 115 },
        { heelToe: 4.92, US: 5, UK: 4.5, Europe: 21, Japan: 12.5, Mexico: 12.5, China: 125 },
        { heelToe: 5.31, US: 6, UK: 5, Europe: 22, Japan: 13.5, Mexico: 13, China: 135 },
        { heelToe: 5.71, US: 7, UK: 6, Europe: 23.5, Japan: 14.5, Mexico: 14, China: 145 },
        { heelToe: 5.91, US: 8, UK: 7, Europe: 25, Japan: 15, Mexico: 15, China: 150 },
        { heelToe: 6.30, US: 9, UK: 8, Europe: 26, Japan: 16, Mexico: 16, China: 160 },
        { heelToe: 6.69, US: 10, UK: 9, Europe: 27.5, Japan: 17, Mexico: 17, China: 170 },
        { heelToe: 6.89, US: 11, UK: 10, Europe: 28.5, Japan: 17.5, Mexico: 18, China: 175 },
        { heelToe: 7.28, US: 12, UK: 11, Europe: 30, Japan: 18.5, Mexico: 19.5, China: 185 }
      ],
      BigKids: [
        { heelToe: 6.69, US: 10, UK: 9, Europe: 27.5, Japan: 17, Mexico: 17, China: 170 },
        { heelToe: 6.89, US: 11, UK: 10, Europe: 28.5, Japan: 17.5, Mexico: 17.5, China: 175 },
        { heelToe: 7.28, US: 12, UK: 11, Europe: 30, Japan: 18.5, Mexico: 18.5, China: 185 },
        { heelToe: 7.68, US: 13, UK: 12, Europe: 31, Japan: 19.5, Mexico: 19.5, China: 195 },
        { heelToe: 7.87, US: 1, UK: 13, Europe: 32.5, Japan: 20, Mexico: 20, China: 200 }
      ]
    }
  };
  const handleConvert = () => {
    if (!shoeSize) {
      alert("Please select a shoe size.");
      return;
    }

    let selectedSizeData;

    // Determine the selected category and subcategory if applicable
    if (category === "Kids") {
      // If Kids, further check for subcategories
      selectedSizeData = sizeData.Kids.Toddler.concat(sizeData.Kids.BigKids);
    } else {
      selectedSizeData = sizeData[category];
    }

    if (!selectedSizeData) {
      alert("Invalid category selection.");
      return;
    }

    // Find the size entry that matches the selected shoe size in the selected region
    const sizeEntry = selectedSizeData.find(size => size[region] === Number(shoeSize));

    if (!sizeEntry) {
      setConvertedSizes({});
      alert("Selected size not available.");
      return;
    }

    // Create an object to hold converted sizes for all regions
    const results = {};
    Object.keys(sizeEntry).forEach((system) => {
      if (system !== 'heelToe') { // Exclude heelToe if not needed
        results[system] = sizeEntry[system];
      }
    });

    // Set the converted sizes in the state
    setConvertedSizes(results);
  };

  const handleReset = () => {
    setCategory('Men');
    setRegion('US');
    setShoeSize('');
    setConvertedSizes({});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert("Size copied to clipboard!");
  };

  // Labels (consider using i18n translations)
  const categoryLabel = 'Category';
  const sizeLabel = 'Select Shoe Size';
  const selectSize = 'Choose Size';
  const convertButton = 'Convert';
  const convertedSizesLabel = 'Converted Sizes';
  const regionLabel = 'Region';
  const actionLabel = 'Action';

  // Generate unique shoe sizes based on the selected category and region
  const getShoeSizes = () => {
    let selectedSizeData;

    if (category === "Kids") {
      selectedSizeData = sizeData.Kids.Toddler.concat(sizeData.Kids.BigKids);
    } else {
      selectedSizeData = sizeData[category];
    }

    if (!selectedSizeData) return [];

    // Extract unique sizes for the selected region
    const sizes = selectedSizeData.map(size => size[region]).filter((value, index, self) => self.indexOf(value) === index);

    return sizes.sort((a, b) => a - b);
  };
  return (
    <div className="max-w-7xl mx-auto">
    <div className="max-w-5xl mx-auto p-6 mt-5 mb-5 bg-white rounded-lg">
    <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Ugg Shoe Size Converter</h1>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Category Selection */}
        {/* Category Selection */}
        <div>
            <label className="block mb-2">{categoryLabel}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

        {/* Region Selection */}
        <div>
          <label className="block mb-2">{regionLabel}</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
             <option value="US">US</option>
          <option value="UK">UK</option>
          <option value="Europe">Europe</option>
          <option value="Japan">Japan</option>
          <option value="Mexico">Mexico</option>
          <option value="China">China</option>
          </select>
        </div>

        {/* Shoe Size Selection */}
     {/* Shoe Size Selection */}
     <div>
            <label className="block mb-2">{sizeLabel}</label>
            <select
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">{selectSize}</option>
              {getShoeSizes().map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
 

      {/* Convert Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          {convertButton}
        </button>
      </div>

      {/* Converted Sizes Table */}
      {Object.keys(convertedSizes).length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">{convertedSizesLabel}</h2>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">{regionLabel}</th>
                <th className="border px-4 py-2">{sizeLabel}</th>
                <th className="border px-4 py-2">{actionLabel}</th>
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
           {/* Reset Button */}
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
    <div className="content pt-6 pb-5">
      <article
        dangerouslySetInnerHTML={{ __html: content?.content || 'No content available.' }}
        style={{ listStyleType: 'none' }}
      ></article>
    </div>
  </div>
);
};

export async function getStaticProps({ locale }) {
try {
  const AUTH_TOKEN = 'AZ-fc905a5a5ae08609ba38b046ecc8ef00';

  const contentResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=tagGenerator&language=${locale}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!contentResponse.ok) {
    throw new Error('Failed to fetch content');
  }

  const contentData = await contentResponse.json();

  const translations = await serverSideTranslations(locale, ['common', 'shoeSizeConverter']);

  return {
    props: {
      content: contentData?.translations?.[locale] || {},
      ...translations,
    },
    revalidate: 60 * 60 * 24,
  };
} catch (error) {
  console.error('Error fetching content:', error);

  return {
    props: {
      content: {
        categoryLabel: 'Shoe Size Converter',
        sizeLabel: 'Select Shoe Size',
      },
      translations: await serverSideTranslations(locale, ['common', 'shoeSizeConverter']),
    },
  };
}
}

export default UggShoeSizeConverter;