import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const SheinShoeSizeChart = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("shein")
  const [category, setCategory] = useState("women"); // Default category
  const [region, setRegion] = useState("US"); // Default region
  const [selectedSize, setSelectedSize] = useState(""); // Selected shoe size
  const [filteredSizes, setFilteredSizes] = useState([]); // Filtered results
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // SHEIN Shoe Size Data
  const sizeData = {
    women: [
      { EU: 35.5, CN: 35, FootLength: "8.8", US: 5.5, UK: 3.5, BR: 33.5, MXJP: 22.5 },
      { EU: 36, CN: 36, FootLength: "9", US: 6, UK: 4, BR: 34, MXJP: 23 },
      { EU: 36.5, CN: 37, FootLength: "9.3", US: 6.5, UK: 4.5, BR: 35, MXJP: 23.5 },
      { EU: 37.5, CN: 38, FootLength: "9.4", US: 7, UK: 5, BR: 35.5, MXJP: 24 },
      { EU: 38, CN: 39, FootLength: "9.6", US: 7.5, UK: 5.5, BR: 36, MXJP: 24.5 },
      { EU: 39, CN: 40, FootLength: "9.8", US: 8, UK: 6, BR: 37, MXJP: 25 },
      { EU: 39.5, CN: 41, FootLength: "10", US: 8.5, UK: 6.5, BR: 37.5, MXJP: 25.5 },
      { EU: 40.5, CN: 42, FootLength: "10.2", US: 9, UK: 7, BR: 38, MXJP: 26 },
    ],
    men: [
      { EU: 38, CN: 39, FootLength: "9.6", US: 7, UK: 6, MX: 25, BR: 36, JP: 24.5 },
      { EU: 39, CN: 40, FootLength: "9.9", US: 7.5, UK: 6.5, MX: 25.5, BR: 37, JP: 25 },
      { EU: 40, CN: 41, FootLength: "10.1", US: 8, UK: 7, MX: 26, BR: 38, JP: 25.5 },
      { EU: 41, CN: 42, FootLength: "10.3", US: 9, UK: 7.5, MX: 26.5, BR: 39, JP: 26 },
      { EU: 42, CN: 44, FootLength: "10.6", US: 10, UK: 8.5, MX: 27.5, BR: 40, JP: 27 },
      { EU: 43, CN: 45, FootLength: "10.9", US: 10.5, UK: 9, MX: 28, BR: 41, JP: 27.5 },
      { EU: 44, CN: 46, FootLength: "11.1", US: 11, UK: 10, MX: 29, BR: 42, JP: 28 },
      { EU: 45, CN: 47, FootLength: "11.4", US: 12, UK: 11, MX: 29.5, BR: 43, JP: 28.5 },
    ],
  };

  // Get unique sizes for the selected region
  const getRegionSizes = () => {
    const currentData = sizeData[category];
    const uniqueSizes = [...new Set(currentData.map((row) => row[region]))];
    return uniqueSizes.filter((size) => size); // Exclude undefined values
  };

  // Filter sizes based on selected size
  const handleFilter = () => {
    const currentData = sizeData[category];
    const filtered = currentData.filter((row) => row[region]?.toString() === selectedSize);
    setFilteredSizes(filtered);
  };

  // Reset inputs and results
  const handleReset = () => {
    setSelectedSize("");
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
            <link rel="canonical" href={`${meta?.url}/brand/shein`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/shein`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/shein`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/shein`}`} />
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
                  href={`${hreflang.href}/brand/shein`}
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
    }/brand/shein`,
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
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          {t("Shein Shoe Size Conversion Tool")}
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
                setSelectedSize("");
                setFilteredSizes([]);
              }}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="women">{t("Women's Shoes")}</option>
              <option value="men">{t("Men's Shoes")}</option>
            </select>
          </div>

          {/* Region Selection */}
          <div>
            <label className="block mb-2 font-bold">{t("Region")}</label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setSelectedSize("");
                setFilteredSizes([]);
              }}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="US">US</option>
              <option value="UK">UK</option>
              <option value="EU">EU</option>
              <option value="CN">CN</option>
              <option value="BR">BR</option>
              <option value="MXJP">MX/JP</option>
              <option value="JP">JP</option>
            </select>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block mb-2 font-bold">{t("Size")}</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Size</option>
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
            <>
           
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(filteredSizes[0]).map((key) => (
                  <th key={key} className="border px-4 py-2 capitalize">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSizes.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-100 text-center">
                  {Object.values(row).map((value, id) => (
                    <td key={id} className="border px-4 py-2">
                      {value || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-3">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
          >
            {t("Reset")}
          </button>
          </div>
          </>
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
    
    export async function getStaticProps(context) {
      return getContentProps("shein", context.locale, context.req);
    }
    
    
    

export default SheinShoeSizeChart;
