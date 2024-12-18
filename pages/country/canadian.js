import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CanadianShoeSizeConverter = ({ content, locale }) => {
  const {t}=useTranslation("canadian")
  const shoeSizeData = {
    women: {
      CANADA_US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      EUROPE: ["35-36", "36", "36-37", "37", "37-38", "38", "38-39", "39", "39-40", "40", "40-41", "41", "41-42", "42", "42-43"],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      AU_BLUNDSTONE: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
      CM: [21.6, 22.2, 22.5, 23, 23.5, 23.8, 24.1, 24.6, 25.1, 25.4, 25.9, 26.2, 26.7, 27.1, 27.6],
    },
    men: {
        CANADA_US: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15, 16],
        EUROPE: ["40", "40-41", "41", "41-42", "42", "42-43", "43", "43-44", "44", "44-45", "45", "46", "47", "48", "49"],
        UK: [6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5, 15.5],
        AU_BLUNDSTONE: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13, 14, 15],
        CM: [24.6, 24.8, 25.4, 25.7, 26.2, 26.7, 27, 27.1, 27.9, 28.3, 28.6, 29.4, 30.2, 31, 31.8],
      },
      youth: {
        CANADA_US: [13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
        EUROPE: ["31", "31", "32", "33", "33", "34", "34", "35", "36", "36", "37", "37", "38", "38", "39"],
        UK: [12, 12.5, 13, 14, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
        AU_BLUNDSTONE: [12, 12.5, 13, 14, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
        CM: [19.1, 19.4, 19.7, 20.3, 20.6, 21, 21.6, 21.9, 22.2, 22.9, 23.2, 23.5, 24.1, 24.4, 24.8],
      },
  };

  
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [category, setCategory] = useState("women");
  const [size, setSize] = useState("");
  const [toUnit, setToUnit] = useState("EUROPE");
  const [convertedSize, setConvertedSize] = useState("");
  const handleConversion = () => {
    if (!size) {
      toast.error(t("Please select a size first."));
      return;
    }
    const fromIndex = shoeSizeData[category]["CANADA_US"].indexOf(Number(size));
    const result = shoeSizeData[category][toUnit][fromIndex];
    setConvertedSize(result);
    setHighlightIndex(fromIndex);
  };

  const handleReset = () => {
    setSize("");
    setConvertedSize("");
    setHighlightIndex(null);
    toast.info(t("Selections reset."));
  };

  const handleCopy = () => {
    const text = `Canada/US Size ${size} = ${convertedSize} ${toUnit}`;
    navigator.clipboard.writeText(text);
    toast.success(t("Copied to clipboard!"));
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <h1 className="text-2xl font-bold text-center mb-4">{t("Canadian Shoe Size Converter")}</h1>
      <div className="flex flex-col max-w-4xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
     
      {/* Selectors */}
      <div className="flex flex-wrap gap-6">
         {/* Category Selector */}
         <div className="flex-1 min-w-[200px]">
        <label className="block mb-2 font-medium">{t("Category")}:</label>
        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setConvertedSize("");
            setSize("");
          }}
        >
          <option value="women">{t('Women')}</option>
          <option value="men">{t("Men")}</option>
          <option value="youth">{t("Youth")}</option>
        </select>
      </div>
      <div className="flex-1 min-w-[200px]">
          <label className="block mb-2 font-medium">Canada/US {t("Size")}:</label>
          <select
            className="w-full p-2 border rounded"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">{t("Select Size")}</option>
            {shoeSizeData[category]["CANADA_US"].map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-2 font-medium">{t("Convert To")}:</label>
          <select
            className="w-full p-2 border rounded"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {Object.keys(shoeSizeData[category]).map(
              (unit) => unit !== "CANADA_US" && <option key={unit} value={unit}>{unit}</option>
            )}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handleConversion}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t("Convert")}
        </button>
      
      </div>

      {/* Result */}
      {convertedSize && (
        <div className="text-center mb-4">
          <p className="text-xl font-semibold">
            Canada/US {t("Size")} {size} ={" "}
            <span className="text-red-500">
              {convertedSize} {toUnit}
            </span>
          </p>
         <div className="mt-3">
         <button
          onClick={handleCopy}
          className="px-4 py-2 shadow bg-green-500 text-white rounded hover:bg-green-600"
          disabled={!convertedSize}
        >
          {t("Copy")}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 ms-3 shadow bg-red-500 text-white rounded hover:bg-red-600"
        >
          {t("Reset")}
        </button>
         </div>
        </div>
      )}

      <ToastContainer />
</div>
      {/* Conversion Table */}
      <h2 className="text-xl font-bold mt-6 mb-4 text-center">{t("Size Conversion Table")}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(shoeSizeData[category]).map((unit, i) => (
                <th key={i} className="border p-2">
                  {unit.replace("_", " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shoeSizeData[category]["CANADA_US"].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  highlightIndex === rowIndex ? "bg-yellow-200 font-bold" : rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                }
              >
                {Object.values(shoeSizeData[category]).map((sizes, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border p-2 ${
                      highlightIndex === rowIndex ? "bg-yellow-200 font-bold" : ""
                    }`}
                  >
                    {sizes[rowIndex]}
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
    const translations = await serverSideTranslations(locale, ['canadian', 'shoeSizeConverter']);

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
        ...(await serverSideTranslations (locale, ['canadian', 'navbar','footer'])),
      },
    };
  }
}
export default CanadianShoeSizeConverter;
