
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShoeSizeCalculator =({ content,faqs,relatedTools,hreflangs,meta }) => {
console.log(meta);


  const { t } = useTranslation('home'); // Correct namespace
  const [category, setCategory] = useState(''); // Default category
  const [fromUnit, setFromUnit] = useState(''); // Default input unit
  const [toUnit, setToUnit] = useState('Europe'); // Default output unit
  const [size, setSize] = useState(''); // Selected size
  const [convertedSize, setConvertedSize] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null); // Index to highlight
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 
  
  const shoeSizeData = {
    women: {
      title: t("Women's Shoe Size Conversion"),
      link:"/women",
      data: [
        { unit: 'US & Canada', sizes: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12] },
        { unit: 'UK', sizes: [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] },
        { unit: 'Europe', sizes: ['35', '35', '35-36', '36', '36-37', '37', '37-38', '38', '38-39', '39', '39-40', '40', '40-41', '41', '41-42', '42', '42-43'] },
        { unit: 'Inches', sizes: [8.2, 8.3, 8.5, 8.8, 8.9, 9.1, 9.3, 9.4, 9.5, 9.7, 9.9, 10, 10.2, 10.3, 10.5, 10.7, 10.9] },
        { unit: 'Centimeters', sizes: [20.8, 21.3, 21.6, 22.2, 22.5, 23, 23.5, 23.8, 24.1, 24.6, 25.1, 25.4, 25.9, 26.2, 26.7, 27.1, 27.6] },
      ],
    },
    men: {
      title: t("Men's Shoe Size Conversion"),
      link:"/men",
      data: [
        { unit: 'US & Canada', sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15, 16] },
        { unit: 'UK', sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5, 15.5] },
        { unit: 'Europe', sizes: ['39', '39', '40', '40-41', '41', '41-42', '42', '42-43', '43', '43-44', '44', '44-45', '45', '46', '47', '48', '49'] },
        { unit: 'Inches', sizes: [9.3, 9.5, 9.6, 9.8, 9.9, 10.1, 10.3, 10.4, 10.6, 10.8, 10.9, 11.1, 11.3, 11.6, 11.9, 12.2, 12.5] },
        { unit: 'Centimeters', sizes: [23.5, 24.1, 24.4, 24.8, 25.4, 25.7, 26, 26.7, 27, 27.3, 27.9, 28.3, 28.6, 29.4, 30.2, 31, 31.8] },
      ],
    },
    bigKids: {
        title: t("Big Kids' Shoe Size Conversion (7–12 Years)"),
        link:"/kids",
        data: [
          { unit: 'US & Canada', sizes: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7] },
          { unit: 'UK', sizes: [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6] },
          { unit: 'Europe', sizes: ['35', '36', '36', '37', '37', '38', '38', '39'] },
          { unit: 'Inches', sizes: [8.6, 8.8, 9, 9.1, 9.3, 9.5, 9.6, 9.8] },
          { unit: 'Centimeters', sizes: [21.9, 22.2, 22.9, 23.2, 23.5, 24.1, 24.4, 24.8] },
        ],
      },
      littleKids: {
        title: t("Little Kids' Shoe Size Conversion (4–7 Years)"),
        link:"/kids",
        data: [
          { unit: 'US & Canada', sizes: [10.5, 11, 11.5, 12, 12.5, 13, 13.5, 1, 1.5, 2, 2.5, 3] },
          { unit: 'UK', sizes: [9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 1, 1.5, 2] },
          { unit: 'Europe', sizes: ['27', '28', '29', '30', '30', '31', '31', '32', '33', '33', '34', '34'] },
          { unit: 'Inches', sizes: [6.6, 6.8, 7, 7.1, 7.3, 7.5, 7.6, 7.8, 8, 8.1, 8.3, 8.5] },
          { unit: 'Centimeters', sizes: [16.8, 17.1, 17.8, 18.1, 18.4, 19.1, 19.4, 19.7, 20.3, 20.6, 21, 21.6] },
        ],
      },
      toddlers: {
        title: t( "Toddlers' Shoe Size Conversion (9 Months - 4 Years)"),
        link:"/kids",
        data: [
          { unit: 'US & Canada', sizes: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] },
          { unit: 'UK', sizes: [19, 19, 20, 20, 21, 22, 22, 23, 23, 24, 25, 25, 26, 27] },
          { unit: 'Europe', sizes: ['2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'] },
          { unit: 'Inches', sizes: [4.3, 4.5, 4.6, 4.8, 5, 5.1, 5.3, 5.5, 5.6, 5.8, 6, 6.1, 6.3, 6.5] },
          { unit: 'Centimeters', sizes: [10.8, 11.4, 11.7, 12.1, 12.7, 13, 13.3, 14, 14.3, 14.6, 15.2, 15.6, 15.9, 16.5] },
        ],
      },
      infants: {
        title: t("Infants' Shoe Size Conversion (0–9 Months)"),
        link:"/kids",
        data: [
          { unit: 'US & Canada', sizes: [0, 1, 1.5, 2, 2.5, 3] },
          { unit: 'UK', sizes: [0, 0.5, 1, 1, 1.5, 2] },
          { unit: 'Europe', sizes: ['15', '16', '17', '17', '18', '18'] },
          { unit: 'Inches', sizes: [3.1, 3.5, 3.6, 3.8, 4, 4.1] },
          { unit: 'Centimeters', sizes: [7.9, 8.9, 9.2, 9.5, 10.2, 10.5] },
        ],
      },
   
  };
  const categoryNames = {
    women: t("Women's"),
    men: t("Men's"),
    bigKids: t("Big Kid's (7 - 12 years)"),
    littleKids: t("Little Kid's (4 - 7 years)"),
    toddlers: t("Toddlers' (9 months - 4 years)"),
    infants: t("Infants' (0 - 9 months)")
  };
  
  const handleConversion = () => {
    const categoryData = shoeSizeData[category].data;
    const fromRow = categoryData.find((row) => row.unit === fromUnit);
    const fromIndex = fromRow.sizes.indexOf(Number(size));

    if (fromIndex !== -1) {
      setHighlightIndex(fromIndex); // Highlight the matching column
      const toRow = categoryData.find((row) => row.unit === toUnit);
      setConvertedSize(toRow.sizes[fromIndex]); // Display the conversion result
    } else {
      setHighlightIndex(null);
      setConvertedSize('Invalid size');
    }
  };
  const handleReset = () => {
    setCategory('women'); // Default category
    setFromUnit('US & Canada'); // Default "From" unit
    setToUnit('Europe'); // Default "To" unit
    setSize(''); // Clear the size field
    setConvertedSize(''); // Clear the converted result
    setHighlightIndex(null); // Remove highlights
  };
  const description="Shoe Size Converter"
  const title="Shoe Size Converter"
  return (

    <div className='max-w-7xl mx-auto pb-5 ps-3 pe-3'> 
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
          <link rel="canonical" href={meta?.url} />

          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url"  content={meta?.url}/>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={meta?.description} />
          <meta property="og:image" content="https://shoesizeconvert.s3.amazonaws.com/uploads/1736055123112-shoesize.png"/>
          <meta property="og:image:secure_url" content="https://shoesizeconvert.s3.amazonaws.com/uploads/1736055123112-shoesize.png"/>
          <meta property="og:site_name" content="Ytubetools" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:domain" content={meta?.url} />
          <meta property="twitter:url" content={meta?.url}/>
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={meta?.description} />
          <meta name="twitter:image" content="" />
          <meta name="twitter:site" content="@shoesconverter" />
          <meta name="twitter:image:alt" content="https://shoesizeconvert.s3.amazonaws.com/uploads/1736055123112-shoesize.png"/>
   {/* Alternate hreflang Tags for SEO */}
   {hreflangs &&
              hreflangs.map((hreflang, index) => (
                <link
                  key={index}
                  rel={hreflang.rel}
                  hreflang={hreflang.hreflang}
                  href={`${hreflang.href}`}
                />
              ))}
          
        </Head>
        <h1>{t("Shoe Size Conversion")}</h1>
        <p>{t("Quickly find the right shoe size across different countries and measurements. Use our simple guide to ensure the perfect fit!")}</p>
<div className="flex flex-col max-w-7xl mx-auto p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
  {/* Title */}
  <h2 className="text-2xl font-bold text-gray-800 text-center">{t("Shoe Size Calculator")}</h2>

  {/* Input Fields */}
  <div className="flex flex-wrap gap-6">
    {/* Category */}
    <div className="flex-1 min-w-[200px]">
  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
    {t("Category")}:
  </label>
  <select
    id="category"
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
      setHighlightIndex(null); // Reset highlight
      setConvertedSize(''); // Reset result
      setSize(''); // Reset size
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="" disabled>
      {t("Select Category")}
    </option>
    <option value="women">{t("Women's")}</option>
    <option value="men">{t("Men's")}</option>
    <option value="bigKids">{t("Big Kid's (7 - 12 years)")}</option>
    <option value="littleKids">{t("Little Kid's (4 - 7 years)")}</option>
    <option value="toddlers">{t("Toddlers' (9 month - 4 years)")}</option>
    <option value="infants">{t("Infants' (0 - 9 months)")}</option>
  </select>
</div>


   {/* From Unit */}
<div className="flex-1 min-w-[200px]">
  <label htmlFor="fromUnit" className="block mb-2 text-sm font-medium text-gray-700">
    {t("From")}:
  </label>
  <select
    id="fromUnit"
    value={fromUnit}
    onChange={(e) => {
      setFromUnit(e.target.value);
      setSize(''); // Reset size
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    disabled={!category} // Disable until category is selected
  >
    <option value="" disabled>{t("Select a unit")}</option>
    {category &&
      shoeSizeData[category]?.data.map((row, index) => (
        <option key={index} value={row.unit}>
          {row.unit}
        </option>
      ))}
  </select>
</div>

{/* Size */}
<div className="flex-1 min-w-[200px]">
  <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-700">
    {t("Size")}:
  </label>
  <select
    id="size"
    value={size}
    onChange={(e) => setSize(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    disabled={!fromUnit} // Disable until fromUnit is selected
  >
    <option value="" disabled>{t("Select a size")}</option>
    {category &&
      fromUnit &&
      shoeSizeData[category]?.data.find((row) => row.unit === fromUnit)?.sizes.map((s, index) => (
        <option key={index} value={s}>
          {s}
        </option>
      ))}
  </select>
</div>

{/* To Unit */}
<div className="flex-1 min-w-[200px]">
  <label htmlFor="toUnit" className="block mb-2 text-sm font-medium text-gray-700">
    {t("To")}:
  </label>
  <select
    id="toUnit"
    value={toUnit}
    onChange={(e) => setToUnit(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    disabled={!category} // Disable until category is selected
  >
    <option value="" disabled>{t("Select a unit")}</option>
    {category &&
      shoeSizeData[category]?.data.map((row, index) => (
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
      className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {t("Convert Size")}
    </button>
   
  </div>
{/* Result */}

{convertedSize && (
  <div className="text-center">
    <div className="text-2xl text-gray-800 border-b pb-2">
      <span>
        {`${categoryNames[category]} size `}
      </span>
      <span className="font-bold text-blue-600">
        {`${size} ${fromUnit}`}
      </span>
      <span>
        {` = ${categoryNames[category]} size `}
      </span>
      <span className="font-bold text-red-600">
        {`${convertedSize} ${toUnit}`}
      </span>
    </div>
    <button
      onClick={() => {
        navigator.clipboard.writeText(
          `${categoryNames[category]} size ${size} ${fromUnit} = ${categoryNames[category]} size ${convertedSize} ${toUnit}`
        );
        toast.success('Copied to Clipboard!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }}
      className="mt-4 px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      {t("Copy")}
    </button>
    <button
      onClick={handleReset}
      className="px-6 ms-3 py-2 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
     {t("Reset")}
    </button>
  </div>
)}


  <ToastContainer />
</div>


<div>
<h2 className="text-2xl font-bold text-gray-800 mt-2">
      {t("Shoe Size Charts")}
    </h2>
    <p>{t("Check out simple charts to convert shoe sizes between countries. Find your best fit quickly and easily!")}</p>
</div>

<div className="overflow-x-auto md:overflow-x-visible mt-4">
  {category ? (
    <div>
      {/* Selected Category Table */}
      <div className='d-flex'>
     <div>
     <h3 className="text-lg font-bold mt-6 text-gray-700">{shoeSizeData[category]?.title}</h3>
     </div>
     <div className='ms-auto mt-6'>
     <Link className='underline text-gray-700' href={shoeSizeData[category]?.link || "#"}>
  {shoeSizeData[category]?.title || "Default Title"}
</Link>

     </div>
      </div>
      <table className="w-full min-w-[500px] border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-black text-white">
            <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-white">Unit</th>
            {shoeSizeData[category]?.data[0]?.sizes.map((_, index) => (
              <th
                key={index}
                className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-white"
              >
                Size {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shoeSizeData[category]?.data.map((row, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">{row.unit}</td>
              {row.sizes.map((size, i) => (
                <td
                  key={i}
                  className={`border border-gray-300 px-3 py-2 text-center text-sm text-gray-600 ${
                    highlightIndex === i ? 'bg-blue-100 font-bold' : ''
                  }`}
                >
                  {size}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    // Show all categories if no category is selected
    Object.keys(shoeSizeData).map((key) => (
      <div key={key} className="mb-8">

<div className='d-flex'>
     <div>
     <h3 className="text-lg font-bold mt-6 text-gray-700">{shoeSizeData[key]?.title}</h3>
     </div>
     <div className='ms-auto mt-6'>
     <Link className='underline text-gray-700' href={shoeSizeData[key]?.link || "#"}>
  {shoeSizeData[key]?.title || "Default Title"}
</Link>

     </div>
      </div>
        
        <table className="w-full min-w-[500px] border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-[#090708] text-[#fff]">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-white">Unit</th>
              {shoeSizeData[key]?.data[0]?.sizes.map((_, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-3 py-2 text-center text-sm font-medium text-white"
                >
                  {t("Size")} {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shoeSizeData[key]?.data.map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">{row.unit}</td>
                {row.sizes.map((size, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 px-3 py-2 text-center text-sm text-gray-600"
                  >
                    {size}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
  )}
</div>




<div className="content pt-6 pb-5">
        {content?.content ? (
          <article
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        ) : (
          <p>{t("No content available.")}</p>
        )}
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
export async function getServerSideProps({ locale, req }) {
  try {
    // Fetch protocol and host dynamically
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req?.headers?.host || 'localhost:3000'; // Adjust for your environment
    const canonicalUrl = `${protocol}://${host}`;

    // Define the authorization token
    const AUTH_TOKEN = process.env.AUTH_TOKEN || 'AZ-fc905a5a5ae08609ba38b046ecc8ef00';

    // Fetch the content data with authorization header
    const contentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/content?category=shoe-conversation&language=${locale}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!contentResponse.ok) {
      const errorDetails = await contentResponse.text();
      throw new Error(
        `Failed to fetch content: ${contentResponse.status} ${contentResponse.statusText}. ${errorDetails}`
      );
    }

    const contentData = await contentResponse.json();

    // Fetch translations
    const translations = await serverSideTranslations(locale, ['home', 'navbar', 'footer']);

    // Construct hreflangs
    const hreflangs = [
      { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'en', href: `${canonicalUrl}/en` },
      // Add other hreflangs dynamically based on locale data, if available
    ];

    // Construct meta data
    const meta = {
      title: contentData.translations?.[locale]?.title || 'Shoe Size Converter',
      description: contentData.translations?.[locale]?.description || 'Quickly convert shoe sizes with our easy-to-use tool.',
      image: contentData.translations?.[locale]?.image || `${canonicalUrl}/default-image.png`,
      url: canonicalUrl,
    };
console.log(meta);

    return {
      props: {
        content: contentData?.translations?.[locale] || {},
        faqs: contentData?.translations?.[locale]?.faqs || [],
        relatedTools: contentData?.translations?.[locale]?.relatedTools || [],
        hreflangs,
        meta,
        ...translations,
      },
     
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error.message);

    // Construct fallback hreflangs
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = 'localhost:3000'; // Fallback to localhost
    const canonicalUrl = `${protocol}://${host}`;
    const hreflangs = [
      { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'en', href: `${canonicalUrl}/en` },
    ];

    // Fallback meta data
    const meta = {
      title: 'Shoe Size Converter',
      description: 'Quickly convert shoe sizes with our easy-to-use tool.',
      image: `${canonicalUrl}/default-image.png`,
      url: canonicalUrl,
    };

    return {
      props: {
        content: {
          categoryLabel: 'Shoe Size Converter',
          sizeLabel: 'Select Shoe Size',
        },
        meta,
        faqs: [],
        relatedTools: [],
        hreflangs,
        ...(await serverSideTranslations(locale, ['home', 'navbar', 'footer'])),
      },
    };
  }
}



export default ShoeSizeCalculator;









