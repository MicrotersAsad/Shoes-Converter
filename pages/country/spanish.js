import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';

const SpanishShoeSizeConverter = ({content}) => {
  const {t}=useTranslation("spanish")
  const [category, setCategory] = useState('women'); // Default category
  const [toUnit, setToUnit] = useState('UK'); // Default "To" unit
  const [size, setSize] = useState(''); // Selected size in Spanish (EU)
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight

  // Spanish Shoe size data
  const spanishShoeSizeData = {
    categories: {
      women: {
        title: t("Women's Shoe Sizes - International Conversion"),
        data: [
          { unit: 'Spanish (EU)', sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43'] },
          { unit: 'UK', sizes: ['2.55', '3.56', '4.57', '5.58', '6.59', '7.60', '8.61', '9.62', '10.63'] },
          { unit: 'US', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'CAN & AUS', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'EUR', sizes: ['35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5'] },
          { unit: 'JAP (cm)', sizes: ['22', '22.5', '23', '23.5', '24', '24.5', '25', '25.5', '26'] },
        ],
      },
      men: {
        title: t("Men's Shoe Sizes - International Conversion"),
        data: [
          { unit: 'Spanish (EU)', sizes: ['39', '40', '42', '43', '44', '45', '46', '47', '48'] },
          { unit: 'UK', sizes: ['6.57', '6.57', '7.58', '8.59', '9.51', '10.51', '11.12', '12.13', '13'] },
          { unit: 'US', sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'] },
          { unit: 'CAN & AUS', sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'EUR', sizes: ['39', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5'] },
          { unit: 'JAP (cm)', sizes: ['24', '24.5', '25', '25.5', '26', '26.5', '27', '27.5', '28'] },
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
    setToUnit(spanishShoeSizeData.categories[category].data[1].unit); // Default "To" unit as first "To" unit
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

    const categoryData = spanishShoeSizeData.categories[category].data;
    const fromRow = categoryData.find((row) => row.unit === 'Spanish (EU)');

    if (!fromRow) {
      toast.error(`Spanish (EU) data not found for category: ${category}`, {
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
    setToUnit(spanishShoeSizeData.categories['women'].data[1].unit); // Reset "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
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
            <link rel="canonical" href={`${meta?.url}/country/spanish`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/country/spanish`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/country/spanish`} />
            <meta property="twitter:url" content={`${`${meta?.url}/country/spanish`}`} />
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
                  href={`${hreflang.href}/country/spanish`}
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
    }/country/spanish`,
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
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">{t("Spanish Shoe Size Converter")}</h2>

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
              {t("Size")} (Spanish EU):
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
              {spanishShoeSizeData.categories[category].data
                .find((row) => row.unit === 'Spanish (EU)')
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
              {spanishShoeSizeData.categories[category].data
                .filter((row) => row.unit !== 'Spanish (EU)')
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
              <span>{`Size ${size} Spanish (EU) = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Size ${size} Spanish (EU) = ${convertedSize} ${toUnit}`);
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
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{spanishShoeSizeData.categories[category].title}</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              {spanishShoeSizeData.categories[category].data.map((row, index) => (
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
            {spanishShoeSizeData.categories[category].data[0].sizes.map((_, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {spanishShoeSizeData.categories[category].data.map((row, index) => (
                  <td
                    key={index}
                    className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                      highlightIndex === i && row.unit !== 'Spanish (EU)' ? 'bg-blue-100 font-bold' : ''
                    }`}
                  >
                    {row.sizes[i] !== '-' ? row.sizes[i] : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
      return getContentProps("spanish", context.locale, context.req);
    }

export default SpanishShoeSizeConverter;
