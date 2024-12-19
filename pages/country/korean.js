import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KoreanShoeSizeConverter = ({content}) => {
  const {t}=useTranslation('korean')
  const [category, setCategory] = useState('women'); // Default category
  const [toUnit, setToUnit] = useState('USA, CAN & AUS'); // Default "To" unit
  const [size, setSize] = useState(''); // Selected size in Korean (mm)
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight

  // Korean Shoe size data
  const koreanShoeSizeData = {
    categories: {
      women: {
        title: t("Women's Shoe Sizes - International Conversion"),
        data: [
          { unit: 'KOR (mm)', sizes: ['220', '225', '230', '235', '240', '245', '250', '255', '260', '265', '270'] },
          { unit: 'USA, CAN & AUS', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'] },
          { unit: 'UK', sizes: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8'] },
          { unit: 'EUR', sizes: ['35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40.5', '41'] },
          { unit: 'JAP (cm)', sizes: ['22', '22.5', '23', '23.5', '24', '24.5', '25', '25.5', '26', '26.5', '27'] },
        ],
      },
      men: {
        title: t("Men's Shoe Sizes - International Conversion"),
        data: [
          { unit: 'KOR (mm)', sizes: ['240', '245', '250', '255', '260', '265', '270', '275', '280', '285', '290', '295', '300', '305', '310', '315', '320'] },
          { unit: 'USA & CAN', sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14'] },
          { unit: 'UK & AUS', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'] },
          { unit: 'EUR', sizes: ['39', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44.5', '44.5', '45', '46', '46.5', '47', '47.5', '48'] },
          { unit: 'JAP (cm)', sizes: ['24', '24.5', '25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30', '30.5', '31', '31.5', '32'] },
        ],
      },
    },
  };

  // Extract category names for display purposes
  const categoryNames = {
    women: "Women's",
    men: "Men's",
  };

  // Update "To" unit and reset states when category changes
  useEffect(() => {
    setToUnit(koreanShoeSizeData.categories[category].data[1].unit); // Default "To" unit as first "To" unit
    setSize(''); // Reset size when category changes
    setConvertedSize(''); // Reset conversion result
    setHighlightIndex(null); // Reset highlight
  }, [category]);

  const handleConversion = () => {
    if (!size) {
      toast.error(t('Please select a size.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const categoryData = koreanShoeSizeData.categories[category].data;
    const fromRow = categoryData.find((row) => row.unit === 'KOR (mm)');

    if (!fromRow) {
      toast.error(`KOR (mm) data not found for category: ${category}`, {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const fromIndex = fromRow.sizes.indexOf(size);

    if (fromIndex !== -1) {
      setHighlightIndex(fromIndex); // Highlight the matching column
      const toRow = categoryData.find((row) => row.unit === toUnit);
      if (toRow && toRow.sizes[fromIndex]) {
        setConvertedSize(toRow.sizes[fromIndex]); // Display the conversion result
      } else {
        setConvertedSize('Invalid "To" unit');
        toast.error(`Invalid "To" unit: ${toUnit}`, {
          position: 'top-center',
          autoClose: 2000,
        });
      }
    } else {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
      toast.error(t('Selected size is invalid or not available.'), {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  const handleReset = () => {
    setCategory('women'); // Default category
    setToUnit(koreanShoeSizeData.categories['women'].data[1].unit); // Reset "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">{t("Korean Shoe Size Converter")}</h2>

        {/* Input Fields */}
        <div className="flex flex-wrap gap-6">
          {/* Category */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              {t("Category")}:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="women">{t("Women's")}</option>
              <option value="men">{t("Men's")}</option>
            </select>
          </div>

          {/* Size */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              Size (KOR mm):
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
               {t("Select a size")}
              </option>
              {koreanShoeSizeData.categories[category].data
                .find((row) => row.unit === 'KOR (mm)')
                .sizes.map((s, index) => (
                  <option key={index} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>

          {/* To Unit */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="toUnit" className="block mb-2 text-sm font-medium text-gray-700">
              {t("To")}:
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {koreanShoeSizeData.categories[category].data
                .filter((row) => row.unit !== 'KOR (mm)')
                .map((row, index) => (
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
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t("Convert Size")}
          </button>
          
        </div>

        {/* Result */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>{`Size ${size} KOR (mm) = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Size ${size} KOR (mm) = ${convertedSize} ${toUnit}`);
                  toast.success(t('Copied to Clipboard!'), {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  });
                }}
                className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {t("Copy")}
              </button>
              <button
            onClick={handleReset}
            className="px-6 py-2 ms-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {t("Reset")}
          </button>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>

      {/* Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{koreanShoeSizeData.categories[category].title}</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">Unit</th>
              {koreanShoeSizeData.categories[category].data
                .filter((row) => row.unit !== 'KOR (mm)')
                .map((row, index) => (
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
            {koreanShoeSizeData.categories[category].data.map((row, index) => {
              if (row.unit === 'KOR (mm)') return null; // Exclude KOR (mm) from table rows
              return (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">{row.unit}</td>
                  {row.sizes.map((sizeItem, i) => (
                    <td
                      key={i}
                      className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                        highlightIndex === i ? 'bg-blue-100 font-bold' : ''
                      }`}
                    >
                      {sizeItem !== '-' ? sizeItem : '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
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
       const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=korean&language=${locale}`, {
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
       const translations = await serverSideTranslations(locale, ['korean', 'shoeSizeConverter']);
   
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
           ...(await serverSideTranslations (locale, ['korean', 'navbar','footer'])),
         },
       };
     }
   }

export default KoreanShoeSizeConverter;
