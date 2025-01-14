import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const CanadianShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
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
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
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
            <link rel="canonical" href={`${meta?.url}/country/canadian`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/country/canadian`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/country/canadian`} />
            <meta property="twitter:url" content={`${`${meta?.url}/country/canadian`}`} />
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
                  href={`${hreflang.href}/country/canadian`}
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
    }/country/canadian`,
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
      <h1 className="text-2xl font-bold text-center mb-4">{t("Canadian Shoe Size Converter")}</h1>
      <div className="flex flex-col max-w-7xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
     
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
          dangerouslySetInnerHTML={{ __html: content || "No content available." }}
          style={{ listStyleType: "none" }}
        ></article>
      </div>
      <div className="accordion  p-5">
          <h2 className="faq-title">{t("Frequently Asked Questions")}</h2>
          <p className="faq-subtitle">{t("Answered All FAQs")}</p>
          <div className="faq-grid">
            {faqs?.map((faq, index) => (
              <div key={index} className="faq-item">
                <span id={`accordion-${index}`} className="target-fix"></span>
                <a
                  href={`#accordion-${index}`}
                  id={`open-accordion-${index}`}
                  className="accordion-header"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </a>
                <a
                  href={`#accordion-${index}`}
                  id={`close-accordion-${index}`}
                  className="accordion-header"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </a>
                <div
                  className={`accordion-content ${
                    openIndex === index ? "open" : ""
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
       
      <div>
        <p>{t("Our chart offers a simple way to compare shoe sizes across countries, based on international standards and our fitting expertise. Keep in mind, shoe sizes can vary between styles and brands, even from the same manufacturer.")}</p>
<p>
  {t("This chart is meant as a helpful guide, not a guarantee. For the best fit, refer to our expert fitting tools if you're unsure about your size.")}
</p>
<p>
  {t("Since feet are three-dimensional, tools like rulers or Brannock devices® can only provide an estimate. Additionally, manufacturers use different designs, so sizing may differ.")}
</p>

<p>{t("Pro Tip: Stand up and wear the socks you’ll use with your new shoes when measuring. Use the chart to convert your measurement in inches or centimeters to U.S. or Euro sizes.")}</p>
      </div>
  
      {/* Related Tools Section */}
      <div className="bg-indigo-50 p-5">
          <h2 className="text-2xl font-bold mb-5 pt-5 text-center">
            {t("Related Tools")}
          </h2>
  
          <ul role="list" className="mx-auto gap-3 grid max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
  {relatedTools.map((tool, index) => (
    <li key={index} className="cursor-pointer bg-white rounded-xl list-none p-4 shadow transition duration-200 ease-in-out hover:scale-[101%] hover:bg-gray-50 hover:shadow-lg hover:ring-1 hover:ring-indigo-500">
                  <Link
                key={index}
                href={tool.link}
                className="flex items-center transition"
              >
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border hover:shadow lg:h-12 lg:w-12">
              <Image
                                         alt={tool?.name}
                                         className="rounded-full"
                                         src={tool?.logo}
                                         height={28}
                                         width={28} // Add width for proper optimization
                                         quality={50} // reduce quality if needed
                           loading="lazy" // lazy load
                                       />
          </div>
          <span className="ml-4 text-base font-medium text-gray-900 hover:text-indigo-600">{tool.name}</span>
        </div>
      </Link>
    </li>
  ))}
</ul>

</div>
  
    </div>
  );
};
export async function getServerSideProps(context) {
  return getContentProps("canadian", context.locale, context.req);
}
export default CanadianShoeSizeConverter;
