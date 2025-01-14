import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchContent, fetchReviews } from '../contexts/ContentContext';

export const getContentProps = async (category, locale, req) => {
  // লোকাল এবং প্রোডাকশন হোস্ট ডাইনামিকভাবে সেট করুন
  const host = process.env.NEXT_PUBLIC_HOST || 'shoes-converter.vercel.app';
  const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'https';

  const contentProps = await fetchContent(category, locale, host, protocol, () => {});
  const reviews = await fetchReviews(category, host, protocol, () => {});

  return {
    props: {
      ...contentProps, // কনটেন্ট প্রপার্টিজ
      reviews,         // রিভিউ ডেটা
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
