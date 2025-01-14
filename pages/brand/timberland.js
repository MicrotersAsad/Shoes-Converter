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

const TimberlandShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("timberland")
  const [gender, setGender] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});
  const [region, setRegion] = useState('US'); // New state for region
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const timberlandSizeData = {
    Men: {
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15],
      EU: [37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 46, 47, 47.5, 48, 49, 49.5, 50],
      CM: [23.5, 24, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33],
      UK: [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5],
      BZ: [35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 43, 43.5, 44, 45, 45.5, 46, 47, 47.5, 48]
    },
    Women: {
      US: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 11.5, 12],
      EU: [34.5, 35, 35.5, 36, 37, 37.5, 38, 38.5, 39, 39.5, 40, 41, 41.5, 42, 44, 44.5],
      CM: [21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 28, 28.5, 29],
      UK: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 9.5, 10],
      BZ: [32, 33, 33.5, 34, 35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40, 41.5, 42, 43]
    },
    Infant: {
      US: [0, 1, 2, 2.5, 3, 3.5, 4],
      EU: [14.5, 16, 17, 18, 18.5, 19, 20],
      CM: [8, 9, 9.5, 10, 10.5, 11, 12],
      UK: [0, 0.5, 1.5, 2, 2.5, 3, 3.5],
      BZ: [null, null, null, null, null, null, 17.5]
    },
    Toddler: {
      US: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      EU: [20, 20.5, 21, 22, 22.5, 23, 23.5, 24, 25, 25.5, 26, 26.5, 27, 28, 28.5, 29, 30],
      CM: [12, 12, 12.5, 13, 13.5, 14, 14, 14.5, 15, 15.5, 16, 16, 16.5, 17, 17.5, 18, 18.5],
      UK: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      BZ: [17.5, 18, 19, 19.5, 20, 21, 21.5, 22, 23, 23.5, 24, 25, 25.5, 26, 27, 27.5, 28]
    },
    Youth: {
      US: [12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3],
      EU: [30.5, 31, 32, 32.5, 33, 34, 34.5, 35],
      CM: [18.5, 19, 19.5, 20, 20.5, 20.5, 21, 21.5],
      UK: [12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5],
      BZ: [29, 29.5, 30, 31, 31.5, 32, 33, 33.5]
    },
    Junior: {
      US: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
      EU: [35.5, 36, 37, 37.5, 38, 39, 39.5, 40],
      CM: [22, 22.5, 22.5, 23, 23.5, 24, 24.5, 25],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5],
      BZ: [34, 34.5, 35, 36, 36.5, 37, 38, 38.5]
    },
  };
  const handleConvert = () => {
    if (!shoeSize || shoeSize === "") {
      alert(t("Please select a shoe size."));
      return;
    }
  
    const sizeData = timberlandSizeData[gender];
    
    if (!sizeData) {
      alert(t("Invalid gender selection."));
      return;
    }
  
    // Find the index of the selected shoe size in the US sizing array
    const index = sizeData.US.indexOf(Number(shoeSize));
  
    if (index === -1) {
      setConvertedSizes({});
      alert(t("Selected size not available."));
      return;
    }
  
    // Create an object to hold converted sizes for all regions
    const results = {};
    Object.keys(sizeData).forEach((system) => {
      results[system] = sizeData[system][index];
    });
  
    // Set the converted sizes in the state
    setConvertedSizes(results);
  };
  
  const handleReset = () => {
    setGender('Men');
    setRegion('US'); // Reset region as well
    setShoeSize('');
    setConvertedSizes({});
  };
  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert(t("Size copied to clipboard!"));
  };

  const categoryLabel = t('Category'); // Default value
  const sizeLabel = t('Select Shoe Size'); // Default value
  const selectSize = t('Choose Size'); // Default value
  const convertButton = t('Convert'); // Default value
  const convertedSizesLabel = t('Converted Sizes'); // Default value
  const regionLabel = t('Region'); // Default value
  const actionLabel =t('Action'); // Default value

  return (
    <div className="max-w-7xl mx-auto">
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
            <link rel="canonical" href={`${meta?.url}/brand/timberland`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/timberland`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/timberland`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/timberland`}`} />
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
                  href={`${hreflang.href}/brand/timberland`}
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
    }/brand/timberland`,
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
    <div className="max-w-7xl mx-auto p-6 mt-5 mb-5 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">{t("Timberland Shoe Size Converter")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Category Selection */}
        <div>
          <label className="block mb-2">{categoryLabel}</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Men">{t("Men")}</option>
            <option value="Women">{t("Women")}</option>
            <option value="Infant">{t("Infant")}</option>
            <option value="Toddler">{t("Toddler")}</option>
            <option value="Youth">{t("Youth")}</option>
            <option value="Junior">{t("Junior")}</option>
          </select>
        </div>

        {/* Region Selection */}
        <div>
          <label className="block mb-2">{regionLabel}</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="US">US</option>
            <option value="EU">EU</option>
            <option value="CM">CM</option>
            <option value="UK">UK</option>
            <option value="BZ">BZ</option>
          </select>
        </div>

        {/* Shoe Size Selection */}
        <div>
          <label className="block mb-2">{sizeLabel}</label>
          <select
            value={shoeSize}
            onChange={(e) => setShoeSize(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">{selectSize}</option>
            {timberlandSizeData[gender]?.[region].map((size, idx) => (
              <option key={idx} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Convert Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          {convertButton}
        </button>
      </div>

      {/* Converted Sizes Table */}
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
                      {t("Copy")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           {/* Reset Button */}
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
  return getContentProps("timberland", context.locale, context.req);
}



export default TimberlandShoeSizeConverter;