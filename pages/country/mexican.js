import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';
const MexicanShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("mexican")
  const [fromUnit, setFromUnit] = useState('MX (cm)'); // Default from unit
  const [toUnit, setToUnit] = useState('US mexican\'s'); // Default to unit
  const [size, setSize] = useState(''); // Selected size
  const [convertedSize, setConvertedSize] = useState('');

  // Mexican Shoe Size Conversion Data
  const shoeSizeData = {
    'MX (cm)': [19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34],
    'Foot Length (Inches)': ['7 2⁄3', '7 5⁄6', '8', '8 1⁄6', '8 1⁄3', '8 1⁄2', '8 2⁄3', '8 5⁄6', '9', '9 1⁄6', '9 1⁄3', '9 1⁄2', '9 2⁄3', '9 5⁄6', '10', '10 1⁄6', '10 1⁄3', '10 1⁄2', '10 2⁄3', '10 5⁄6', '11', '11 1⁄6', '11 1⁄3', '11 1⁄2', '11 2⁄3', '11 5⁄6', '12', '12 1⁄6', '12 1⁄3', '12 1⁄2', '12 2⁄3'],
    'US mexican\'s': [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5],
    'US Womexican\'s': [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17],
    'UK': [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15],
    'EU': [32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36.5, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41.5, 41.5, 42.5, 43.5, 44, 44.5, 45.5, 46, 46.5, 47, 47.5, 48.5, 49, 49.5, 50],
  };

  const handleConversion = () => {
    const fromIndex = shoeSizeData[fromUnit].indexOf(Number(size) || size);
    if (fromIndex === -1) {
      setConvertedSize('Invalid size');
      return;
    }
    setConvertedSize(shoeSizeData[toUnit][fromIndex]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${fromUnit} size ${size} = ${toUnit} size ${convertedSize}`);
    toast.success(t('Size copied to clipboard!'), {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleReset = () => {
    setFromUnit('MX (cm)');
    setToUnit('US mexican\'s');
    setSize('');
    setConvertedSize('');
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
      
        <Head>
            {/* SEO Meta Tags */}
            <title>{meta?.title}</title>
            <meta name="description" content={meta?.description} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="robots" content="index, follow" />

            {/* Canonical URL */}
            <link rel="canonical" href={`${meta?.url}/country/mexican`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/country/mexican`} />
            <meta property="og:title" content={meta?.title} />
            <meta property="og:description" content={meta?.description} />
            <meta
              property="og:image"
              content="https://ytubetools.s3.eu-north-1.amazonaws.com/uploads/1732959231638-youtubechannelidfinderb.png"
            />
            <meta
              property="og:image:secure_url"
              content="https://ytubetools.s3.eu-north-1.amazonaws.com/uploads/1732959231638-youtubechannelidfinderb.png"
            />
            <meta property="og:site_name" content="Ytubetools" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:domain" content={`${meta?.url}/country/mexican`} />
            <meta property="twitter:url" content={`${`${meta?.url}/country/mexican`}`} />
            <meta name="twitter:title" content={meta?.title} />
            <meta name="twitter:description" content={meta?.description} />
            <meta
              name="twitter:image"
              content="https://ytubetools.s3.eu-north-1.amazonaws.com/uploads/1732959231638-youtubechannelidfinderb.png"
            />
            <meta name="twitter:site" content="@ytubetools" />
            <meta name="twitter:image:alt" content="channel-id-finder" />

            {/* Alternate hreflang Tags for SEO */}
            {hreflangs &&
              hreflangs.map((hreflang, index) => (
                <link
                  key={index}
                  rel={hreflang.rel}
                  hreflang={hreflang.hreflang}
                  href={`${hreflang.href}/country/mexican`}
                />
              ))}
            {/* <link
            rel="alternate"
            hreflang="en"
            href={meta?.url?.replace(/\/$/, "").replace(/\/$/, "")}
          /> */}
          </Head>
          {/* JSON-LD Structured Data */}
          <Script id="webpage-structured-data" type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta?.title || "Default Title",
    url: `${meta?.url || "https://defaulturl.com"}${
      i18n.language !== "en" && !meta?.url.includes(`/${i18n.language}`)
        ? `/${i18n.language}`
        : ""
    }/country/mexican`,
    description: meta?.description || "Default description for the webpage.",
    breadcrumb: {
      "@id": `${meta?.url || "https://defaulturl.com"}#breadcrumb`,
    },
    about: {
      "@type": "Thing",
      name: meta?.title || "Default Title",
    },
    isPartOf: {
      "@type": "WebSite",
      url: meta?.url || "https://defaulturl.com",
    },
  })}
</Script>

         

          <Script id="faq-structured-data" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            })}
          </Script>
      <div className="flex flex-col max-w-6xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">{t("Mexican Shoe Size Converter")}</h2>
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="fromUnit" className="block mb-2 text-sm font-medium text-gray-700">
              {t("From")}:
            </label>
            <select
              id="fromUnit"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.keys(shoeSizeData).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              {t("Size")}:
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a size</option>
              {shoeSizeData[fromUnit]?.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
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
              {Object.keys(shoeSizeData).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center gap-4 border-b pb-2">
          <button
            onClick={handleConversion}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t("Convert Size")}
          </button>
          
        </div>
        {convertedSize && (
          <div className="text-center text-2xl text-gray-800">
            {t("Converted Size")}: <span className="font-bold text-blue-600">{convertedSize}</span>
            <div className="mt-4">
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {t("Copy")} 
              </button>
              <button
            onClick={handleReset}
            className="px-6 ms-2 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {"Reset"}
          </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Shoe Size Chart</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  {Object.keys(shoeSizeData).map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shoeSizeData['MX (cm)'].map((_, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    {Object.keys(shoeSizeData).map((unit, unitIndex) => (
                      <td
                        key={unitIndex}
                        className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-600"
                      >
                        {shoeSizeData[unit][index]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ToastContainer />
      </div>
      <div className="content pt-6 pb-5">
        <article
          dangerouslySetInnerHTML={{ __html: content || "No content available." }}
          style={{ listStyleType: "none" }}
        ></article>
      </div>
    </div>
   
  );
};
export async function getStaticProps(context) {
  return getContentProps("mexican", context.locale, context.req);
}
export default MexicanShoeSizeConverter;
