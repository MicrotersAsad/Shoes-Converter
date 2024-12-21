import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TimberlandShoeSizeConverter = ({ content, locale }) => {
  const {t}=useTranslation("dr-martens")
  const [gender, setGender] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});
  const [region, setRegion] = useState('US'); // New state for region
  const sizeData = {
    Women: [
        { footLength: '9 1⁄4"', footWidth: '3 1⁄4"', US: 5, UK: 3, EUR: 36, JP: 22 },
        { footLength: '9 3⁄4"', footWidth: '3 1⁄2"', US: 6, UK: 4, EUR: 37, JP: 23 },
        { footLength: '10"', footWidth: '3 1⁄2"', US: 7, UK: 5, EUR: 38, JP: 24 },
        { footLength: '10 1⁄4"', footWidth: '3 1⁄2"', US: 8, UK: 6, EUR: 39, JP: 25 },
        { footLength: '10 3⁄4"', footWidth: '3 3⁄4"', US: 9, UK: 7, EUR: 41, JP: 26 },
        { footLength: '11"', footWidth: '3 3⁄4"', US: 10, UK: 8, EUR: 42, JP: 27 },
        { footLength: '11 1⁄4"', footWidth: '3 3⁄4"', US: 11, UK: 9, EUR: 43, JP: 28 },
        { footLength: '11 3⁄4"', footWidth: '4"', US: 12, UK: 10, EUR: 45, JP: 29 },
        { footLength: '12"', footWidth: '4"', US: 13, UK: 11, EUR: 46, JP: 30 },
        { footLength: '12 1⁄4"', footWidth: '4"', US: 14, UK: 12, EUR: 47, JP: 31 },
        { footLength: '12 3⁄4"', footWidth: '4 1⁄4"', US: 15, UK: 13, EUR: 48, JP: 32 },
        { footLength: '13"', footWidth: '4 1⁄4"', US: 16, UK: 14, EUR: 49, JP: 33 },
        { footLength: '13 1⁄4"', footWidth: '4 1⁄4"', US: 17, UK: 15, EUR: 50, JP: 34 },
      ],
      Men: [
        { footLength: '9 1⁄4"', footWidth: '3 1⁄4"', US: 4, UK: 3, EUR: 36, JP: 22 },
        { footLength: '9 3⁄4"', footWidth: '3 1⁄2"', US: 5, UK: 4, EUR: 37, JP: 23 },
        { footLength: '10"', footWidth: '3 1⁄2"', US: 6, UK: 5, EUR: 38, JP: 24 },
        { footLength: '10 1⁄4"', footWidth: '3 1⁄2"', US: 7, UK: 6, EUR: 39, JP: 25 },
        { footLength: '10 3⁄4"', footWidth: '3 3⁄4"', US: 8, UK: 7, EUR: 41, JP: 26 },
        { footLength: '11"', footWidth: '3 3⁄4"', US: 9, UK: 8, EUR: 42, JP: 27 },
        { footLength: '11 1⁄4"', footWidth: '3 3⁄4"', US: 10, UK: 9, EUR: 43, JP: 28 },
        { footLength: '11 3⁄4"', footWidth: '4"', US: 11, UK: 10, EUR: 45, JP: 29 },
        { footLength: '12"', footWidth: '4"', US: 12, UK: 11, EUR: 46, JP: 30 },
        { footLength: '12 1⁄4"', footWidth: '4"', US: 13, UK: 12, EUR: 47, JP: 31 },
        { footLength: '12 3⁄4"', footWidth: '4 1⁄4"', US: 14, UK: 13, EUR: 48, JP: 32 },
        { footLength: '13"', footWidth: '4 1⁄4"', US: 15, UK: 14, EUR: 49, JP: 33 },
        { footLength: '13 1⁄4"', footWidth: '4 1⁄4"', US: 16, UK: 15, EUR: 50, JP: 34 },
      ],
      Newborn: [
        { footLength: '3 3⁄4"', US: 1, UK: 0, EUR: 16, JP: 8 },
        { footLength: '4 1⁄4"', US: 2, UK: 1, EUR: 17, JP: 9 },
        { footLength: '4 1⁄2"', US: 3, UK: 2, EUR: 18, JP: 10 },
        { footLength: '4 3⁄4"', US: 4, UK: 3, EUR: 19, JP: 11 },
      ],
      Infant: [
        { footLength: '4 3⁄4"', US: 4, UK: 3, EUR: 19, JP: 11 },
        { footLength: '5 1⁄4"', US: 5, UK: 4, EUR: 20, JP: 12 },
        { footLength: '5 1⁄2"', US: 6, UK: 5, EUR: 21.5, JP: 12.5 },
      ],
      Toddler: [
        { footLength: '5 3⁄4"', US: 7, UK: 6, EUR: 23, JP: 13.5 },
        { footLength: '6 1⁄4"', US: 8, UK: 7, EUR: 23.5, JP: 14 },
        { footLength: '6 1⁄2"', US: 9, UK: 8, EUR: 26, JP: 15 },
        { footLength: '6 3⁄4"', US: 10, UK: 9, EUR: 27, JP: 16 },
      ],
      Junior: [
        { footLength: '7 1⁄4"', US: 11, UK: 10, EUR: 28, JP: 17 },
        { footLength: '7 1⁄2"', US: 12, UK: 11, EUR: 29, JP: 18 },
        { footLength: '7 3⁄4"', US: 13, UK: 12, EUR: 31, JP: 18.5 },
        { footLength: '8 1⁄4"', US: 1, UK: 13, EUR: 32, JP: 19.5 },
        { footLength: '8 1⁄2"', US: 2, UK: 1, EUR: 33, JP: 20.5 },
        { footLength: '8 3⁄4"', US: 3, UK: 2, EUR: 34, JP: 21.5 },
        { footLength: '9 1⁄4"', US: 4, UK: 3, EUR: 36, JP: 22 },
      ],
      Youth: [
        { footLength: '9 1⁄2"', US: 5, UK: 4, EUR: 37, JP: 23 },
        { footLength: '10"', US: 6, UK: 5, EUR: 38, JP: 23.5 },
      ],
  };
  const handleConvert = () => {
    if (!shoeSize || shoeSize === '') {
      alert(t('Please select a shoe size.'));
      return;
    }

    const sizeCategory = sizeData[gender];

    // Find the size by matching foot length
    const sizeMatch = sizeCategory.find((size) => size.footLength === shoeSize);

    if (!sizeMatch) {
      setConvertedSizes({});
      alert(t('Size not found for the given foot length.'));
      return;
    }

    setConvertedSizes(sizeMatch);
  };

  
  const handleReset = () => {
    setGender('Men');
    setRegion('US'); // Reset region as well
    setShoeSize('');
    setConvertedSizes({});
  };
  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert("Size copied to clipboard!");
  };

  const categoryLabel = t('Category'); // Default value
  const sizeLabel = t('Select Shoe Size'); // Default value
  const selectSize = t('Choose Size'); // Default value
  const convertButton = t('Convert'); // Default value
  const convertedSizesLabel = t('Converted Sizes'); // Default value
  const regionLabel = t('Region'); // Default value
  const actionLabel = t('Action'); // Default value

  return (
    <div className="max-w-7xl mx-auto">
    <div className="max-w-5xl mx-auto p-6 mt-5 mb-5 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">{t("Dr. Martens Shoe Size Converter")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Category Selection */}
        <div>
          <label className="block mb-2">{categoryLabel}</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Men">{t("Men")}</option>
            <option value="Women">{t("Women")}</option>
            <option value="Infant">{t("Infant")}</option>
            <option value="Toddler">{t("Toddler")}</option>
            <option value="Youth">{t("Youth")}</option>
            <option value="Junior">{t("Junior")}</option>
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
            <option value="EU">EU</option>
            <option value="CM">CM</option>
            <option value="UK">UK</option>
            <option value="BZ">BZ</option>
          </select>
        </div>

        {/* Shoe Size Selection */}
        
          <div>
          <label className="block mb-2">{t("Select Foot Length")}</label>
        <select
          value={shoeSize}
          onChange={(e) => setShoeSize(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
        >
          {sizeData[gender].map((size, index) => (
            <option key={index} value={size.footLength}>
              {size.footLength}
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

  const translations = await serverSideTranslations(locale, ['dr-martens', 'shoeSizeConverter']);

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
      ...(await serverSideTranslations (locale, ['dr-martens', 'navbar','footer'])),
    },
  };
}
}

export default TimberlandShoeSizeConverter;