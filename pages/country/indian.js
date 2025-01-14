import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContentProps } from '../../utils/getContentProps';
import Head from 'next/head';
import Script from 'next/script';
import { i18n } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';

const IndiaToUSShoeSizeConverter = ({ meta,
  content,
  relatedTools,
  faqs,
  reactions,hreflangs  }) => {
  const {t}=useTranslation("indian")
  const [category, setCategory] = useState('women'); // Default category: women
  const [toUnit, setToUnit] = useState('US'); // Default "To" unit
  const [size, setSize] = useState(''); // Selected India size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const shoeSizeData = {
    categories: {
      women: {
        title: t("Women's India to US Shoe Size Conversion"),
        data: [
          { unit: 'India', sizes: ['2','2.5','3','3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11.5','13','14','15']},
          { unit: 'US', sizes: ['4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13','14','15','16','17'] },
          { unit: 'UK', sizes: ['2','2.5','3','3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11.5','13','14','15'] },
          { unit: 'Europe', sizes: ['35','35','35-36','36','36-37','37','37-38','38','38-39','39','39-40','40','40-41','41','41-42','42','42-43','45','46.5','48','49','50'] },
          { unit: 'CM', sizes: ['20.8','21.3','21.6','22.2','22.5','23','23.5','23.8','24.1','24.6','25.1','25.4','25.9','26.2','26.7','27.1','27.6','27.9','28.6','31.12','32.2','33'] },
          { unit: 'Inches', sizes: ['8.19','8.38','8.5','8.75','8.88','9.06','9.25','9.38','9.5','9.69','9.88','10','10.19','10.31','10.5','10.69','10.88','11','11.25','12.25','12.68','12.99'] },
        ],
      },
      men: {
        title: t("Men's India to US Shoe Size Conversion"),
        data: [
          { unit: 'India', sizes: ['5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12.5','13.5','14.5','15.5'] },
          { unit: 'US', sizes: ['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','13','14','15','16'] },
          { unit: 'UK', sizes: ['5.5','6','6.5','7','7.5','8','8.5','9','9.45','10','10.5','11','11.5','12.5','13.5','14.5','15.5'] },
          { unit: 'Europe', sizes: ['39','39','40','40-41','41','41-42','42','42-43','43','43-44','44','44-45','45','46','47','48','49'] },
          { unit: 'CM', sizes: ['23.5','24.1','24.4','24.8','25.4','25.7','26','26.7','27','27.3','27.9','28.3','28.6','29.4','30.2','31','31.8'] },
          { unit: 'Inches', sizes: ['9.25','9.5','9.63','9.75','9.94','10.13','10.25','10.44','10.56','10.75','10.94','11.13','11.25','11.56','11.88','12.19','12.5'] },
        ],
      },
    },
  };

  const categoryNames = {
    women: "Women's",
    men: "Men's",
  };

  // Update default "To" unit when category changes
  useEffect(() => {
    const catData = shoeSizeData.categories[category].data;
    // Default "To" unit to "US" since focusing on India -> US conversions
    setToUnit('US');
    setSize('');
    setConvertedSize('');
    setHighlightIndex(null);
  }, [category]);

  const handleConversion = () => {
    if (!size) {
      toast.error('Please select an India size first.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const categoryData = shoeSizeData.categories[category].data;
    const fromRow = categoryData.find((row) => row.unit === 'India');

    if (!fromRow) {
      toast.error('India size data not found.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    const fromIndex = fromRow.sizes.indexOf(size);

    if (fromIndex === -1) {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
      toast.error(t('Selected India size is invalid or not available.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setHighlightIndex(fromIndex);
    const toRow = categoryData.find((row) => row.unit === toUnit);
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
      toast.error(t('No corresponding size found for the selected India size.'), {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    setConvertedSize(result);
  };

  const handleReset = () => {
    setCategory('women');
    setToUnit('US');
    setSize('');
    setConvertedSize('');
    setHighlightIndex(null);
  };

  const { title, data } = shoeSizeData.categories[category];

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
            <link rel="canonical" href={`${meta?.url}/country/indian`}  />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${meta?.url}/country/indian`} />
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
            <meta name="twitter:domain" content={`${meta?.url}/country/indian`} />
            <meta property="twitter:url" content={`${`${meta?.url}/country/indian`}`} />
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
                  href={`${hreflang.href}/country/indian`}
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
    }/country/indian`,
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
        <h2 className="text-2xl font-bold text-gray-800 text-center">{t("India to US Shoe Size Conversion")}</h2>

        <div className="flex flex-wrap gap-6">
          {/* Category Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              {t("Category")}:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              <option value="women">Women's</option>
              <option value="men">Men's</option>
            </select>
          </div>

          {/* India Size Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
              {t("India Size")}:
            </label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              <option value="" disabled>{t("Select an India size")}</option>
              {data.find((row) => row.unit === 'India')?.sizes.map((indiaSize, idx) => (
                <option key={idx} value={indiaSize}>
                  {indiaSize}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit Selector */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="toUnit" className="block mb-2 text-sm font-medium text-gray-700">
             {t("To Unit")}:
            </label>
            <select
              id="toUnit"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
            >
              {data.filter((row) => row.unit !== 'India').map((row, index) => (
                <option key={index} value={row.unit}>
                  {row.unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
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
              <span>{`India Size ${size} = `}</span>
              <span className="font-bold text-red-600">{`${convertedSize} ${toUnit}`}</span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`India Size ${size} = ${convertedSize} ${toUnit}`);
                  toast.success('Copied to Clipboard!', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }}
                className="px-4 py-2 ms-3 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none"
              >
                {t("Copy")}
              </button>
              <button
            onClick={handleReset}
            className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            {t("Reset")}
          </button>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>

      {/* Data Table */}
      <h3 className="text-lg font-semibold mt-6 text-gray-700">{title}</h3>
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
                      highlightIndex === i && row.unit !== 'India' ? 'bg-blue-100 font-bold' : ''
                    }`}
                  >
                    {row.sizes[i] !== '-' ? row.sizes[i] : '-'}
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
  return getContentProps("indian", context.locale, context.req);
}
export default IndiaToUSShoeSizeConverter;
