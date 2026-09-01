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
const UggShoeSizeConverter =({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("ugg")
    const [category, setCategory] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});
  const [region, setRegion] = useState('US'); // New state for region
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const sizeData = {
    Women: [
      { heelToe: 8.66, US: 5, UK: 3, Europe: 36, Japan: 22, Mexico: 22, China: 220 },
      { heelToe: 8.86, US: 5.5, UK: 3.5, Europe: 36.5, Japan: 22.5, Mexico: 22.5, China: 225 },
      { heelToe: 9.06, US: 6, UK: 4, Europe: 37, Japan: 23, Mexico: 23, China: 230 },
      { heelToe: 9.25, US: 6.5, UK: 4.5, Europe: 37.5, Japan: 23.5, Mexico: 23.5, China: 235 },
      { heelToe: 9.45, US: 7, UK: 5, Europe: 38, Japan: 24, Mexico: 24, China: 240 },
      { heelToe: 9.65, US: 7.5, UK: 5.5, Europe: 38.5, Japan: 24.5, Mexico: 24.5, China: 245 },
      { heelToe: 9.84, US: 8, UK: 6, Europe: 39, Japan: 25, Mexico: 25, China: 250 },
      { heelToe: 10.04, US: 8.5, UK: 6.5, Europe: 39.5, Japan: 25.5, Mexico: 25.5, China: 255 },
      { heelToe: 10.24, US: 9, UK: 7, Europe: 40, Japan: 26, Mexico: 26, China: 260 },
      { heelToe: 10.43, US: 9.5, UK: 7.5, Europe: 40.5, Japan: 26.5, Mexico: 26.5, China: 265 },
      { heelToe: 10.63, US: 10, UK: 8, Europe: 41, Japan: 27, Mexico: 27, China: 270 },
      { heelToe: 10.83, US: 10.5, UK: 8.5, Europe: 41.5, Japan: 27.5, Mexico: 27.5, China: 275 },
      { heelToe: 11.02, US: 11, UK: 9, Europe: 42, Japan: 28, Mexico: 28, China: 280 },
      { heelToe: 11.22, US: 11.5, UK: 9.5, Europe: 42.5, Japan: 28.5, Mexico: 28.5, China: 285 },
      { heelToe: 11.42, US: 12, UK: 10, Europe: 43, Japan: 29, Mexico: 29, China: 290 },
      { heelToe: 11.81, US: 13, UK: 11, Europe: 44, Japan: 30, Mexico: 30, China: 300 },
      { heelToe: 12.20, US: 14, UK: 12, Europe: 45, Japan: 31, Mexico: 31, China: 310 }
    ],
    Men: [
      { heelToe: 9.06, US: 5, UK: 4, Europe: 38, Japan: 23, Mexico: 23, China: 230 },
      { heelToe: 9.45, US: 6, UK: 5, Europe: 39, Japan: 24, Mexico: 24, China: 240 },
      { heelToe: 9.65, US: 6.5, UK: 5.5, Europe: 39.5, Japan: 24.5, Mexico: 24.5, China: 245 },
      { heelToe: 9.84, US: 7, UK: 6, Europe: 40, Japan: 25, Mexico: 25, China: 250 },
      { heelToe: 10.04, US: 7.5, UK: 6.5, Europe: 40.5, Japan: 25.5, Mexico: 25.5, China: 255 },
      { heelToe: 10.24, US: 8, UK: 7, Europe: 41, Japan: 26, Mexico: 26, China: 260 },
      { heelToe: 10.43, US: 8.5, UK: 7.5, Europe: 41.5, Japan: 26.5, Mexico: 26.5, China: 265 },
      { heelToe: 10.63, US: 9, UK: 8, Europe: 42, Japan: 27, Mexico: 27, China: 270 },
      { heelToe: 10.83, US: 9.5, UK: 8.5, Europe: 42.5, Japan: 27.5, Mexico: 27.5, China: 275 },
      { heelToe: 11.02, US: 10, UK: 9, Europe: 43, Japan: 28, Mexico: 28, China: 280 },
      { heelToe: 11.22, US: 10.5, UK: 9.5, Europe: 43.5, Japan: 28.5, Mexico: 28.5, China: 285 },
      { heelToe: 11.42, US: 11, UK: 10, Europe: 44, Japan: 29, Mexico: 29, China: 290 },
      { heelToe: 11.81, US: 12, UK: 11, Europe: 46, Japan: 30, Mexico: 30, China: 300 },
      { heelToe: 12.20, US: 13, UK: 12, Europe: 48.5, Japan: 31, Mexico: 31, China: 310 }
    ],
    Kids: {
      Toddler: [
        { heelToe: 4.53, US: 4, UK: 3.5, Europe: 19.5, Japan: 11.5, Mexico: 11.5, China: 115 },
        { heelToe: 4.92, US: 5, UK: 4.5, Europe: 21, Japan: 12.5, Mexico: 12.5, China: 125 },
        { heelToe: 5.31, US: 6, UK: 5, Europe: 22, Japan: 13.5, Mexico: 13, China: 135 },
        { heelToe: 5.71, US: 7, UK: 6, Europe: 23.5, Japan: 14.5, Mexico: 14, China: 145 },
        { heelToe: 5.91, US: 8, UK: 7, Europe: 25, Japan: 15, Mexico: 15, China: 150 },
        { heelToe: 6.30, US: 9, UK: 8, Europe: 26, Japan: 16, Mexico: 16, China: 160 },
        { heelToe: 6.69, US: 10, UK: 9, Europe: 27.5, Japan: 17, Mexico: 17, China: 170 },
        { heelToe: 6.89, US: 11, UK: 10, Europe: 28.5, Japan: 17.5, Mexico: 18, China: 175 },
        { heelToe: 7.28, US: 12, UK: 11, Europe: 30, Japan: 18.5, Mexico: 19.5, China: 185 }
      ],
      BigKids: [
        { heelToe: 6.69, US: 10, UK: 9, Europe: 27.5, Japan: 17, Mexico: 17, China: 170 },
        { heelToe: 6.89, US: 11, UK: 10, Europe: 28.5, Japan: 17.5, Mexico: 17.5, China: 175 },
        { heelToe: 7.28, US: 12, UK: 11, Europe: 30, Japan: 18.5, Mexico: 18.5, China: 185 },
        { heelToe: 7.68, US: 13, UK: 12, Europe: 31, Japan: 19.5, Mexico: 19.5, China: 195 },
        { heelToe: 7.87, US: 1, UK: 13, Europe: 32.5, Japan: 20, Mexico: 20, China: 200 }
      ]
    }
  };
  const handleConvert = () => {
    if (!shoeSize) {
      alert(t("Please select a shoe size."));
      return;
    }

    let selectedSizeData;

    // Determine the selected category and subcategory if applicable
    if (category === "Kids") {
      // If Kids, further check for subcategories
      selectedSizeData = sizeData.Kids.Toddler.concat(sizeData.Kids.BigKids);
    } else {
      selectedSizeData = sizeData[category];
    }

    if (!selectedSizeData) {
      alert(t("Invalid category selection."));
      return;
    }

    // Find the size entry that matches the selected shoe size in the selected region
    const sizeEntry = selectedSizeData.find(size => size[region] === Number(shoeSize));

    if (!sizeEntry) {
      setConvertedSizes({});
      alert(t("Selected size not available."));
      return;
    }

    // Create an object to hold converted sizes for all regions
    const results = {};
    Object.keys(sizeEntry).forEach((system) => {
      if (system !== 'heelToe') { // Exclude heelToe if not needed
        results[system] = sizeEntry[system];
      }
    });

    // Set the converted sizes in the state
    setConvertedSizes(results);
  };

  const handleReset = () => {
    setCategory('Men');
    setRegion('US');
    setShoeSize('');
    setConvertedSizes({});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert("Size copied to clipboard!");
  };

  // Labels (consider using i18n translations)
  const categoryLabel = t('Category');
  const sizeLabel = t('Select Shoe Size');
  const selectSize = t('Choose Size');
  const convertButton = t('Convert');
  const convertedSizesLabel = t('Converted Sizes');
  const regionLabel = t('Region');
  const actionLabel = t('Action');

  // Generate unique shoe sizes based on the selected category and region
  const getShoeSizes = () => {
    let selectedSizeData;

    if (category === "Kids") {
      selectedSizeData = sizeData.Kids.Toddler.concat(sizeData.Kids.BigKids);
    } else {
      selectedSizeData = sizeData[category];
    }

    if (!selectedSizeData) return [];

    // Extract unique sizes for the selected region
    const sizes = selectedSizeData.map(size => size[region]).filter((value, index, self) => self.indexOf(value) === index);

    return sizes.sort((a, b) => a - b);
  };
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
            <link rel="canonical" href={`${meta?.url}/brand/ugg/`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/ugg/`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/ugg/`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/ugg/`}`} />
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
                  href={`${hreflang.href}/brand/ugg/`}
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
    }/brand/ugg/`,
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
    <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">{t("Ugg Shoe Size Converter")}</h1>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Category Selection */}
        {/* Category Selection */}
        <div>
            <label className="block mb-2">{categoryLabel}</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="Men">{"Men"}</option>
              <option value="Women">{"Women"}</option>
              <option value="Kids">{"Kids"}</option>
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
          <option value="UK">UK</option>
          <option value="Europe">Europe</option>
          <option value="Japan">Japan</option>
          <option value="Mexico">Mexico</option>
          <option value="China">China</option>
          </select>
        </div>

        {/* Shoe Size Selection */}
     {/* Shoe Size Selection */}
     <div>
            <label className="block mb-2">{sizeLabel}</label>
            <select
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">{selectSize}</option>
              {getShoeSizes().map((size, idx) => (
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
  return getContentProps("ugg", context.locale, context.req);
}



export default UggShoeSizeConverter;