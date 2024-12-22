import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';
const AsosShoeSizeChart = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("asos")
  const [gender, setGender] = useState("mens");
  const [region, setRegion] = useState("US"); // Default Region
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState([]);

  // Shimano Shoe Size Data
  const sizeData = {
    womens: [
      { UK: 2, EU: 35, US: 4, CM: "212 mm" },
      { UK: 3, EU: 36, US: 5, CM: "220 mm" },
      { UK: 4, EU: 37, US: 6, CM: "229 mm" },
      { UK: 5, EU: 38, US: 7, CM: "237 mm" },
      { UK: 6, EU: 39, US: 8, CM: "246 mm" },
      { UK: 7, EU: 40, US: 9, CM: "254 mm" },
      { UK: 8, EU: 41, US: 10, CM: "262 mm" },
      { UK: 9, EU: 42, US: 11, CM: "270 mm" },
    ],
    mens: [
      { UK: 3, EU: 35.5, US: 4, CM: "220 mm" },
      { UK: 4, EU: 37, US: 5, CM: "229 mm" },
      { UK: 5, EU: 38, US: 6, CM: "237 mm" },
      { UK: 6, EU: 39, US: 7, CM: "246 mm" },
      { UK: 7, EU: 40.5, US: 8, CM: "254 mm" },
      { UK: 7.5, EU: 41, US: 8.5, CM: "258 mm" },
      { UK: 8, EU: 42, US: 9, CM: "262 mm" },
      { UK: 8.5, EU: 42.5, US: 9.5, CM: "266 mm" },
      { UK: 9, EU: 43, US: 10, CM: "271 mm" },
      { UK: 9.5, EU: 44, US: 10.5, CM: "275 mm" },
      { UK: 10, EU: 44.5, US: 11, CM: "279 mm" },
      { UK: 10.5, EU: 45, US: 11.5, CM: "283 mm" },
      { UK: 11, EU: 46, US: 12, CM: "288 mm" },
      { UK: 12, EU: 47, US: 13, CM: "296 mm" },
      { UK: 13, EU: 48, US: 14, CM: "305 mm" },
      { UK: 14, EU: 49.5, US: 15, CM: "314 mm" },
    ],
  };

  const handleConvert = () => {
    const selectedData = sizeData[gender];
    const matchedSizes = selectedData.filter(
      (row) => row[region] === parseFloat(shoeSize) || row[region] === shoeSize
    );
    setConvertedSizes(matchedSizes.length > 0 ? matchedSizes : []);
  };

  const handleReset = () => {
    setGender("mens");
    setRegion("US");
    setShoeSize("");
    setConvertedSizes([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
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
            <link rel="canonical" href={`${meta?.url}/brand/asos`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/asos`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/asos`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/asos`}`} />
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
                  href={`${hreflang.href}/brand/asos`}
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
    }/brand/asos`,
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
      <div className="bg-white max-w-5xl mx-auto shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        {t("ASOS Shoe Size Conversion")}
        </h1>

        {/* Gender, Region, and Size Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Gender Selection */}
          <div>
            <label className="block mb-2 font-bold">{t("Select Category")}</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="mens">{t("Men")}</option>
              <option value="womens">{t("Women")}</option>
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label className="block mb-2 font-bold">{t("Select Region")}</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="UK">UK</option>
              <option value="EU">EU</option>
              <option value="US">US</option>
              <option value="CM">CM</option>
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
              <option value="">{t("Choose Size")}</option>
              {sizeData[gender].map((row, idx) => (
                <option key={idx} value={row[region]}>
                  {row[region]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleConvert}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            {t("Convert")}
          </button>
        </div>

        {/* Converted Sizes Table */}
        {convertedSizes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">{t("Converted Sizes")}</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="border px-4 py-2">UK</th>
                  <th className="border px-4 py-2">EU</th>
                  <th className="border px-4 py-2">US</th>
                  <th className="border px-4 py-2">CM</th>
                </tr>
              </thead>
              <tbody>
                {convertedSizes.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-100 text-center">
                    <td className="border px-4 py-2">{row.UK}</td>
                    <td className="border px-4 py-2">{row.EU}</td>
                    <td className="border px-4 py-2">{row.US}</td>
                    <td className="border px-4 py-2">{row.CM}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Reset Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
          >
            {t("Reset")}
          </button>
        </div>
          </div>
        )}

        
       <div className="content pt-6 pb-5">
              <article
                dangerouslySetInnerHTML={{ __html: content || "No content available." }}
                style={{ listStyleType: "none" }}
              ></article>
            </div>
          </div>
          </div>
        );
      };
      
      export async function getStaticProps(context) {
        return getContentProps("asos", context.locale, context.req);
      }
      
      
export default AsosShoeSizeChart;
