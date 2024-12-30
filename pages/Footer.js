/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";
import { FaCcMastercard, FaFacebook, FaInstagram, FaLinkedin, FaPaypal, FaStripe, FaTwitter } from "react-icons/fa";
import logo from "../public/yt icon.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t] = useTranslation('footer');

  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
            {/* <!-- Solutions Column --> */}
            <div>
              <Link href="/"> 
                <Image 
                  src={logo}
                  alt="GFG logo served with static path of public directory"
                  height="150"
                  width="250"
                /> 
              </Link>
              <p className="mt-5 text-gray-400">
                {t('Welcome to Shoe Size Convert – Your trusted guide for easily converting men’s, women’s, and kids’ shoe sizes across different countries!')}
              </p>
              <div className="flex mt-4 space-x-2">
                <FaFacebook className="fs-3 hover:text-blue-800 transition duration-300 transform hover:scale-110" />
                <FaInstagram className="fs-3 ms-2 hover:text-pink-800 transition duration-300 transform hover:scale-110" />
                <FaTwitter className="fs-3 ms-2 hover:text-blue-600 transition duration-300 transform hover:scale-110" />
                <FaLinkedin className="fs-3 ms-2 hover:text-blue-900 transition duration-300 transform hover:scale-110" />
              </div>
            </div>
            {/* <!-- Support Column --> */}
            <div>
              <h5 className="text-sm font-semibold uppercase text-white">
                {t('Help & Support')}
              </h5>
              <ul className="mt-4 space-y-2">
               
                <li>
                  <Link href="/refund" className="text-gray-300 hover:text-white">
                    {'Refund Policy'}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    {t('Contact Us')}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white">
                    {t('Terms of Service')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white">
                    {t('Privacy Policy')}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white">
                    {t('Blog')}
                  </Link>
                </li>
              </ul>
            </div>
            {/* <!-- Company Column --> */}
            <div>
              <h5 className="text-sm font-semibold uppercase text-white">Our Tools</h5>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/men-to-women" className="text-gray-300 hover:text-white">
                    {t('Men to Women shoe size converter')}
                  </Link>
                </li>
                <li>
                  <Link href="country/european" className="text-gray-300 hover:text-white">
                    {t('European shoe size converter')}
                  </Link>
                </li>
                <li>
                  <Link href="/kids" className="text-gray-300 hover:text-white">
                    {t('Kids Shoe Size Calculator')}
                  </Link>
                </li>
                <li>
                  <Link href="/men" className="text-gray-300 hover:text-white">
                    {t('Men Shoe Size Converter')}
                  </Link>
                </li>
                <li>
                  <Link href="/brand/puma" className="text-gray-300 hover:text-white">
                    {t('Puma Shoe Size Converter')}
                  </Link>
                </li>
                <li>
                  <Link href="/women" className="text-gray-300 hover:text-white">
                    {t('Women Shoe Size Converter')}
                  </Link>
                </li>
               
              </ul>
            </div>
            {/* <!-- Payment Section --> */}
            <div className="sm:col-span-2 md:col-span-4 lg:col-span-1">
              <h5 className="text-sm font-semibold uppercase text-white">
                {t('Contact')}
              </h5>
              <h6 className="mt-2 text-white-400 fw-bold text-white">
                USA: <span className="text-gray-400 ">{t('30 N Gould St Ste R Sheridan WY 82801, United States')}</span>
              </h6>
              <p className="mt-2 text-gray-400">
                {t('The latest news, articles, and resources, sent to your inbox weekly.')}
              </p>
              <form action="#" method="POST" className="mt-4">
                <div className="flex flex-col mt-1 space-y-2">
                  <input
                    type="email"
                    name="email"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-3 pt-3 pb-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {t('Subscribe')}
                  </button>
                </div>
              </form>
             
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Footer;










