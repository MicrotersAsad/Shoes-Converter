import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChineseShoeSizeConverter = ({content}) => {
  const {t}=useTranslation("chinese")
  const sizeData = {
    women: {
      "US": [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      "UK": [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
      "EU": [35, 35.5, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5],
      "China": [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280],
      "Mondo (CM)": [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28],
      "Foot Length (In)": [8.7, 8.9, 9.1, 9.3, 9.5, 9.7, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11],
    },
    men: {
      "US": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      "UK": [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      "EU": [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46],
      "China": [245, 250, 255, 260, 265, 270, 270, 275, 280, 285, 290, 295, 305],
      "Mondo (CM)": [24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5],
      "Foot Length (In)": [9.7, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12],
    },
    toddlers: {
      "US": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "UK": [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      "EU": [16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      "Foot Length (In)": [3.54, 3.94, 4.21, 4.53, 4.92, 5.24, 5.51, 5.91, 6.26, 6.57],
    },
    kids: {
      "US": [11, 12, 13, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
      "UK": [10, 11, 12, 13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      "EU": [28, 29, 30, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38],
      "Foot Length (In)": [6.8, 7.1, 7.4, 7.9, 8.1, 8.2, 8.4, 8.6, 8.7, 8.9, 9.1, 9.2, 9.4, 9.5, 9.7, 9.8],
    },
  };

  const [category, setCategory] = useState("women");
  const [fromUnit, setFromUnit] = useState("US");
  const [toUnit, setToUnit] = useState("China");
  const [size, setSize] = useState("");
  const [convertedSize, setConvertedSize] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleConversion = () => {
    if (!size) {
      toast.error(t("Please select a size."));
      return;
    }
    const fromIndex = sizeData[category][fromUnit].indexOf(Number(size));
    if (fromIndex === -1) {
      toast.error(t("Invalid size selected."));
      return;
    }
    setConvertedSize(sizeData[category][toUnit][fromIndex]);
    setHighlightIndex(fromIndex);
  };

  const handleReset = () => {
    setSize("");
    setConvertedSize("");
    setHighlightIndex(null);
  };
 const handleCopy = () => {
    navigator.clipboard.writeText(` ${convertedSize} ${toUnit}`);
    toast.success(t("Result copied to clipboard!"));
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
         <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">{t("Chinese Shoe Size Converter")}</h1>

        <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="women">{t("Women")}</option>
            <option value="men">{t("Men")}</option>
            <option value="toddlers">{t("Toddlers")}</option>
            <option value="kids">{t("Kids")}</option>
          </select>
</div>
<div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {Object.keys(sizeData[category]).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          </div>

          <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.keys(sizeData[category]).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          </div>
          <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">{t("Select Size")}</option>
            {sizeData[category][fromUnit].map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          </div>
        
        </div>

        <div className="flex justify-center gap-4">
        <button onClick={handleConversion} className="px-4 py-2 bg-blue-500 text-white rounded">{t("Convert")}</button>
        </div>
     

        {/* {convertedSize && <p className="text-center text-xl">Converted Size: {convertedSize} {toUnit}</p> } */}

         {/* Result */}
         {convertedSize && (
  <div className="mt-6 text-center">
    <p className="text-xl font-semibold">
      {fromUnit} Size {size} = <span className="text-red-500">{convertedSize} {toUnit}</span>
    </p>
    <button
      onClick={() => {
        navigator.clipboard.writeText(`${fromUnit} Size ${size} = ${convertedSize} ${toUnit}`);
        toast.success("Result copied to clipboard!");
      }}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      {t("Copy")}
    </button>
    <button
      onClick={handleReset}
      className="px-4 py-2 ms-3 bg-red-500 text-white rounded hover:bg-red-600"
    >
      {t("Reset")}
    </button>
  </div>
)}

        
      </div>
        <ToastContainer />

        <table className="w-full border mt-6">
          <thead>
            <tr>
              {Object.keys(sizeData[category]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeData[category][fromUnit].map((_, i) => (
              <tr key={i} className={highlightIndex === i ? "bg-yellow-200" : ""}>
                {Object.values(sizeData[category]).map((sizes) => (
                  <td key={sizes[i]} className="border p-2">{sizes[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
    const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=chinese&language=${locale}`, {
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
    const translations = await serverSideTranslations(locale, ['chinese', 'shoeSizeConverter']);

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
        ...(await serverSideTranslations (locale, ['chinese', 'navbar','footer'])),
      },
    };
  }
}
export default ChineseShoeSizeConverter;
