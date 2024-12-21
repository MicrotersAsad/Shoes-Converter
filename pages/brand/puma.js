import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const PumaShoeSizeConverter = ({content}) => {
  const {t}=useTranslation("puma")
  const [category, setCategory] = useState('Women');
  const [region, setRegion] = useState('US');
  const [shoeSize, setShoeSize] = useState('');
  const [convertedSizes, setConvertedSizes] = useState({});

  const pumaSizeData = {
   
    Women: {
      US: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      DE: [35.5, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
      FR: [35.5, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5],
      IT: [35.5, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5],
      ES: [35.5, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5],
    },
    Men: {
      US: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
      DE: [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48.5, 49.5],
      UK: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14],
      FR: [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48.5, 49.5],
      IT: [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48.5, 49.5],
      ES: [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48.5, 49.5],
    },
    Kids: {
        US: [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
        DE: [27, 27.5, 28, 28.5, 29, 30, 31, 31.5, 32, 32.5, 33, 34, 34.5, 35, 35.5, 36, 37, 37.5, 38, 38.5, 39],
        UK: [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
        FR: [27, 27.5, 28, 28.5, 29, 30, 31, 31.5, 32, 32.5, 33, 34, 34.5, 35, 35.5, 36, 37, 37.5, 38, 38.5, 39],
        IT: [27, 27.5, 28, 28.5, 29, 30, 31, 31.5, 32, 32.5, 33, 34, 34.5, 35, 35.5, 36, 37, 37.5, 38, 38.5, 39],
        ES: [27, 27.5, 28, 28.5, 29, 30, 31, 31.5, 32, 32.5, 33, 34, 34.5, 35, 35.5, 36, 37, 37.5, 38, 38.5, 39]
      }
,      
    BabyAndToddler: {
      US: [3, 4, 5, 5.5, 6, 7, 8, 9, 9.5],
      DE: [18, 19, 20, 21, 22, 23, 24, 25, 26],
      UK: [2, 3, 4, 4.5, 5, 6, 7, 8, 8.5],
      FR: [18, 19, 20, 21, 22, 23, 24, 25, 26],
      IT: [18, 19, 20, 21, 22, 23, 24, 25, 26],
      ES: [18, 19, 20, 21, 22, 23, 24, 25, 26],
    },
  };

  const handleConvert = () => {
    if (!shoeSize || shoeSize === '') {
      alert(t('Please select a shoe size.'));
      return;
    }

    const sizeData = pumaSizeData[category];

    if (!sizeData) {
      alert(t('Invalid category selection.'));
      return;
    }

    // Find the index of the selected shoe size in the selected region's sizing array
    const index = sizeData[region].indexOf(Number(shoeSize));

    if (index === -1) {
      setConvertedSizes({});
      alert(t('Selected size not available.'));
      return;
    }

    // Create an object to hold converted sizes for all regions
    const results = {};
    Object.keys(sizeData).forEach((sys) => {
      results[sys] = sizeData[sys][index];
    });

    // Set the converted sizes in the state
    setConvertedSizes(results);
  };

  const handleReset = () => {
    setCategory('Women');
    setRegion('US');
    setShoeSize('');
    setConvertedSizes({});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert(t('Size copied to clipboard!'));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-5xl mx-auto p-6 mt-5 mb-5 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">{t("Puma Shoe Size Converter")}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Category Selection */}
          <div>
            <label className="block mb-2">{t("Category")}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="Women">{t("Women")}</option>
              <option value="Men">"{t("Men")}</option>
              <option value="Kids">{t("Kids")}</option>
              <option value="BabyAndToddler">{t("Baby & Toddler")}</option>
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label className="block mb-2">{t("Region")}</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="US">US</option>
              <option value="DE">DE</option>
              <option value="UK">UK</option>
              <option value="FR">FR</option>
              <option value="IT">IT</option>
              <option value="ES">ES</option>
            </select>
          </div>

          {/* Shoe Size Selection */}
          <div>
            <label className="block mb-2">Shoe Size</label>
            <select
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">{t("Select Size")}</option>
              {pumaSizeData[category][region].map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleConvert}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            {t("Convert")}
          </button>
        </div>

        {/* Converted Sizes Display */}
        {Object.keys(convertedSizes).length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">{t("Converted Sizes")}</h2>
            <table className="table-auto w-full border">
              <thead>
                <tr>
                  <th className="border px-4 py-2">{t("Region")}</th>
                  <th className="border px-4 py-2">{t("Size")}</th>
                  <th className="border px-4 py-2">{t("Action")}</th>
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
                        {t("Copy")}
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
            {t("Reset")}
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
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=puma&language=${locale}`,
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
        
          const translations = await serverSideTranslations(locale, ['puma', 'shoeSizeConverter']);
        
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
              ...(await serverSideTranslations (locale, ['puma', 'navbar','footer'])),
            },
          };
        }
        }

export default PumaShoeSizeConverter;
