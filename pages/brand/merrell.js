import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MerrellShoeSizeChart = ({content}) => {
  const {t}=useTranslation("merrell")
  const [category, setCategory] = useState("mens"); // Default category
  const [region, setRegion] = useState("USA"); // Default region
  const [shoeSize, setShoeSize] = useState(""); // Selected shoe size
  const [filteredSizes, setFilteredSizes] = useState([]); // Filtered results

  // Shoe size data
  const sizeData = {
    mens: [
      { USA: 3, UK: 2, EUR: 35, JPN: "22.5", CHN: "225" },
      { USA: 4, UK: 3, EUR: 36, JPN: "23", CHN: "230" },
      { USA: 5, UK: 4, EUR: 37.5, JPN: "24", CHN: "240" },
      { USA: 6, UK: 5, EUR: 38.5, JPN: "24.5", CHN: "245" },
      { USA: 8, UK: 7, EUR: 41, JPN: "26", CHN: "260" },
      { USA: 9, UK: 8, EUR: 42.5, JPN: "27", CHN: "270" },
      { USA: 10, UK: 9, EUR: 44, JPN: "28", CHN: "280" },
    ],
    womens: [
      { USA: 4, UK: 2, EUR: 34.5, JPN: "21.5", CHN: "215" },
      { USA: 5, UK: 3, EUR: 35.5, JPN: "22", CHN: "220" },
      { USA: 6, UK: 4, EUR: 37, JPN: "23", CHN: "230" },
      { USA: 7, UK: 5, EUR: 37.5, JPN: "23.5", CHN: "235" },
      { USA: 8, UK: 6, EUR: 38.5, JPN: "24.5", CHN: "245" },
      { USA: 9, UK: 7, EUR: 40, JPN: "25.5", CHN: "255" },
    ],
    baby: [
        { USA: 0, UK: 15, EUR: 0 },
        { USA: 1, UK: 16.5, EUR: 0 },
        { USA: 2, UK: 17.5, EUR: 1.5 },
        { USA: 2.5, UK: 18, EUR: 2 },
      ],
      toddler: [
        { USA: 8.5, UK: 25.5, EUR: 8 },
        { USA: 9, UK: 26, EUR: 8.5 },
        { USA: 9.5, UK: 26.5, EUR: 9 },
        { USA: 10, UK: 27.5, EUR: 9.5 },
      ],
      kids: [
        { USA: 12.5, UK: 30.5, EUR: 12 },
        { USA: 13, UK: 31, EUR: 12.5 },
        { USA: 1, UK: 32.5, EUR: 13.5 },
        { USA: 2, UK: 33.5, EUR: 1.5 },
      ],
  };

  // Generate unique sizes for the selected region
  const getRegionSizes = () => {
    const currentData = sizeData[category];
    const uniqueSizes = [...new Set(currentData.map((row) => row[region]))];
    return uniqueSizes.filter((size) => size); // Exclude undefined values
  };

  const handleFilter = () => {
    const currentData = sizeData[category];
    const filtered = currentData.filter((row) => row[region]?.toString() === shoeSize);
    setFilteredSizes(filtered);
  };

  const handleReset = () => {
    setShoeSize("");
    setFilteredSizes([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          {t("Merrell Shoe Size Conversion")}
        </h1>

        {/* Dropdown Selections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Category Selection */}
          <div>
            <label className="block mb-2 font-bold">{t("Category")}</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setShoeSize("");
                setFilteredSizes([]);
              }}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="mens">{t("Men's Footwear")}</option>
              <option value="womens">{t("Women's Footwear")}</option>
              <option value="baby">{t("Baby's Footwear")}</option>
              <option value="toddler">{t("Toddler's Footwear")}</option>
              <option value="kids">{t("Kid's Footwear")}</option>
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label className="block mb-2 font-bold">{t("Region")}</label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setShoeSize("");
                setFilteredSizes([]);
              }}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="EUR">EUR</option>
              <option value="JPN">JPN (cm)</option>
              <option value="CHN">CHN (mm)</option>
            </select>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block mb-2 font-bold">{t("Select Size")}</label>
            <select
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">{t("Select Size")}</option>
              {getRegionSizes().map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center mb-6">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 mr-4"
          >
            {t("Filter")}
          </button>
          
        </div>

        {/* Filtered Table */}
        {filteredSizes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-center">{t("Filtered Sizes")}</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">USA</th>
                  <th className="border px-4 py-2">UK</th>
                  <th className="border px-4 py-2">EUR</th>
                  <th className="border px-4 py-2">JPN (cm)</th>
                  <th className="border px-4 py-2">CHN (mm)</th>
                </tr>
              </thead>
              <tbody>
                {filteredSizes.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-100 text-center">
                    <td className="border px-4 py-2">{row.USA || "-"}</td>
                    <td className="border px-4 py-2">{row.UK || "-"}</td>
                    <td className="border px-4 py-2">{row.EUR || "-"}</td>
                    <td className="border px-4 py-2">{row.JPN || "-"}</td>
                    <td className="border px-4 py-2">{row.CHN || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         <div className="text-center mt-4">
         <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=merrell&language=${locale}`,
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
    
      const translations = await serverSideTranslations(locale, ['merrell', 'shoeSizeConverter']);
    
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
          ...(await serverSideTranslations (locale, ['merrell', 'navbar','footer'])),
        },
      };
    }
    }
    

export default MerrellShoeSizeChart;
