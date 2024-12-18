import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const NikeShoeSizeConverter = ({ content, locale }) => {
  const [gender, setGender] = useState('Men'); // Default gender
  const [shoeSize, setShoeSize] = useState(''); // Selected shoe size
  const [convertedSizes, setConvertedSizes] = useState({}); // Converted sizes

  // Nike Shoe Size Conversion Data
  const nikeSizeData = {
    Men: {
      "US - Men's": [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      EU: [35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46],
      "Foot Length (in)": ["8 1/2", "8 11/16", "8 13/16", "9", "9 3/16", "9 5/16", "9 1/2", "9 11/16", "9 13/16", "10", "10 3/16", "10 5/16", "10 1/2", "10 11/16", "10 13/16", "11", "11 3/16", "11 5/16"],
    },
    Women: {
      "US - Women's": [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      EU: [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42],
      "Foot Length (in)": ["8 1/2", "8 11/16", "8 13/16", "9", "9 3/16", "9 5/16", "9 1/2", "9 11/16", "9 13/16", "10", "10 3/16", "10 5/16", "10 1/2", "10 11/16", "10 13/16"],
    },
    BigKids: {
      "US - Kid's": ["1Y", "1.5Y", "2Y", "2.5Y", "3Y", "3.5Y", "4Y", "4.5Y", "5Y", "5.5Y", "6Y", "6.5Y", "7Y"],
      UK: [13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6],
      EU: [32, 33, 33.5, 34, 35, 35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40],
      "Foot Length (in)": ["7 15/16", "8 1/16", "8 4/16", "8 7/16", "8 9/16", "8 12/16", "8 13/16", "8 15/16", "9 2/16", "9 4/16", "9 6/16", "9 9/16", "9 11/16"],
    },
    LittleKids: {
      "US - Kid's": ["8C", "9C", "10C", "10.5C", "11C", "11.5C", "12C", "12.5C", "13C", "13.5C", "1Y", "1.5Y", "2Y", "2.5Y", "3Y"],
      UK: [7.5, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5],
      EU: [25, 26, 27, 27.5, 28, 28.5, 29.5, 30, 31, 31.5, 32, 33, 33.5, 34, 35],
      "Foot Length (in)": ["5 15/16", "6 4/16", "6 9/16", "6 12/16", "6 15/16", "7 1/16", "7 4/16", "7 7/16", "7 9/16", "7 12/16", "7 15/16", "8 1/16", "8 4/16", "8 7/16", "8 9/16"],
    },
    BabiesToddlers: {
      "US - Kid's": ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C"],
      UK: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
      EU: [16, 17, 18.5, 19.5, 21, 22, 23.5, 25, 26, 27],
      "Foot Length (in)": ["3 9/16", "3 15/16", "4 4/16", "4 9/16", "4 15/16", "5 4/16", "5 9/16", "5 15/16", "6 4/16", "6 9/16"],
    },
  };

  const handleConvert = () => {
    let index = -1;
    
    // Handle numeric shoe sizes (Men, Women)
    if (gender !== "BigKids" && gender !== "LittleKids" && gender !== "BabiesToddlers") {
      index = nikeSizeData[gender][`US - ${gender}'s`].indexOf(Number(shoeSize));
    }
    // Handle non-numeric shoe sizes (BigKids, LittleKids, BabiesToddlers)
    else {
      index = nikeSizeData[gender]["US - Kid's"].indexOf(shoeSize);
    }

    if (index === -1) {
      setConvertedSizes({});
      return;
    }

    const results = {};
    Object.keys(nikeSizeData[gender]).forEach((system) => {
      results[system] = nikeSizeData[gender][system][index];
    });

    setConvertedSizes(results);
  };

  const handleReset = () => {
    setGender('Men');
    setShoeSize('');
    setConvertedSizes({});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert('Size copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto">
 
    <div className="max-w-5xl mx-auto p-6 mt-5 mb-5 bg-white ">
      <h1 className="text-3xl font-bold text-center mb-6">Nike Shoe Size Converter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Men">Men's</option>
            <option value="Women">Women's</option>
            <option value="BigKids">Big Kids</option>
            <option value="LittleKids">Little Kids</option>
            <option value="BabiesToddlers">Babies & Toddlers</option>
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
            {nikeSizeData[gender]["US - Kid's"] 
              ? nikeSizeData[gender]["US - Kid's"].map((size, idx) => (
                  <option key={idx} value={size}>
                    {size}
                  </option>
                ))
              : nikeSizeData[gender][`US - ${gender}'s`].map((size, idx) => (
                  <option key={idx} value={size}>
                    {size}
                  </option>
                ))
            }
          </select>
        </div>
        <div className='mt-9'>
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Convert Size
        </button>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
       
        
      </div>

      {Object.keys(convertedSizes).length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Converted Sizes</h2>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Size System</th>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(convertedSizes).map(([system, size], idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{system}</td>
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
        <div className='text-center mt-3'>
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
    const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=tagGenerator&language=${locale}`, {
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
    const translations = await serverSideTranslations(locale, ['men', 'shoeSizeConverter']);

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
        translations: await serverSideTranslations(locale, ['men', 'shoeSizeConverter']),
      },
    };
  }
}
export default NikeShoeSizeConverter;
