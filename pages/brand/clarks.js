import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';

const ClarksShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("clarks")
  const [gender, setGender] = useState('clarks'); // Default gender
  const [region, setRegion] = useState('US'); // Default region
  const [shoeSize, setShoeSize] = useState(''); // Selected shoe size
  const [convertedSizes, setConvertedSizes] = useState({}); // Resultant converted sizes
  const [copyMessage, setCopyMessage] = useState(''); // Copy confirmation message

  // Clarks shoe size data
  const clarksSizeData = {
    clarks: {
      US: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      EU: [39, 40, 40.5, 41, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46],
      Inches: [9.3, 9.5, 9.7, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6],
    },
    Woclarks: {
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],
      EU: [35, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5],
      Inches: [8.2, 8.3, 8.5, 8.7, 8.8, 9, 9.2, 9.4, 9.5, 9.7, 9.8],
    },
    Kids: {
      US: [3.5, 4, 4.5, 5, 5.5, 6],
      UK: [2.5, 3, 3.5, 4, 4.5, 5],
      EU: [34, 34.5, 35, 35.5, 36, 36.5],
      Inches: [8.5, 8.7, 8.8, 9, 9.2, 9.4],
    },
  };

  const handleConvert = () => {
    const sizes = clarksSizeData[gender][region];
    const index = sizes.indexOf(Number(shoeSize));
    if (index === -1) {
      setConvertedSizes({});
      return;
    }

    const results = {};
    Object.keys(clarksSizeData[gender]).forEach((key) => {
      results[key] = clarksSizeData[gender][key][index];
    });

    setConvertedSizes(results);
  };

  const handleCopy = (region, size) => {
    const textToCopy = `${region}: ${size}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyMessage(`Copied "${textToCopy}" to clipboard!`);
      setTimeout(() => setCopyMessage(''), 2000); // Clear message after 2 seconds
    });
  };

  return (
    <div className="max-w-7xl mx-auto ">
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
            <link rel="canonical" href={`${meta?.url}/brand/clarks`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/clarks`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/clarks`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/clarks`}`} />
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
                  href={`${hreflang.href}/brand/clarks`}
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
    }/brand/clarks`,
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
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-100 shadow-md rounded-lg">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
       {t("Clarks Shoe Size Converter")}
      </h1>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("Gender")}:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="clarks">{t("clarks")}</option>
            <option value="Woclarks">{t("Woclarks")}</option>
            <option value="Kids">{t("Kids")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region:</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="EU">EU</option>
            <option value="Inches">Inches</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("Shoe Size")}:</label>
          <select
            value={shoeSize}
            onChange={(e) => setShoeSize(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">{t("Select a size")}</option>
            {clarksSizeData[gender][region].map((size, index) => (
              <option key={index} value={size}>
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
          className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {t("Convert Size")}
        </button>
      </div>

      {/* Results */}
      {Object.keys(convertedSizes).length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t("Converted Sizes")}:</h2>
          <table className="w-full border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-indigo-100">
                <th className="border border-gray-300 px-4 py-2 text-left">{t("Region")}</th>
                <th className="border border-gray-300 px-4 py-2 text-left">{t("Size")}</th>
                <th className="border border-gray-300 px-4 py-2 text-center">{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(convertedSizes).map(([key, value]) => (
                <tr key={key} className="bg-white hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{key}</td>
                  <td className="border border-gray-300 px-4 py-2">{value}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleCopy(key, value)}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      {t("Copy")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {copyMessage && (
            <div className="mt-4 text-green-600 text-center font-medium">{copyMessage}</div>
          )}
        </div>
      )}

      {Object.keys(convertedSizes).length === 0 && shoeSize && (
        <div className="mt-10 text-center text-red-600 font-semibold">
          {t("Invalid size or conversion unavailable.")}
        </div>
      )}
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
  return getContentProps("clarks", context.locale, context.req);
}


export default ClarksShoeSizeConverter;
