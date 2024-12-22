import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';
const GermanShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("german")
    const sizeData = {
        women: {
          "UK size": [2.5, 3.5, 4, 5, 6, 6.5, 7, 8],
          "US size": [5, 5.5, 6, 7, 8, 8.5, 9, 10],
          "Germany (EU) size": [35, 36, 37, 38, 39, 40, 41, 43],
        },
        men: {
          "UK size": [6, 6.5, 7, 7.5, 8, 9.5, 10.5, 11, 12],
          "US size": [7, 7.5, 8, 8.5, 9, 10.5, 11.5, 12, 13],
          "Germany (EU) size": [39, 40, 41, 42, 43, 44, 45, 46, 47],
        },
      };
    
  const [category, setCategory] = useState("men");
  const [size, setSize] = useState("");
  const [toUnit, setToUnit] = useState("Germany (EU) size");
  const [convertedSize, setConvertedSize] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleConversion = () => {
    if (!size) {
      toast.error(t("Please select a UK size."));
      return;
    }
    const fromIndex = sizeData[category]["UK size"].indexOf(Number(size));
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
    navigator.clipboard.writeText(`UK Size ${size} = ${convertedSize} ${toUnit}`);
    toast.success(t("Result copied to clipboard!"));
  };


  return (
    <div className="container mx-auto max-w-7xl p-6">
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
            <link rel="canonical" href={`${meta?.url}/country/german`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/country/german`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/country/german`} />
            <meta property="twitter:url" content={`${`${meta?.url}/country/german`}`} />
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
                  href={`${hreflang.href}/country/german`}
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
    }/country/german`,
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
       <div className="flex flex-col max-w-4xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">{t("German Shoe Size Converter")}</h1>

      
        <div className="flex flex-wrap gap-6">
          {/* Category Selector */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 font-medium">{t("Category")}:</label>
            <select
              className="w-full p-2 border rounded"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                handleReset();
              }}
            >
              <option value="men">{t("Men")}</option>
              <option value="women">{t("Women")}</option>
            </select>
          </div>

      
      {/* UK Size Selector */}
      <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 font-medium">UK {t("Size")}:</label>
            <select
              className="w-full p-2 border rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">{t("Select Size")}</option>
              {sizeData[category]["UK size"].map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Convert To */}
          <div className="flex-1 min-w-[200px]">
            <label className="block mb-2 font-medium">{t("Convert To")}:</label>
            <select className="w-full p-2 border rounded" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {Object.keys(sizeData[category]).map(
                (unit, i) => unit !== "UK" && <option key={i} value={unit}>{unit}</option>
              )}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button onClick={handleConversion} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {t("Convert")}
          </button>
         
        </div>

        {/* Result */}
        {convertedSize && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">
              UK {t("Size")} {size} = <span className="text-red-500">{convertedSize} {toUnit}</span>
            </p>
            <button
              onClick={handleCopy}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {t("Copy")}
            </button>
            <button onClick={handleReset} className="px-4 py-2 ms-3 bg-red-500 text-white rounded hover:bg-red-600">
            {t("Reset")}
          </button>
          </div>
        )}
      </div>


      {/* Data Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(sizeData[category]).map((key) => (
                <th key={key} className="border p-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeData[category]["UK size"].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  highlightIndex === rowIndex ? "bg-yellow-200 font-bold" : ""
                }
              >
                {Object.values(sizeData[category]).map((sizes, colIndex) => (
                  <td key={colIndex} className="border p-2">
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
          dangerouslySetInnerHTML={{ __html: content || "No content available." }}
          style={{ listStyleType: "none" }}
        ></article>
      </div>
    <ToastContainer/>
    </div>
  );
};
export async function getStaticProps(context) {
  return getContentProps("german", context.locale, context.req);
}
export default GermanShoeSizeConverter;
