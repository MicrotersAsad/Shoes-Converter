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

const AsicsShoeSizeConverter  = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("asics")
  const [gender, setGender] = useState("Men");
  const [shoeSize, setShoeSize] = useState("");
  const [convertedSizes, setConvertedSizes] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // Shoe size data (example: for Men/Women/Kids)
  const sizeData = {
    men: {
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15, 16, 17],
      EU: [36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41.5, 42, 42.5, 43.5, 44, 44.5, 45, 46, 46.5, 47, 48, 49, 50.5, 51.5, 53, 54],
      CM: [22.5, 23, 23.5, 24, 24.5, 25, 25.25, 25.5, 26, 26.5, 27, 27.5, 28, 28.25, 28.5, 29, 29.5, 30, 30.5, 31, 32, 33, 34, 34.5],
      US: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15, 16, 17, 18],
    },
    women: {
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      EU: [35.5, 36, 37, 37.5, 38, 39, 39.5, 40, 40.5, 41.5, 42, 42.5, 43.5, 44, 44.5, 45, 46, 46.5, 47],
      CM: [22.5, 22.75, 23, 23.5, 24, 24.5, 25, 25.5, 25.75, 26, 26.5, 27, 27.5, 28, 28.5, 28.75, 29, 29.5, 30],
      US: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14],
    },
    kids: {
      UK: ["K3", "K4", "K5", "K6", "K7", "K8", "K9", "K9H", "K10", "K10H", "K11", "K11H", "K12", "K12H", "K13", "K13.5", 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      EU: [19.5, 21, 22.5, 23.5, 25, 26, 27, 28, 28.5, 29.5, 30, 30.5, 31.5, 32, 32.5, 33, 33.5, 34.5, 35, 35.5, 36, 37, 37.5, 38, 39, 39.5, 40],
      CM: [11.5, 13, 14, 15, 15.5, 16, 17, 17.25, 17.5, 18, 18.5, 19, 19.5, 19.75, 20, 20.5, 21, 21.5, 22, 22.25, 22.5, 23, 23.5, 24, 24.5, 25, 25.5],
      US: ["K4", "K5", "K6", "K7", "K8", "K9", "K10", "K10H", "K11", "K11H", "K12", "K12H", "K13", "K13H", 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
    },
  };

  // Ensure gender state is valid
  const genderData = sizeData[gender.toLowerCase()];
  if (!genderData) {
    console.error(`Invalid gender selection: ${gender}`);
    return null; // Or set to default gender or show a fallback UI
  }

  const handleConvert = () => {
    if (!shoeSize) {
      setConvertedSizes({});
      return;
    }

    const sizes = genderData["US"];
    const index = sizes.findIndex((size) => size.toString() === shoeSize.toString());
    if (index === -1) {
      setConvertedSizes({});
      return;
    }

    const results = {};
    Object.keys(genderData).forEach((key) => {
      results[key] = genderData[key][index];
    });

    setConvertedSizes(results);
  };

  const handleReset = () => {
    setGender("Men");
    setShoeSize("");
    setConvertedSizes({});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert(t("Size copied to clipboard!"));
  };

  // Fallback content labels
  const categoryLabel = content?.categoryLabel || t("Category");
  const sizeLabel = content?.sizeLabel || t("Select Shoe Size");
  const selectSize = content?.selectSize || t("Choose Size");
  const convertButton = content?.convertButton || t("Convert");
  const convertedSizesLabel = content?.convertedSizesLabel || t("Converted Sizes");
  const regionLabel = content?.regionLabel || t("Region");
  const actionLabel = content?.actionLabel || t("Action");

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
            <link rel="canonical" href={`${meta?.url}/brand/asics`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/asics`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/asics`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/asics`}`} />
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
                  href={`${hreflang.href}/brand/asics`}
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
    }/brand/asics`,
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
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">{t("Asics Shoe Size Converter")}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2">{categoryLabel}</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="Men">{t("Men")}</option>
              <option value="Women">{t("Women")}</option>
              <option value="kids">{t("Kids")}</option>
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
              {genderData?.US?.map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
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

export async function getServerSideProps(context) {
  return getContentProps("asics", context.locale, context.req);
}



export default AsicsShoeSizeConverter ;
