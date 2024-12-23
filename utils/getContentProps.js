import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchContent, fetchReviews } from '../contexts/ContentContext';

// getContentProps ফাংশনটি কনটেন্ট ফেচের জন্য ব্যবহার করা হচ্ছে
export const getContentProps = async (category, locale, req) => {
  const host = "shoes-converter.vercel.app";  // এখানে localhost ব্যবহার করুন, প্রোটোকল হিসেবে http: ব্যবহার করতে পারেন

  const contentProps = await fetchContent(category, locale, host, "https");  // এখানে http প্রোটোকল ব্যবহার হচ্ছে
  const reviews = await fetchReviews(category, host, "https");

  return {
    props: {
      ...contentProps,  // কনটেন্ট প্রপার্টিজ
      reviews,          // রিভিউ ডেটা
      ...(await serverSideTranslations(locale, [
        'common',
        'women',
        'navbar',
        'adidas',
        'alegria',
        'asian',
        'asics',
        'asos',
        'australian',
        'brazilian',
        'canadian',
        'chinese',
        'clarks',
        'colombian',
        'dr-martens',
        'european',
        'france',
        'footer',
        'pricing',
        'german',
        'home',
        'indian',
        'italian',
        'japanese',
        'kids',
        'korean',
        'men-to-women',
        'men',
        'merrell',
        'mexican',
        'nike',
        'philippines',
        'shein',
        'shimano',
        'spanish',
        'timberland',
        'ugg',
        
      ])),
    },
  };
};
