import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

const AsicsShoeSizeConverter  = ({ content, locale }) => {
  const [gender, setGender] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});

  // Shoe size data (example: for Men/Women/Kids)
  const sizeData = {
    men: {
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15, 16, 17],
      EU: [36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41.5, 42, 42.5, 43.5, 44, 44.5, 45, 46, 46.5, 47, 48, 49, 50.5, 51.5, 53, 54],
      CM: [22.5, 23, 23.5, 24, 24.5, 25, 25.25, 25.5, 26, 26.5, 27, 27.5, 28, 28.25, 28.5, 29, 29.5, 30, 30.5, 31, 32, 33, 34, 34.5],
      US: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15, 16, 17, 18],
    },
    women: {
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      EU: [35.5, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41.5, 42, 42.5, 43.5, 44, 44.5, 45, 46, 46.5, 47],
      CM: [22.5, 22.75, 23, 23.5, 24, 24.5, 25, 25.5, 25.75, 26, 26.5, 27, 27.5, 28, 28.5, 28.75, 29, 29.5, 30],
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14],
    },
    kids: {
      UK: ["K3", "K4", "K5", "K6", "K7", "K8", "K9", "K9H", "K10", "K10H", "K11", "K11H", "K12", "K12H", "K13", "K13.5", 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      EU: [19.5, 21, 22.5, 23.5, 25, 26, 27, 28, 28.5, 29.5, 30, 30.5, 31.5, 32, 32.5, 33, 33.5, 34.5, 35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40],
      CM: [11.5, 13, 14, 15, 15.5, 16, 17, 17.25, 17.5, 18, 18.5, 19, 19.5, 19.75, 20, 20.5, 21, 21.5, 22, 22.25, 22.5, 23, 23.5, 24, 24.5, 25, 25.5],
      US: ["K4", "K5", "K6", "K7", "K8", "K9", "K10", "K10H", "K11", "K11H", "K12", "K12H", "K13", "K13H", 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
    },
  };

  // Ensure gender state is valid
  const genderData = sizeData[gender.toLowerCase()];
  if (!genderData) {
    console.error(`Invalid gender selection: ${gender}`);
    return null; // Or set to default gender or show a fallback UI
  }

  const handleConvert = () => {
    if (!shoeSize) {
      setConvertedSizes({});
      return;
    }

    const sizes = genderData["US"];
    const index = sizes.findIndex((size) => size.toString() === shoeSize.toString());
    if (index === -1) {
      setConvertedSizes({});
      return;
    }

    const results = {};
    Object.keys(genderData).forEach((key) => {
      results[key] = genderData[key][index];
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

  // Fallback content labels
  const categoryLabel = content?.categoryLabel || "Category";
  const sizeLabel = content?.sizeLabel || "Select Shoe Size";
  const selectSize = content?.selectSize || "Choose Size";
  const convertButton = content?.convertButton || "Convert";
  const convertedSizesLabel = content?.convertedSizesLabel || "Converted Sizes";
  const regionLabel = content?.regionLabel || "Region";
  const actionLabel = content?.actionLabel || "Action";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="max-w-5xl mx-auto p-6 mt-5 mb-5 bg-white rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Asics Shoe Size Converter </h1>

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
              <option value="kids">Kids</option>
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
              {genderData?.US?.map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
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
    const AUTH_TOKEN = 'AZ-fc905a5a5ae08609ba38b046ecc8ef00';

    const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=tagGenerator&language=${locale}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!contentResponse.ok) {
      throw new Error('Failed to fetch content');
    }

    const contentData = await contentResponse.json();

    const translations = await serverSideTranslations(locale, ['men', 'AsicsShoeSizeConverter ']);

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
          selectSize: 'Choose Size',
          convertButton: 'Convert',
          convertedSizesLabel: 'Converted Sizes',
          regionLabel: 'Region',
          actionLabel: 'Action',
        },
        translations: await serverSideTranslations(locale, ['men', 'AsicsShoeSizeConverter ']),
      },
    };
  }
}

export default AsicsShoeSizeConverter ;
