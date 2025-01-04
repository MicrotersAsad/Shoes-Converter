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
const ChineseShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("chinese")
  const sizeData = {
    women: {
      "US": [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      "UK": [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
      "EU": [35, 35.5, 36, 37, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5],
      "China": [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280],
      "Mondo (CM)": [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28],
      "Foot Length (In)": [8.7, 8.9, 9.1, 9.3, 9.5, 9.7, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11],
    },
    men: {
      "US": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      "UK": [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
      "EU": [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46],
      "China": [245, 250, 255, 260, 265, 270, 270, 275, 280, 285, 290, 295, 305],
      "Mondo (CM)": [24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5],
      "Foot Length (In)": [9.7, 9.8, 10, 10.2, 10.4, 10.6, 10.8, 11, 11.2, 11.4, 11.6, 11.8, 12],
    },
    toddlers: {
      "US": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "UK": [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      "EU": [16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      "Foot Length (In)": [3.54, 3.94, 4.21, 4.53, 4.92, 5.24, 5.51, 5.91, 6.26, 6.57],
    },
    kids: {
      "US": [11, 12, 13, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
      "UK": [10, 11, 12, 13, 13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      "EU": [28, 29, 30, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5, 37, 37.5, 38],
      "Foot Length (In)": [6.8, 7.1, 7.4, 7.9, 8.1, 8.2, 8.4, 8.6, 8.7, 8.9, 9.1, 9.2, 9.4, 9.5, 9.7, 9.8],
    },
  };

  const [category, setCategory] = useState("women");
  const [fromUnit, setFromUnit] = useState("US");
  const [toUnit, setToUnit] = useState("China");
  const [size, setSize] = useState("");
  const [convertedSize, setConvertedSize] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleConversion = () => {
    if (!size) {
      toast.error(t("Please select a size."));
      return;
    }
    const fromIndex = sizeData[category][fromUnit].indexOf(Number(size));
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
    navigator.clipboard.writeText(` ${convertedSize} ${toUnit}`);
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
            <link rel="canonical" href={`${meta?.url}/country/chinese`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/country/chinese`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/country/chinese`} />
            <meta property="twitter:url" content={`${`${meta?.url}/country/chinese`}`} />
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
                  href={`${hreflang.href}/country/chinese`}
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
    }/country/chinese`,
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
         <div className="flex flex-col max-w-7xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">{t("Chinese Shoe Size Converter")}</h1>

        <div className="flex flex-wrap gap-6">
        <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="women">{t("Women")}</option>
            <option value="men">{t("Men")}</option>
            <option value="toddlers">{t("Toddlers")}</option>
            <option value="kids">{t("Kids")}</option>
          </select>
</div>
<div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {Object.keys(sizeData[category]).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          </div>

          <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.keys(sizeData[category]).map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          </div>
          <div className="flex-1 min-w-[200px]">
          <select className="w-full p-2 border rounded" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">{t("Select Size")}</option>
            {sizeData[category][fromUnit].map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          </div>
        
        </div>

        <div className="flex justify-center gap-4">
        <button onClick={handleConversion} className="px-4 py-2 bg-blue-500 text-white rounded">{t("Convert")}</button>
        </div>
     

        {/* {convertedSize && <p className="text-center text-xl">Converted Size: {convertedSize} {toUnit}</p> } */}

         {/* Result */}
         {convertedSize && (
  <div className="mt-6 text-center">
    <p className="text-xl font-semibold">
      {fromUnit} Size {size} = <span className="text-red-500">{convertedSize} {toUnit}</span>
    </p>
    <button
      onClick={() => {
        navigator.clipboard.writeText(`${fromUnit} Size ${size} = ${convertedSize} ${toUnit}`);
        toast.success("Result copied to clipboard!");
      }}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      {t("Copy")}
    </button>
    <button
      onClick={handleReset}
      className="px-4 py-2 ms-3 bg-red-500 text-white rounded hover:bg-red-600"
    >
      {t("Reset")}
    </button>
  </div>
)}

        
      </div>
        <ToastContainer />

        <table className="w-full border mt-6">
          <thead>
            <tr>
              {Object.keys(sizeData[category]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeData[category][fromUnit].map((_, i) => (
              <tr key={i} className={highlightIndex === i ? "bg-yellow-200" : ""}>
                {Object.values(sizeData[category]).map((sizes) => (
                  <td key={sizes[i]} className="border p-2">{sizes[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
  return getContentProps("chinese", context.locale, context.req);
}
export default ChineseShoeSizeConverter;
