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


const AsianClothingSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("asian")
  // Data structure
  const sizeData = {
    category: t("Asian Clothing Size Conversion"),
    data: [
      {
        unit: 'Asian (int\'l)',
        sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      },
      {
        unit: 'EU',
        sizes: ['32', '34', '36', '38', '40', '42', '44', '46']
      },
      {
        unit: 'US',
        sizes: ['0', '2', '4', '6', '8', '10', '12', '14']
      },
      {
        unit: 'UK',
        sizes: ['4', '6', '8', '10', '12', '14', '16', '18']
      },
      {
        unit: 'China - Tops (cm)',
        sizes: ['145/72A', '150/76A', '155/80A', '160/84A', '165/88A', '170/92A', '175/96A', '180/100A']
      },
      {
        unit: 'China - Bottoms (cm)',
        sizes: ['145/54A', '150/58A', '155/62A', '160/66A', '165/70A', '170/74A', '175/78A', '180/82A']
      },
      {
        unit: 'Bust (cm/inch)',
        sizes: [
          '76.5 cm / 29.5 in',
          '80 cm / 31 in',
          '83.5 cm / 32.5 in',
          '87 cm / 34 in',
          '90.5 cm / 35.5 in',
          '94 cm / 37 in',
          '97.5 cm / 38.5 in',
          '102.5 cm / 40.5 in'
        ]
      },
      {
        unit: 'Waist (cm/inch)',
        sizes: [
          '60.5 cm / 23 in',
          '64 cm / 24.5 in',
          '67.5 cm / 26.5 in',
          '71 cm / 27.5 in',
          '74.5 cm / 29.5 in',
          '78 cm / 30.5 in',
          '81.5 cm / 32 in',
          '85.5 cm / 33.5 in'
        ]
      },
      {
        unit: 'Hip (cm/inch)',
        sizes: [
          '84.5 cm / 32.5 in',
          '88 cm / 34 in',
          '91.5 cm / 35.5 in',
          '95 cm / 37 in',
          '98.5 cm / 38.5 in',
          '102 cm / 40 in',
          '105.5 cm / 41.5 in',
          '109.5 cm / 43 in'
        ]
      }
    ]
  };

  const { category, data } = sizeData;

  const [fromUnit] = useState("Asian (int'l)"); // From unit is fixed as Asian
  const [toUnit, setToUnit] = useState('US'); // Default "To" unit
  const [size, setSize] = useState(''); // Selected Asian size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // Get the fromRow (Asian sizes)
  const fromRow = data.find((row) => row.unit === fromUnit);

  // Handle conversion
  const handleConversion = () => {
    if (!size) {
      toast.error(t('Please select an Asian size first.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const fromIndex = fromRow.sizes.indexOf(size);
    if (fromIndex === -1) {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
      toast.error(t('Selected size is invalid or not available.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setHighlightIndex(fromIndex);
    const toRow = data.find((row) => row.unit === toUnit);
    if (!toRow) {
      setConvertedSize('Invalid "To" unit');
      toast.error(`Invalid "To" unit: ${toUnit}`, {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const result = toRow.sizes[fromIndex];
    if (!result) {
      setConvertedSize('No corresponding size found.');
      toast.error(t('No corresponding size found for the selected Asian size.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setConvertedSize(result);
  };

  const handleReset = () => {
    setToUnit('US');
    setSize('');
    setConvertedSize('');
    setHighlightIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto pb-5">
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
            <link rel="canonical" href={`${meta?.url}/country/asian`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/country/asian`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/country/asian`} />
            <meta property="twitter:url" content={`${`${meta?.url}/country/asian`}`} />
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
                  href={`${hreflang.href}/country/asian`}
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
    }/country/asian`,
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
        <h2 className="text-2xl font-bold text-gray-800 text-center">{category}</h2>

        <div className="flex flex-wrap gap-6">
          {/* Asian Size Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              {t("Asian Size")}:
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              <option value="" disabled>{t("Select an Asian size")}</option>
              {fromRow.sizes.map((asianSize, idx) => (
                <option key={idx} value={asianSize}>
                  {asianSize}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="toUnit" className="block mb-2 text-sm font-medium text-gray-700">
              {t("Convert To")}:
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              {data.filter((row) => row.unit !== fromUnit).map((row, index) => (
                <option key={index} value={row.unit}>
                  {row.unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 border-b pb-2">
          <button
            onClick={handleConversion}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {t("Convert Size")}
          </button>
          
        </div>

        {/* Result Display */}
        {convertedSize && (
          <div className="text-center">
            <div className="text-2xl text-gray-800 border-b pb-2">
              <span>{`${fromUnit} Size ${size} = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${fromUnit} Size ${size} = ${convertedSize} ${toUnit}`);
                  toast.success(t('Copied to Clipboard!'), {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }}
                className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none"
              >
                {t('Copy')}
              </button>
              <button
            onClick={handleReset}
            className="px-6 py-2 ms-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            {t('Reset')}
          </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>

      {/* Data Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{category}</h3>
      <div className="overflow-x-auto mt-4">
        <table className="w-full min-w-max border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              {data.map((row, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700"
                >
                  {row.unit}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[0].sizes.map((_, i) => (
              <tr key={i} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {data.map((row, index) => (
                  <td
                    key={index}
                    className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                      highlightIndex === i && row.unit !== fromUnit ? 'bg-blue-100 font-bold' : ''
                    }`}
                  >
                    {row.sizes[i]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
  return getContentProps("asian", context.locale, context.req);
}
export default AsianClothingSizeConverter;
