import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AlegriaShoeSizeChart = ({ content }) => {
  const {t}=useTranslation("alegria")
  const [gender, setGender] = useState("mens");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});

  // Shoe size data for Men and Women
  const sizeData = {
    womens: [
      { Euro: 35, US: "5/5.5", Australia: "4", UK: "3", Japan: "21" },
      { Euro: 36, US: "6/6.5", Australia: "4.5", UK: "3.5", Japan: "22" },
      { Euro: 37, US: "7/7.5", Australia: "5", UK: "4", Japan: "22.5" },
      { Euro: 38, US: "8/8.5", Australia: "6", UK: "5", Japan: "23.5" },
      { Euro: 39, US: "9", Australia: "7", UK: "6", Japan: "24.5" },
      { Euro: 40, US: "9.5/10", Australia: "7.5", UK: "6.5", Japan: "25" },
      { Euro: 41, US: "10.5/11", Australia: "8", UK: "7", Japan: "25.5" },
      { Euro: 42, US: "11.5/12", Australia: "8.5", UK: "7.5", Japan: "26" },
      { Euro: 43, US: "13", Australia: "9", UK: "8", Japan: "27" },
      { Euro: 44, US: "14", Australia: "9.5", UK: "8.5", Japan: "28" },
    ],
    mens: [
      { Euro: 40, US: "7" },
      { Euro: 41, US: "8" },
      { Euro: 42, US: "9" },
      { Euro: 43, US: "9.5" },
      { Euro: 44, US: "10" },
      { Euro: 45, US: "11" },
      { Euro: 46, US: "12" },
      { Euro: 47, US: "13" },
      { Euro: 48, US: "14" },
    ],
  };

  const handleReset = () => {
    setGender("mens");
    setShoeSize("");
    setConvertedSizes({});
  };

  const handleConvert = () => {
    const selectedGender = sizeData[gender];
    const selectedRow = selectedGender.find((row) => row.US === shoeSize);
    setConvertedSizes(selectedRow || {});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert(t("Size copied to clipboard!"));
  };

  const genderData = sizeData[gender] || [];

  // Content Fallback
  const categoryLabel = content?.categoryLabel || t("Category");
  const sizeLabel = content?.sizeLabel || t("Select Shoe Size");
  const selectSize = content?.selectSize || t("Choose Size");
  const convertButton = content?.convertButton || t("Convert");
  const convertedSizesLabel = content?.convertedSizesLabel || t("Converted Sizes");
  const regionLabel = content?.regionLabel || t("Region");
  const actionLabel = content?.actionLabel || t("Action");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          {t("Alegria Shoe Size Converter")}
        </h1>

        {/* Gender and Shoe Size Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2">{categoryLabel}</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="mens">{t("Men")}</option>
              <option value="womens">{t("Women")}</option>
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
              {genderData.map((row, idx) => (
                <option key={idx} value={row.US}>
                  {row.US}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-9">
            <button
              onClick={handleConvert}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              {convertButton}
            </button>
          </div>
        </div>

        {/* Converted Sizes Table */}
        {Object.keys(convertedSizes).length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">{convertedSizesLabel}</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">{regionLabel}</th>
                  <th className="border px-4 py-2">{sizeLabel}</th>
                  <th className="border px-4 py-2">{actionLabel}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(convertedSizes).map(([region, size], idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2 text-center">{region}</td>
                    <td className="border px-4 py-2 text-center">{size}</td>
                    <td className="border px-4 py-2 text-center">
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
    </div>
  );
};

export async function getStaticProps({ locale }) {
  try {
    // Define the authorization token (you can replace this with an actual token)
    const AUTH_TOKEN = 'AZ-fc905a5a5ae08609ba38b046ecc8ef00';  // Replace with your token or fetch from an env variable

    // Fetch the content data with authorization header
    const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=alegria&language=${locale}`, {
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
    const translations = await serverSideTranslations(locale, ['alegria', 'shoeSizeConverter']);

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
        ...(await serverSideTranslations (locale, ['alegria', 'navbar','footer'])),
      },
    };
  }
}

export default AlegriaShoeSizeChart;
