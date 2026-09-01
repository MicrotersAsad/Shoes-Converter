import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
const MerrellShoeSizeChart = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("merrell")
  const [category, setCategory] = useState("mens"); // Default category
  const [region, setRegion] = useState("USA"); // Default region
  const [shoeSize, setShoeSize] = useState(""); // Selected shoe size
  const [filteredSizes, setFilteredSizes] = useState([]); // Filtered results
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
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
            <link rel="canonical" href={`${meta?.url}/brand/merrell/`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/merrell/`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/merrell/`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/merrell/`}`} />
            <meta name="twitter:title" content={meta?.title} />
            <meta name="twitter:description" content={meta?.description} />
            <meta
              name="twitter:image"
              content="https://ytubetools.s3.eu-north-1.amazonaws.com/uploads/1732959231638-youtubechannelidfinderb.png"
            />
            <meta name="twitter:site" content="@ytubetools" />
            <meta name="twitter:image:alt" content="merrell" />

            {/* Alternate hreflang Tags for SEO */}
            {hreflangs &&
              hreflangs.map((hreflang, index) => (
                <link
                  key={index}
                  rel={hreflang.rel}
                  hreflang={hreflang.hreflang}
                  href={`${hreflang.href}/brand/merrell/`}
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
    }/brand/merrell/`,
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
            dangerouslySetInnerHTML={{ __html: content || 'No content available.' }}
            style={{ listStyleType: 'none' }}
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
      return getContentProps("merrell", context.locale, context.req);
    }
    
    
    

export default MerrellShoeSizeChart;
