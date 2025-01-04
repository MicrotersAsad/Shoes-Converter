import React, { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import 'flag-icons/css/flag-icons.min.css'; // Import flag-icons CSS
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import logo from '../public/yt icon.png';
import women from '../public/women.jpg';
import men from '../public/man.png';
import kids from '../public/kids.png';
import adidas from '../public/adidas.png';
import clarks from '../public/ClarksLogo_Update2.svg';
import drm from '../public/drm.svg';
import nike from '../public/nike.png';
import puma from '../public/puma.png';
import Timberland from '../public/Timberland.png';
import alegria from '../public/alegria.png';
import asics from '../public/asics.webp';
import ugg from '../public/ugg_Logo.jpg';
import Merrell from '../public/Merrell.png';
import shimano from '../public/shimano-2.svg';
import Shein from '../public/Shein .png';
import asos from '../public/asos.svg';
import australia from '../public/australia.png';
import brazil from '../public/brazil-flag.png';
import columbia from '../public/british-columbia.png';
import canada from '../public/canada.png';
import Chinese from '../public/Chinese.png';
import Germany from '../public/Flag_of_Germany.svg.webp';
import france from '../public/france.png';
import india from '../public/india.png';
import japan from '../public/japan.png';
import korian from '../public/koran.png';
import mexico from '../public/mexico.png';
import Philippines from '../public/Philippines.png';
import Italian from '../public/circle.png';
import spain from '../public/spain.png';
import asian from '../public/asian.jpg';
import { FaBookmark } from 'react-icons/fa';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const availableLanguages = [
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'fr', name: 'Français', flag: 'fr' },
  { code: 'nl', name: 'Nederlands', flag: 'nl' },
  { code: 'gu', name: 'ગુજરાતી', flag: 'in' },
  { code: 'hi', name: 'हिंदी', flag: 'in' },
  { code: 'it', name: 'Italiano', flag: 'it' },
  { code: 'ja', name: '日本語', flag: 'jp' },
  { code: 'ko', name: '한국어', flag: 'kr' },
  { code: 'pl', name: 'Polski', flag: 'pl' },
  { code: 'pt', name: 'Português', flag: 'pt' },
  { code: 'ru', name: 'Русский', flag: 'ru' },
  { code: 'es', name: 'Español', flag: 'es' },
  { code: 'de', name: 'Deutsch', flag: 'de' },
];

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation('navbar'); // Specify the namespace for translations
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = async (lang) => {
    if (availableLanguages.find((l) => l.code === lang)) {
      setSelectedLanguage(lang);
      await i18n?.changeLanguage(lang);
      router.push(router.pathname, router.asPath, { locale: lang }).then(() => {
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    if (router) {
      const handleRouteChange = () => NProgress.start();
      const handleRouteComplete = () => NProgress.done();
      router.events.on('routeChangeStart', handleRouteChange);
      router.events.on('routeChangeComplete', handleRouteComplete);
      router.events.on('routeChangeError', handleRouteComplete);
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
        router.events.off('routeChangeComplete', handleRouteComplete);
        router.events.off('routeChangeError', handleRouteComplete);
      };
    }
  }, [router]);

  const navigation = [
    { key: 'Home', href: '/', dropdown: false },
    {
      key: t('Regular Shoe Converter'),
      href: '#',
      dropdown: true,
      children: [
        {
          heading: t('Normal Tools'),
          items: [
            { key: t('Women Shoe Size Converter'), href: '/women', icon: women },
            { key: t('Men Shoe Size Converter'), href: '/men', icon: men },
            { key: t('Kids Shoe Size Calculator'), href: '/kids', icon: kids },
            { key: t('Men to Women Shoe Size Converter'), href: '/men-to-women', icon: '🔁' },
          ],
        },
      ],
    },
    {
      key: t('Country Shoe Converter'),
      href: '#',
      dropdown: true,
      children: [
        {
          heading: t('Country-Specific Tools'),
          items: [
            { key: t('European Shoe Size Converter'), href: '/country/european', icon: '🌍' },
            { key: t('Brazilian Shoe Size Converter'), href: '/country/brazilian', icon: brazil },
            { key: t('Mexican Shoe Size Converter'), href: '/country/mexican', icon: mexico },
            { key: t('Australian Shoe Size Converter'), href: '/country/australian', icon: australia },
            { key: t('Italian Shoe Size Converter'), href: '/country/italian', icon: Italian },
            { key: t('Japanese Shoe Size Converter'), href: '/country/japanese', icon: japan },
            { key: t('Korean Shoe Size Converter'), href: '/country/korean', icon: korian },
            { key: t('Spanish Shoe Size Converter'), href: '/country/spanish', icon: spain },
            { key: t('Indian Shoe Size Converter'), href: '/country/indian', icon: india },
            { key: t('Asian Shoe Size Converter'), href: '/country/asian', icon: asian },
            { key: t('Canadian Shoe Size Converter'), href: '/country/canadian', icon: canada },
            { key: t('Colombian Shoe Size Converter'), href: '/country/colombian', icon: columbia },
            { key: t('France Shoe Size Converter'), href: '/country/france', icon: france },
            { key: t('Philippines Shoe Size Converter'), href: '/country/philippines', icon: Philippines },
            { key: t('German Shoe Size Converter'), href: '/country/german', icon: Germany },
            { key: t('Chinese Shoe Size Converter'), href: '/country/chinese', icon: Chinese },
          ],
        },
      ],
    },
    {
      key: t('Brand Shoe Converter'),
      href: '#',
      dropdown: true,
      children: [
        {
          heading: t('Brand-Specific Tools'),
          items: [
            { key: t('Clarks Shoe Size Converter'), href: '/brand/clarks', icon: clarks },
            { key: t('Nike Shoe Size Converter'), href: '/brand/nike', icon: nike },
            { key: t('Adidas Shoe Size Converter'), href: '/brand/adidas', icon: adidas },
            { key: t('Dr. Martens Shoe Size Converter'), href: '/brand/dr-martens', icon: drm },
            { key: t('Puma Shoe Size Converter'), href: '/brand/puma', icon: puma },
            { key: t('Timberland Shoe Size Converter'), href: '/brand/timberland', icon: Timberland },
            { key: t('UGG Shoe Size Converter'), href: '/brand/ugg', icon: ugg },
            { key: t('Alegria Shoe Size Converter'), href: '/brand/alegria', icon: alegria },
            { key: t('Asics Shoe Size Converter'), href: '/brand/asics', icon: asics },
            { key: t('Asos Shoe Size Converter'), href: '/brand/asos', icon: asos },
            { key: t('Merrell Shoe Size Converter'), href: '/brand/merrell', icon: Merrell },
            { key: t('Shein Shoe Size Converter'), href: '/brand/shein', icon: Shein },
            { key: t('Shimano Shoe Size Converter'), href: '/brand/shimano', icon: shimano },
          ],
        },
      ],
    },
  
    // { key: 'Blog', href: '/blog', dropdown: false },
    // { key: 'About Us', href: '/about', dropdown: false },
    // { key: 'Contact Us', href: '/contact', dropdown: false },
  ];
  

  return (
    <>
          <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href='/'>
                      <Image
                        src={logo}
                        alt="YouTube Tools Logo"
                        height="70"
                        width="150"
                        priority 
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:block sm:ml-6 mx-auto">
                    <div className="flex space-x-4">
                    {navigation.map((item) =>
                        item.dropdown ? (
                          <Menu as="div" key={item.key} className="relative">
                          <Menu.Button
                            className={classNames(
                              router.pathname === item.href
                                ? 'bg-gray-700 text-white'
                                : 'text-gray-300 hover:text-red-500 hover:bg-gray-700',
                              'flex items-center px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            {item.key} <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                          <Menu.Items className="absolute z-50 p-3 w-[50rem] max-h-[40rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto">
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
  {item.children.map((section, idx) => (
    <div
      key={idx}
      className={classNames(
        "p-2 border rounded-md bg-gray-50 hover:shadow-md transition",
        idx % 2 === 0 && item.children.length > 1 ? "md:border-r md:border-gray-300" : "" 
      )}
    >
     
      <div className="grid grid-cols-2 gap-2">
        {section.items.map((subItem, subIdx) => (
          <Menu.Item key={subItem.key} className="border">
            {({ active }) => (
              <Link
                href={subItem.href}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-800 rounded-md'
                )}
              >
                {typeof subItem.icon === 'object' ? (
                  <Image
                    src={subItem.icon}
                    alt={subItem.key}
                    width={20}
                    height={20}
                    className="inline-block mr-2"
                  />
                ) : (
                  <span className="mr-2">{subItem.icon}</span>
                )}
                {subItem.key}
              </Link>
            )}
          </Menu.Item>
        ))}
      </div>
    </div>
  ))}
</div>


</Menu.Items>

                          </Transition>
                        </Menu>
                        
                        
                        
                        ) : (
                          <Link
                            key={item.key}
                            href={item.href}
                            className={classNames(
                              router.pathname === item.href ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            {t(item.key)}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <Link
  href="/saved-channels"
  className={classNames(
    router.pathname === '/saved-channels' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700',
    'px-3 py-2 rounded-md text-sm font-medium flex items-center'
  )}
>
  <FaBookmark className="mr-2 fs-3 text-yellow-300" /> {/* This adds an icon */}
  {/* Adjust this to the correct key for translation */}
</Link>


                <div className=" flex items-center inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="relative inline-block text-left lan mr-4 hidden sm:flex block">
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="inline-flex lan justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className={`fi fi-${availableLanguages.find(l => l.code === selectedLanguage)?.flag}`} />
                          <span className="ml-2">{availableLanguages.find(l => l.code === selectedLanguage)?.name}</span>
                          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {availableLanguages.map(lang => (
                              <Menu.Item key={lang.code}>
                                {({ active }) => (
                                  <button
                                    onClick={() => changeLanguage(lang.code)}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm')}
                                  >
                                    <span className={`fi fi-${lang.flag} mr-2`}></span>
                                    {lang.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <Link href="/contact">
                      <button className="text-gray-300 bg-red-700 hover:text-red-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                        {t('Contact')}
                      </button>
                    </Link>
                  
                  {/* {user ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          {user.profileImage ? (
                            <Image
                              src={`${user.profileImage}`}
                              alt="User profile image"
                              className="w-8 h-8 rounded-full"
                              width={32}
                              height={32}
                              priority 
                            />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                            
                        </Menu.Button>
                        
                      </div>
                     
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/user/profile" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                {t('Profile')}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/dashboard/dashboard" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                {t('Dashboard')}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button onClick={logout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                {t('Logout')}
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                   
                  )} */}
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                  item.dropdown ? (
                    <Menu as="div" key={item.key} className="px-2 py-3 space-y-1">
                      <Menu.Button className="w-full text-left flex items-center text-gray-300 hover:text-red-500 hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium">
                        {t(item.key)} <ChevronDownIcon className="ml-auto h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Menu.Items className="flex flex-col pl-4 space-y-1 bg-gray-700 p-2 rounded-md overflow-y-auto max-h-[50vh]">
              {item.children.map((section) => (
                <div key={section.heading}>
                  <h4 className="font-semibold text-white">{t(section.heading)}</h4>
                  {section.items.map((subItem) => (
                    <Menu.Item key={subItem.key}>
                      {({ active }) => (
                        <Link
                          href={subItem.href}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-700'
                              : 'text-gray-300 hover:bg-gray-600 hover:text-white',
                            'block px-4 py-2 rounded-md'
                          )}
                        >
                          {typeof subItem.icon === 'object' ? (
                            <Image
                              src={subItem.icon}
                              alt={subItem.key}
                              width={20}
                              height={20}
                              className="inline-block mr-2"
                            />
                          ) : (
                            <span className="mr-2">{subItem.icon}</span>
                          )}
                          {subItem.key}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              ))}
            </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link key={item.key} href={item.href} className={classNames(
                      router.pathname === item.href ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}>
                      {t(item.key)}
                    </Link>
                  )
                ))}
                <div className="flex lan items-center justify-center lan mt-4 space-x-4">
                  <Menu as="div" className="relative inline-block lan text-left">
                    <div>
                      <Menu.Button className="inline-flex lan justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className={`fi fi-${availableLanguages.find(l => l.code === selectedLanguage)?.flag}`} />
                        <span className="ml-2">{availableLanguages.find(l => l.code === selectedLanguage)?.name}</span>
                        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {availableLanguages.map(lang => (
                            <Menu.Item key={lang.code}>
                              {({ active }) => (
                                <button
                                  onClick={() => changeLanguage(lang.code)}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm')}
                                >
                                  <span className={`fi fi-${lang.flag} mr-2`}></span>
                                  {lang.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

export default Navbar;
