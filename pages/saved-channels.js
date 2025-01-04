import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';


const SavedChannels = () => {
  const [savedChannels, setSavedChannels] = useState([]);

  const allTools = [
    { name: 'YouTube Tag Generator', link: 'http://www.ShoeSizeCalculator.com/', },
    { name: 'Youtube Tag Extractor', link: 'http://www.ShoeSizeCalculator.com/tools/tag-extractor', },
    { name: 'Youtube Title Generator', link: 'http://www.ShoeSizeCalculator.com/tools/title-generator', },
    { name: 'Youtube Description Generator', link: 'http://www.ShoeSizeCalculator.com/tools/description-generator', },
    { name: 'Youtube Title&Description Extractor', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-title-and-description-extractor', },
    { name: 'YouTube Channel Banner Downloader', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-channel-banner-downloader', },
    { name: 'YouTube Hashtag Generator', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-hashtag-generator', },
    { name: 'YouTube Channel Logo Downloader', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-channel-logo-downloader', },
    { name: 'YouTube Thumbnail Downloader', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-thumbnail', },
    { name: 'YouTube Channel ID Finder', link: 'http://www.ShoeSizeCalculator.com/tools/channel-id-finder', },
    { name: 'YouTube Video Data Viewer', link: 'http://www.ShoeSizeCalculator.com/tools/video-data-viewer', },
    { name: 'YouTube Monetization Checker', link: 'http://www.ShoeSizeCalculator.com/tools/monetization-checker', },
    { name: 'YouTube Channel Search', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-channel-search', },
    { name: 'YouTube Video Summary Generator', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-video-summary-generator', },
    { name: 'YouTube Trending Videos', link: 'http://www.ShoeSizeCalculator.com/tools/trending-videos', },
    { name: 'YouTube Money Calculator', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-money-calculator', },
    { name: 'Youtube Comment Picker', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-comment-picker', },
    { name: 'YouTube Keyword Research', link: 'http://www.ShoeSizeCalculator.com/tools/keyword-research', },
    { name: 'YouTube Embed Code Generator', link: 'http://www.ShoeSizeCalculator.com/tools/youtube-embed-code-generator', },
  ];

  useEffect(() => {
    const channels = JSON.parse(localStorage.getItem('savedChannels') || '[]');

    const enhancedChannels = channels.map(channel => {
      const matchedTool = allTools.find(tool => tool.name === channel.toolName);
      return {
        ...channel,
        // toolImage: matchedTool ? matchedTool.logo.src : null,
        toolUrl: matchedTool ? matchedTool.link : channel.toolUrl,
      };
    });

    setSavedChannels(enhancedChannels);
  }, []);

  return (
    <div className="related-tools max-w-7xl mx-auto mt-10 shadow-lg p-5 rounded-lg bg-white">
      <Head>
        {/* SEO Meta Tags */}
        <title>Saved Shoe Size Converter - ShoeSizeCalculator</title>
        <meta name="description" content="Access all your saved Shoe Size Converter and channels from ShoeSizeCalculator in one place for easy access." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href="http://www.ShoeSizeCalculator.com/saved-channels" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.ShoeSizeCalculator.com/saved-channels" />
        <meta property="og:title" content="Saved Shoe Size Converter - ShoeSizeCalculator" />
        <meta property="og:description" content="Access all your saved Shoe Size Converter and channels from ShoeSizeCalculator in one place for easy access." />
        <meta property="og:image" content="https://www.ShoeSizeCalculator.com/images/saved-channels-thumbnail.jpg" />
        <meta property="og:image:secure_url" content="https://www.ShoeSizeCalculator.com/images/saved-channels-thumbnail.jpg" />
        <meta property="og:site_name" content="ShoeSizeCalculator" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="ShoeSizeCalculator.com" />
        <meta property="twitter:url" content="http://www.ShoeSizeCalculator.com/saved-channels" />
        <meta name="twitter:title" content="Saved Shoe Size Converter - ShoeSizeCalculator" />
        <meta name="twitter:description" content="Access all your saved Shoe Size Converter and channels from ShoeSizeCalculator in one place for easy access." />
        <meta name="twitter:image" content="https://www.ShoeSizeCalculator.com/images/saved-channels-thumbnail.jpg" />
        <meta name="twitter:site" content="@ShoeSizeCalculator" />
        <meta name="twitter:image:alt" content="Saved Shoe Size Converter Thumbnail" />
      </Head>

      <h2 className="text-2xl font-bold mb-5 text-center">Saved Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedChannels.length > 0 ? (
          savedChannels.map((channel, index) => (
            <a
              key={index}
              href={channel.toolUrl}
              className="flex items-center border rounded-lg p-4 bg-gray-100 transition"
            >
              {/* {channel.toolImage && (
                <Image
                  src={channel.toolImage}
                  alt={`${channel.toolName} Icon`}
                  width={64}
                  height={64}
                  className="mr-4"
                />
              )} */}
              <span className="text-blue-600 font-medium">{channel.toolName}</span>
            </a>
          ))
        ) : (
          <p>No channels saved.</p>
        )}
      </div>
    </div>
  );
};

export default SavedChannels;
