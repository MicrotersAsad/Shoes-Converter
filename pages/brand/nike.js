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

const NikeShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("nike")
    const [gender, setGender] = useState('Men'); // Default gender
  const [shoeSize, setShoeSize] = useState(''); // Selected shoe size
  const [convertedSizes, setConvertedSizes] = useState({}); // Converted sizes
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // Nike Shoe Size Conversion Data
  const nikeSizeData = {
    Men: {
      "US - Men's": [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
      EU: [35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46],
      "Foot Length (in)": ["8 1/2", "8 11/16", "8 13/16", "9", "9 3/16", "9 5/16", "9 1/2", "9 11/16", "9 13/16", "10", "10 3/16", "10 5/16", "10 1/2", "10 11/16", "10 13/16", "11", "11 3/16", "11 5/16"],
    },
    Women: {
      "US - Women's": [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
      UK: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
      EU: [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42],
      "Foot Length (in)": ["8 1/2", "8 11/16", "8 13/16", "9", "9 3/16", "9 5/16", "9 1/2", "9 11/16", "9 13/16", "10", "10 3/16", "10 5/16", "10 1/2", "10 11/16", "10 13/16"],
    },
    BigKids: {
      "US - Kid's": ["1Y", "1.5Y", "2Y", "2.5Y", "3Y", "3.5Y", "4Y", "4.5Y", "5Y", "5.5Y", "6Y", "6.5Y", "7Y"],
      UK: [13.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6],
      EU: [32, 33, 33.5, 34, 35, 35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40],
      "Foot Length (in)": ["7 15/16", "8 1/16", "8 4/16", "8 7/16", "8 9/16", "8 12/16", "8 13/16", "8 15/16", "9 2/16", "9 4/16", "9 6/16", "9 9/16", "9 11/16"],
    },
    LittleKids: {
      "US - Kid's": ["8C", "9C", "10C", "10.5C", "11C", "11.5C", "12C", "12.5C", "13C", "13.5C", "1Y", "1.5Y", "2Y", "2.5Y", "3Y"],
      UK: [7.5, 8.5, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5],
      EU: [25, 26, 27, 27.5, 28, 28.5, 29.5, 30, 31, 31.5, 32, 33, 33.5, 34, 35],
      "Foot Length (in)": ["5 15/16", "6 4/16", "6 9/16", "6 12/16", "6 15/16", "7 1/16", "7 4/16", "7 7/16", "7 9/16", "7 12/16", "7 15/16", "8 1/16", "8 4/16", "8 7/16", "8 9/16"],
    },
    BabiesToddlers: {
      "US - Kid's": ["1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C"],
      UK: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
      EU: [16, 17, 18.5, 19.5, 21, 22, 23.5, 25, 26, 27],
      "Foot Length (in)": ["3 9/16", "3 15/16", "4 4/16", "4 9/16", "4 15/16", "5 4/16", "5 9/16", "5 15/16", "6 4/16", "6 9/16"],
    },
  };

  const handleConvert = () => {
    let index = -1;
    
    // Handle numeric shoe sizes (Men, Women)
    if (gender !== "BigKids" && gender !== "LittleKids" && gender !== "BabiesToddlers") {
      index = nikeSizeData[gender][`US - ${gender}'s`].indexOf(Number(shoeSize));
    }
    // Handle non-numeric shoe sizes (BigKids, LittleKids, BabiesToddlers)
    else {
      index = nikeSizeData[gender]["US - Kid's"].indexOf(shoeSize);
    }

    if (index === -1) {
      setConvertedSizes({});
      return;
    }

    const results = {};
    Object.keys(nikeSizeData[gender]).forEach((system) => {
      results[system] = nikeSizeData[gender][system][index];
    });

    setConvertedSizes(results);
  };

  const handleReset = () => {
    setGender('Men');
    setShoeSize('');
    setConvertedSizes({});
  };

  const handleCopy = (size) => {
    navigator.clipboard.writeText(size);
    alert('Size copied to clipboard!');
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
            <link rel="canonical" href={`${meta?.url}/brand/nike`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/brand/nike`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/brand/nike`} />
            <meta property="twitter:url" content={`${`${meta?.url}/brand/nike`}`} />
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
                  href={`${hreflang.href}/brand/nike`}
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
    }/brand/nike`,
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
    <div className="max-w-7xl mx-auto p-6 mt-5 mb-5 bg-white ">
      <h1 className="text-3xl font-bold text-center mb-6">{t("Nike Shoe Size Converter")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2">{t("Gender")}:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Men">{t("Men's")}</option>
            <option value="Women">{t("Women's")}</option>
            <option value="BigKids">{t("Big Kids")}</option>
            <option value="LittleKids">{t("Little Kids")}</option>
            <option value="BabiesToddlers">{t("Babies & Toddlers")}</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">{t("Shoe Size")}:</label>
          <select
            value={shoeSize}
            onChange={(e) => setShoeSize(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">{t("Select size")}</option>
            {nikeSizeData[gender]["US - Kid's"] 
              ? nikeSizeData[gender]["US - Kid's"].map((size, idx) => (
                  <option key={idx} value={size}>
                    {size}
                  </option>
                ))
              : nikeSizeData[gender][`US - ${gender}'s`].map((size, idx) => (
                  <option key={idx} value={size}>
                    {size}
                  </option>
                ))
            }
          </select>
        </div>
        <div className='mt-9'>
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          {t("Convert Size")}
        </button>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
       
        
      </div>

      {Object.keys(convertedSizes).length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">{t("Converted Sizes")}</h2>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">{t("Size System")}</th>
                <th className="border px-4 py-2">{t("Size")}</th>
                <th className="border px-4 py-2">{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(convertedSizes).map(([system, size], idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{system}</td>
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
        <div className='text-center mt-3'>
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
  return getContentProps("nike", context.locale, context.req);
}


export default NikeShoeSizeConverter;
