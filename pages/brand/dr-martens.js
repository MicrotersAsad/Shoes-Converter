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
  reactions,hreflangs  })=> {
  const {t}=useTranslation("dr-martens")
  const [gender, setGender] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});
  const [region, setRegion] = useState('US'); // New state for region
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const sizeData = {
    Women: [
        { footLength: '9 1⁄4"', footWidth: '3 1⁄4"', US: 5, UK: 3, EUR: 36, JP: 22 },
        { footLength: '9 3⁄4"', footWidth: '3 1⁄2"', US: 6, UK: 4, EUR: 37, JP: 23 },
        { footLength: '10"', footWidth: '3 1⁄2"', US: 7, UK: 5, EUR: 38, JP: 24 },
        { footLength: '10 1⁄4"', footWidth: '3 1⁄2"', US: 8, UK: 6, EUR: 39, JP: 25 },
        { footLength: '10 3⁄4"', footWidth: '3 3⁄4"', US: 9, UK: 7, EUR: 41, JP: 26 },
        { footLength: '11"', footWidth: '3 3⁄4"', US: 10, UK: 8, EUR: 42, JP: 27 },
        { footLength: '11 1⁄4"', footWidth: '3 3⁄4"', US: 11, UK: 9, EUR: 43, JP: 28 },
        { footLength: '11 3⁄4"', footWidth: '4"', US: 12, UK: 10, EUR: 45, JP: 29 },
        { footLength: '12"', footWidth: '4"', US: 13, UK: 11, EUR: 46, JP: 30 },
        { footLength: '12 1⁄4"', footWidth: '4"', US: 14, UK: 12, EUR: 47, JP: 31 },
        { footLength: '12 3⁄4"', footWidth: '4 1⁄4"', US: 15, UK: 13, EUR: 48, JP: 32 },
        { footLength: '13"', footWidth: '4 1⁄4"', US: 16, UK: 14, EUR: 49, JP: 33 },
        { footLength: '13 1⁄4"', footWidth: '4 1⁄4"', US: 17, UK: 15, EUR: 50, JP: 34 },
      ],
      Men: [
        { footLength: '9 1⁄4"', footWidth: '3 1⁄4"', US: 4, UK: 3, EUR: 36, JP: 22 },
        { footLength: '9 3⁄4"', footWidth: '3 1⁄2"', US: 5, UK: 4, EUR: 37, JP: 23 },
        { footLength: '10"', footWidth: '3 1⁄2"', US: 6, UK: 5, EUR: 38, JP: 24 },
        { footLength: '10 1⁄4"', footWidth: '3 1⁄2"', US: 7, UK: 6, EUR: 39, JP: 25 },
        { footLength: '10 3⁄4"', footWidth: '3 3⁄4"', US: 8, UK: 7, EUR: 41, JP: 26 },
        { footLength: '11"', footWidth: '3 3⁄4"', US: 9, UK: 8, EUR: 42, JP: 27 },
        { footLength: '11 1⁄4"', footWidth: '3 3⁄4"', US: 10, UK: 9, EUR: 43, JP: 28 },
        { footLength: '11 3⁄4"', footWidth: '4"', US: 11, UK: 10, EUR: 45, JP: 29 },
        { footLength: '12"', footWidth: '4"', US: 12, UK: 11, EUR: 46, JP: 30 },
        { footLength: '12 1⁄4"', footWidth: '4"', US: 13, UK: 12, EUR: 47, JP: 31 },
        { footLength: '12 3⁄4"', footWidth: '4 1⁄4"', US: 14, UK: 13, EUR: 48, JP: 32 },
        { footLength: '13"', footWidth: '4 1⁄4"', US: 15, UK: 14, EUR: 49, JP: 33 },
        { footLength: '13 1⁄4"', footWidth: '4 1⁄4"', US: 16, UK: 15, EUR: 50, JP: 34 },
      ],
      Newborn: [
        { footLength: '3 3⁄4"', US: 1, UK: 0, EUR: 16, JP: 8 },
        { footLength: '4 1⁄4"', US: 2, UK: 1, EUR: 17, JP: 9 },
        { footLength: '4 1⁄2"', US: 3, UK: 2, EUR: 18, JP: 10 },
        { footLength: '4 3⁄4"', US: 4, UK: 3, EUR: 19, JP: 11 },
      ],
      Infant: [
        { footLength: '4 3⁄4"', US: 4, UK: 3, EUR: 19, JP: 11 },
        { footLength: '5 1⁄4"', US: 5, UK: 4, EUR: 20, JP: 12 },
        { footLength: '5 1⁄2"', US: 6, UK: 5, EUR: 21.5, JP: 12.5 },
      ],
      Toddler: [
        { footLength: '5 3⁄4"', US: 7, UK: 6, EUR: 23, JP: 13.5 },
        { footLength: '6 1⁄4"', US: 8, UK: 7, EUR: 23.5, JP: 14 },
        { footLength: '6 1⁄2"', US: 9, UK: 8, EUR: 26, JP: 15 },
        { footLength: '6 3⁄4"', US: 10, UK: 9, EUR: 27, JP: 16 },
      ],
      Junior: [
        { footLength: '7 1⁄4"', US: 11, UK: 10, EUR: 28, JP: 17 },
        { footLength: '7 1⁄2"', US: 12, UK: 11, EUR: 29, JP: 18 },
        { footLength: '7 3⁄4"', US: 13, UK: 12, EUR: 31, JP: 18.5 },
        { footLength: '8 1⁄4"', US: 1, UK: 13, EUR: 32, JP: 19.5 },
        { footLength: '8 1⁄2"', US: 2, UK: 1, EUR: 33, JP: 20.5 },
        { footLength: '8 3⁄4"', US: 3, UK: 2, EUR: 34, JP: 21.5 },
        { footLength: '9 1⁄4"', US: 4, UK: 3, EUR: 36, JP: 22 },
      ],
      Youth: [
        { footLength: '9 1⁄2"', US: 5, UK: 4, EUR: 37, JP: 23 },
        { footLength: '10"', US: 6, UK: 5, EUR: 38, JP: 23.5 },
      ],
  };
  const handleConvert = () => {
    if (!shoeSize || shoeSize === '') {
      alert(t('Please select a shoe size.'));
      return;
    }

    const sizeCategory = sizeData[gender];

    // Find the size by matching foot length
    const sizeMatch = sizeCategory.find((size) => size.footLength === shoeSize);

    if (!sizeMatch) {
      setConvertedSizes({});
      alert(t('Size not found for the given foot length.'));
      return;
    }

    setConvertedSizes(sizeMatch);
  };

  
  const handleReset = () => {
    setGender('Men');
    setRegion('US'); // Reset region as well
    setShoeSize('');
    setConvertedSizes({});
  };
  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert("Size copied to clipboard!");
  };

  const categoryLabel = t('Category'); // Default value
  const sizeLabel = t('Select Shoe Size'); // Default value
  const selectSize = t('Choose Size'); // Default value
  const convertButton = t('Convert'); // Default value
  const convertedSizesLabel = t('Converted Sizes'); // Default value
  const regionLabel = t('Region'); // Default value
  const actionLabel = t('Action'); // Default value

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
            <link rel="canonical" href={`${meta?.url}/brand/dr-martens`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/dr-martens`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/dr-martens`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/dr-martens`}`} />
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
                  href={`${hreflang.href}/brand/dr-martens`}
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
    }/brand/dr-martens`,
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
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">{t("Dr. Martens Shoe Size Converter")}</h1>

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
          <label className="block mb-2">{t("Select Foot Length")}</label>
        <select
          value={shoeSize}
          onChange={(e) => setShoeSize(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
        >
          {sizeData[gender].map((size, index) => (
            <option key={index} value={size.footLength}>
              {size.footLength}
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

export async function getStaticProps(context) {
  return getContentProps("dr-martens", context.locale, context.req);
}



export default TimberlandShoeSizeConverter;