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

const AlegriaShoeSizeChart = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("alegria")
  const [gender, setGender] = useState("mens");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // Shoe size data for Men and Women
  const sizeData = {
    womens: [
      { Euro: 35, US: "5/5.5", Australia: "4", UK: "3", Japan: "21" },
      { Euro: 36, US: "6/6.5", Australia: "4.5", UK: "3.5", Japan: "22" },
      { Euro: 37, US: "7/7.5", Australia: "5", UK: "4", Japan: "22.5" },
      { Euro: 38, US: "8/8.5", Australia: "6", UK: "5", Japan: "23.5" },
      { Euro: 39, US: "9", Australia: "7", UK: "6", Japan: "24.5" },
      { Euro: 40, US: "9.5/10", Australia: "7.5", UK: "6.5", Japan: "25" },
      { Euro: 41, US: "10.5/11", Australia: "8", UK: "7", Japan: "25.5" },
      { Euro: 42, US: "11.5/12", Australia: "8.5", UK: "7.5", Japan: "26" },
      { Euro: 43, US: "13", Australia: "9", UK: "8", Japan: "27" },
      { Euro: 44, US: "14", Australia: "9.5", UK: "8.5", Japan: "28" },
    ],
    mens: [
      { Euro: 40, US: "7" },
      { Euro: 41, US: "8" },
      { Euro: 42, US: "9" },
      { Euro: 43, US: "9.5" },
      { Euro: 44, US: "10" },
      { Euro: 45, US: "11" },
      { Euro: 46, US: "12" },
      { Euro: 47, US: "13" },
      { Euro: 48, US: "14" },
    ],
  };

  const handleReset = () => {
    setGender("mens");
    setShoeSize("");
    setConvertedSizes({});
  };

  const handleConvert = () => {
    const selectedGender = sizeData[gender];
    const selectedRow = selectedGender.find((row) => row.US === shoeSize);
    setConvertedSizes(selectedRow || {});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert(t("Size copied to clipboard!"));
  };

  const genderData = sizeData[gender] || [];

  // Content Fallback
  const categoryLabel = content?.categoryLabel || t("Category");
  const sizeLabel = content?.sizeLabel || t("Select Shoe Size");
  const selectSize = content?.selectSize || t("Choose Size");
  const convertButton = content?.convertButton || t("Convert");
  const convertedSizesLabel = content?.convertedSizesLabel || t("Converted Sizes");
  const regionLabel = content?.regionLabel || t("Region");
  const actionLabel = content?.actionLabel || t("Action");

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
            <link rel="canonical" href={`${meta?.url}/brand/alegria`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/alegria`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/alegria`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/alegria`}`} />
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
                  href={`${hreflang.href}/brand/alegria`}
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
    }/brand/alegria`,
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
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          {t("Alegria Shoe Size Converter")}
        </h1>

        {/* Gender and Shoe Size Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2">{categoryLabel}</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="mens">{t("Men")}</option>
              <option value="womens">{t("Women")}</option>
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
              {genderData.map((row, idx) => (
                <option key={idx} value={row.US}>
                  {row.US}
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

        {/* Converted Sizes Table */}
        {Object.keys(convertedSizes).length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4">{convertedSizesLabel}</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">{regionLabel}</th>
                  <th className="border px-4 py-2">{sizeLabel}</th>
                  <th className="border px-4 py-2">{actionLabel}</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(convertedSizes).map(([region, size], idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2 text-center">{region}</td>
                    <td className="border px-4 py-2 text-center">{size}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleCopy(size)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                      >
                        {t("Copy")}
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
                {t("Reset")}
              </button>
            </div>
          </div>
        )}
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

export async function getStaticProps(context) {
  return getContentProps("alegria", context.locale, context.req);
}

export default AlegriaShoeSizeChart;
