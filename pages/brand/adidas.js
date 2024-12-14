import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const AdidasShoeSizeConverter = ({ content, locale }) => {
  const [gender, setGender] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});

  // Adidas shoe size data
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
    // Add other categories if necessary...
  };

  const handleConvert = () => {
    if (!shoeSize) {
      setConvertedSizes({});
      return;
    }

    const sizes = adidasSizeData[gender]["US"];
    const index = sizes.findIndex((size) => size.toString() === shoeSize.toString()); 
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

  // If translations or content are undefined, fallback to empty object or default values
  const categoryLabel =  "Category"; // Default value
  const sizeLabel = "Select Shoe Size"; // Default value
  const selectSize =  "Choose Size"; // Default value
  const convertButton = "Convert"; // Default value
  const convertedSizesLabel =  "Converted Sizes"; // Default value
  const regionLabel = "Region"; // Default value
  const actionLabel = "Action"; // Default value

  return (
    <div className="max-w-7xl mx-auto">
  
    <div className="max-w-5xl mx-auto p-6 mt-5 mb-5 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Adidas Shoe Size Converter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2">{categoryLabel}</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">{sizeLabel}</label>
          <select
            value={shoeSize}
            onChange={(e) => setShoeSize(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">{selectSize}</option>
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
            {convertButton}
          </button>
        </div>
      </div>

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
          dangerouslySetInnerHTML={{ __html: content?.content || "No content available." }}
          style={{ listStyleType: "none" }}
        ></article>
      </div>
   

    </div>
  );
};

export async function getStaticProps({ locale }) {
  try {
    // Define the authorization token (you can replace this with an actual token)
    const AUTH_TOKEN = 'AZ-fc905a5a5ae08609ba38b046ecc8ef00';  // Replace with your token or fetch from an env variable

    // Fetch the content data with authorization header
    const contentResponse = await fetch(`https://shoes-converter.vercel.app/api/content?category=tagGenerator&language=${locale}`, {
      method: 'GET',  // You can also specify POST, PUT, etc. if needed
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,  // Add Authorization header
        'Content-Type': 'application/json',       // Set Content-Type to JSON
      },
    });

    // Check if the response is successful (status 200)
    if (!contentResponse.ok) {
      throw new Error('Failed to fetch content');
    }

    const contentData = await contentResponse.json();

    // Fetch translations (static)
    const translations = await serverSideTranslations(locale, ['common', 'shoeSizeConverter']);

    return {
      props: {
        content: contentData?.translations?.[locale] || {},
        ...translations,
      },
      revalidate: 60 * 60 * 24,  // 24 hours revalidation
    };
  } catch (error) {
    console.error('Error fetching content:', error);

    // Return default content in case of error
    return {
      props: {
        content: {
          categoryLabel: 'Shoe Size Converter',
          sizeLabel: 'Select Shoe Size',
          // Add default values for other fields...
        },
        translations: await serverSideTranslations(locale, ['common', 'shoeSizeConverter']),
      },
    };
  }
}


export default AdidasShoeSizeConverter;
