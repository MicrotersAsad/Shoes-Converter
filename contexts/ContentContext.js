// ContentProvider.js
import React, { createContext, useContext, useState } from 'react';
import { format } from 'date-fns';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);
export const fetchContent = async (category, locale, host, protocol, revalidate = false) => {
  const AUTH_TOKEN = "AZ-fc905a5a5ae08609ba38b046ecc8ef00";

  try {
    const apiUrl = `${protocol}://${host}/api/content?category=${category}&language=${locale}`;
    console.log(apiUrl);

    const contentResponse = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: revalidate ? { revalidate: 60 } : undefined, // Add revalidate headers if needed
    });

    if (!contentResponse.ok) {
      console.log(`Content not found for category: ${category} and locale: ${locale}`);
      return generateNotFoundResponse(protocol, host);
    }

    const contentData = await contentResponse.json();

    if (!contentData.translations || !contentData.translations[locale]) {
      return generateNotFoundResponse(protocol, host);
    }

    // Process valid data
    const basePath = `${protocol}://${host}`;
    const canonicalUrl = locale === "en" ? basePath : `${protocol}://${host}/${locale}`;
    console.log(canonicalUrl)
    const translations = contentData.translations || {};

    const hreflangs = [
      { rel: "alternate", hreflang: "x-default", href: `${basePath}` },
      { rel: "alternate", hreflang: "en", href: `${basePath}` },
      ...Object.keys(translations)
        .filter((lang) => lang !== "en")
        .map((lang) => ({
          rel: "alternate",
          hreflang: lang,
          href: `${protocol}://${host}/${lang}`,
        })),
    ];

    return {
      content: contentData.translations[locale]?.content || '',
      meta: {
        title: contentData.translations[locale]?.title || 'Default Title',
        description: contentData.translations[locale]?.description || 'Default Description',
        image: contentData.translations[locale]?.image || '',
        url: canonicalUrl,
      },
      faqs: contentData.translations[locale]?.faqs || [],
      relatedTools: contentData.translations[locale]?.relatedTools || [],
      reactions: contentData.translations[locale]?.reactions || { likes: 0, unlikes: 0, reports: [], users: {} },
      translations: contentData.translations,
      hreflangs,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return generateNotFoundResponse(protocol, host);
  }
};

// Helper function for generating "Not Found" response
const generateNotFoundResponse = (protocol, host) => ({
  content: 'Not Found',
  meta: {
    title: 'Not Found',
    description: 'The requested content is not available.',
    image: '',
    url: `${protocol}://${host}`,
  },
  faqs: [],
  relatedTools: [],
  reactions: { likes: 0, unlikes: 0, reports: [], users: {} },
  translations: [],
  hreflangs: [
    { rel: "alternate", hreflang: "x-default", href: `${protocol}://${host}` },
    { rel: "alternate", hreflang: "en", href: `${protocol}://${host}` },
  ],
});



export const fetchReviews = async (tool, host, protocol) => {
  const AUTH_TOKEN = "AZ-fc905a5a5ae08609ba38b046ecc8ef00";

  try {
    const apiUrl = `${protocol}://${host}/api/reviews?tool=${tool}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(`Reviews not found for tool: ${tool}`);
      return []; // খালি অ্যারে রিটার্ন
    }

    const data = await response.json();
    return data.map((review) => ({
      ...review,
      createdAt: format(new Date(review.createdAt), 'MMMM dd, yyyy'),
    }));
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
};


export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [meta, setMeta] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
  });
  const [reviews, setReviews] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [hreflangs, setHreflangs] = useState([]);
  const fetchAndSetContent = async (category, locale, host, protocol, revalidate = false) => {
    const data = await fetchContent(category, locale, host, protocol, revalidate);
    setContent(data.content);
    setMeta(data.meta);
    setFaqs(data.faqs);
    setTranslations(data.translations);
    setHreflangs(data.hreflangs);
  };
  return (
    <ContentContext.Provider
      value={{
        content,
        meta,
        faqs,
        reactions,
        translations,
        reviews,
        fetchAndSetContent,
        hreflangs,
        setContent,
        setFaqs,
        setMeta,
        setReviews,
        setTranslations,
        setHreflangs,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
