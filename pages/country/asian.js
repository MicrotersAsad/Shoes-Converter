import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AsianClothingSizeConverter = ({ content, locale }) => {
  const {t}=useTranslation("asian")
  // Data structure
  const sizeData = {
    category: t("Asian Clothing Size Conversion"),
    data: [
      {
        unit: 'Asian (int\'l)',
        sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      },
      {
        unit: 'EU',
        sizes: ['32', '34', '36', '38', '40', '42', '44', '46']
      },
      {
        unit: 'US',
        sizes: ['0', '2', '4', '6', '8', '10', '12', '14']
      },
      {
        unit: 'UK',
        sizes: ['4', '6', '8', '10', '12', '14', '16', '18']
      },
      {
        unit: 'China - Tops (cm)',
        sizes: ['145/72A', '150/76A', '155/80A', '160/84A', '165/88A', '170/92A', '175/96A', '180/100A']
      },
      {
        unit: 'China - Bottoms (cm)',
        sizes: ['145/54A', '150/58A', '155/62A', '160/66A', '165/70A', '170/74A', '175/78A', '180/82A']
      },
      {
        unit: 'Bust (cm/inch)',
        sizes: [
          '76.5 cm / 29.5 in',
          '80 cm / 31 in',
          '83.5 cm / 32.5 in',
          '87 cm / 34 in',
          '90.5 cm / 35.5 in',
          '94 cm / 37 in',
          '97.5 cm / 38.5 in',
          '102.5 cm / 40.5 in'
        ]
      },
      {
        unit: 'Waist (cm/inch)',
        sizes: [
          '60.5 cm / 23 in',
          '64 cm / 24.5 in',
          '67.5 cm / 26.5 in',
          '71 cm / 27.5 in',
          '74.5 cm / 29.5 in',
          '78 cm / 30.5 in',
          '81.5 cm / 32 in',
          '85.5 cm / 33.5 in'
        ]
      },
      {
        unit: 'Hip (cm/inch)',
        sizes: [
          '84.5 cm / 32.5 in',
          '88 cm / 34 in',
          '91.5 cm / 35.5 in',
          '95 cm / 37 in',
          '98.5 cm / 38.5 in',
          '102 cm / 40 in',
          '105.5 cm / 41.5 in',
          '109.5 cm / 43 in'
        ]
      }
    ]
  };

  const { category, data } = sizeData;

  // State
  const [fromUnit] = useState("Asian (int'l)"); // From unit is fixed as Asian
  const [toUnit, setToUnit] = useState('US'); // Default "To" unit
  const [size, setSize] = useState(''); // Selected Asian size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);

  // Get the fromRow (Asian sizes)
  const fromRow = data.find((row) => row.unit === fromUnit);

  // Handle conversion
  const handleConversion = () => {
    if (!size) {
      toast.error(t('Please select an Asian size first.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const fromIndex = fromRow.sizes.indexOf(size);
    if (fromIndex === -1) {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
      toast.error(t('Selected size is invalid or not available.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setHighlightIndex(fromIndex);
    const toRow = data.find((row) => row.unit === toUnit);
    if (!toRow) {
      setConvertedSize('Invalid "To" unit');
      toast.error(`Invalid "To" unit: ${toUnit}`, {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const result = toRow.sizes[fromIndex];
    if (!result) {
      setConvertedSize('No corresponding size found.');
      toast.error(t('No corresponding size found for the selected Asian size.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setConvertedSize(result);
  };

  const handleReset = () => {
    setToUnit('US');
    setSize('');
    setConvertedSize('');
    setHighlightIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <div className="flex flex-col max-w-4xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">{category}</h2>

        <div className="flex flex-wrap gap-6">
          {/* Asian Size Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              {t("Asian Size")}:
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              <option value="" disabled>{t("Select an Asian size")}</option>
              {fromRow.sizes.map((asianSize, idx) => (
                <option key={idx} value={asianSize}>
                  {asianSize}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="toUnit" className="block mb-2 text-sm font-medium text-gray-700">
              {t("Convert To")}:
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              {data.filter((row) => row.unit !== fromUnit).map((row, index) => (
                <option key={index} value={row.unit}>
                  {row.unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 border-b pb-2">
          <button
            onClick={handleConversion}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {t("Convert Size")}
          </button>
          
        </div>

        {/* Result Display */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>{`${fromUnit} Size ${size} = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${fromUnit} Size ${size} = ${convertedSize} ${toUnit}`);
                  toast.success(t('Copied to Clipboard!'), {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }}
                className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none"
              >
                {t('Copy')}
              </button>
              <button
            onClick={handleReset}
            className="px-6 py-2 ms-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            {t('Reset')}
          </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>

      {/* Data Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{category}</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              {data.map((row, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
                >
                  {row.unit}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[0].sizes.map((_, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {data.map((row, index) => (
                  <td
                    key={index}
                    className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                      highlightIndex === i && row.unit !== fromUnit ? 'bg-blue-100 font-bold' : ''
                    }`}
                  >
                    {row.sizes[i]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
    const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=asian&language=${locale}`, {
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
    const translations = await serverSideTranslations(locale, ['asian', 'navbar','footer']);

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
        ...(await serverSideTranslations(locale, ['asian', 'navbar','footer'])),
      },
    };
  }
}
export default AsianClothingSizeConverter;
