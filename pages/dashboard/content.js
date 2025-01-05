import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Layout from "./layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";


// Dynamically import the QuillWrapper component with SSR disabled
const QuillWrapper = dynamic(() => import("../../components/EditorWrapper"), {
  ssr: false,
});

function Content() {
  const [quillContent, setQuillContent] = useState("");
  const [existingContent, setExistingContent] = useState("");
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("tagGenerator"); // Default category
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null); // State to hold the existing image URL
  const [faqs, setFaqs] = useState([]);
  const [relatedTools, setRelatedTools] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const { t } = useTranslation("navbar");

  // Static list of all tools
  const allTools = [
    {
      name: "Shoes Conversation",
      link: "http://www.ytubetools.com/",
      logo: "https://shoesizeconvert.s3.amazonaws.com/uploads/1736052096145-logo-white-red.png",
    },
    {
      name: "Women Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/tag-extractor",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993310808-women.jpg",
    },
    {
      name: "Men Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/title-generator",
      logo: "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993351686-man.png",
    },
    {
      name: "Kids Shoe Size Calculator",
      link: "http://www.ytubetools.com/tools/description-generator",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993379478-kids.png",
    },
    {
      name: "Men to Women Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/description-generator",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736052036888-mentowoemn.png",
    },
    {
      name: "European Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/youtube-title-and-description-extractor",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993411517-british-columbia.png",
    },
    {
      name: "Brazilian Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/youtube-channel-banner-downloader",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993441038-brazil-flag.png",
    },
    {
      name: "Mexican Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/youtube-hashtag-generator",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993473789-mexico.png",
    },
    {
      name: "Australian Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/youtube-channel-logo-downloader",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993501926-australia.png",
    },
    {
      name: "Clarks Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/youtube-thumbnail",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051578848-clarkslogoupdate.png",
    },
    {
      name: "Nike Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/channel-id-finder",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735993992406-nike.png",
    },
    {
      name: "Adidas Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/video-data-viewer",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735994015844-adidas.png",
    },
    {
      name: "Dr. Martens Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/monetization-checker",
      logo: "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051616462-drm.png",
    },
    {
      name: "Puma Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/youtube-channel-search",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735994077148-puma.png",
    },
    {
      name: "Timberland Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/youtube-video-summary-generator",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735994118639-timberland.png",
    },
    {
      name: "Ugg Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      logo: "https://shoesizeconvert.s3.amazonaws.com/uploads/1735994172516-ugglogo.jpg",
    },
    {
      name: "Italian Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1735994226645-circle.png",
    },
    {
      name: "Spanish Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736050686812-spain.png",
    },
    {
      name: "Korean Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736050730760-koran.png",
    },
    {
      name: "Japanese Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736050753553-japan.png",
    },
    {
      name: "Indian Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736050818894-india.png",
    },
    {
      name: "Asian Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736050842364-asian.jpg",
    },
    {
      name: "Canadian Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736050880197-canada.png",
    },
  
    {
      name: "Colombian Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051000305-british-columbia.png",
    },
  
    {
      name: "France Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051029872-france.png",
    },
    {
      name: "Philippines Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051093184-philippines.png",
    },
    {
      name: "German Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051117519-flagofgermanysvg.webp",
    },
  
    {
      name: "Chinese Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051151368-chinese.png",
    },
    {
      name: "Alegria Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051182559-alegria.png",
    },
    {
      name: "Asics Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051205190-asics.webp",
    },
    {
      name: "Asos Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051665079-asos.png",
    },
    {
      name: "Merrell Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051245007-merrell.png",
    },
    {
      name: "Shein Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051290380-shein.png",
    },
    {
      name: "Shimano Shoe Size Converter",
      link: "http://www.ytubetools.com/tools/trending-videos",
      
      logo:  "https://shoesizeconvert.s3.amazonaws.com/uploads/1736051698920-shimano.png",
    },
  
   

    // Add more tools as needed
  ];

  useEffect(() => {
    fetchContent();
  }, [selectedCategory, selectedLanguage]); // Fetch content and FAQs when category or language changes

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `/api/content?category=${selectedCategory}&language=${selectedLanguage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer AZ-fc905a5a5ae08609ba38b046ecc8ef00`, // Add Authorization header
            "Content-Type": "application/json", // Optional: Include Content-Type if needed
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const data = await response.json();

      if (data?.translations?.[selectedLanguage]) {
        const contentData = data.translations[selectedLanguage].content || "";
        const faqsData = data.translations[selectedLanguage].faqs || [];
        const relatedToolsData =
          data.translations[selectedLanguage].relatedTools || [];
        const metatitle = data.translations[selectedLanguage].title || "";
        const metaDescription =
          data.translations[selectedLanguage].description || "";
        const imageUrl = data.translations[selectedLanguage].image || "";

        setQuillContent(contentData);
        setExistingContent(contentData);
        setTitle(metatitle);
        setDescription(metaDescription);
        setImage(null); // Reset the image state to ensure it updates correctly
        setExistingImage(imageUrl); // Set the existing image URL from the fetched data
        setFaqs(faqsData);
        setRelatedTools(relatedToolsData);
        setIsEditing(!!contentData); // Set editing mode based on whether content exists
        setAvailableLanguages(Object.keys(data.translations));
      } else {
        // Clear the input fields if no content is available for the selected language
        clearFields();
        setAvailableLanguages(Object.keys(data.translations || {}));
      }
    } catch (error) {
      console.error("Error fetching content:", error.message);
      setError(error.message);
      clearFields(); // Clear fields if there's an error
      setAvailableLanguages([]);
    }
  };

  const clearFields = () => {
    setQuillContent("");
    setExistingContent("");
    setTitle("");
    setDescription("");
    setImage(null);
    setExistingImage(null);
    setFaqs([]);
    setRelatedTools([]);
    setIsEditing(false);
  };

  const handleSubmit = useCallback(async () => {
    try {
      const method = isEditing ? "PUT" : "POST";

      // Prepare form data
      const formData = new FormData();
      formData.append("content", quillContent);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("language", selectedLanguage); // Add language to form data
      if (image) {
        formData.append("image", image);
      }
      formData.append("faqs", JSON.stringify(faqs));
      formData.append("relatedTools", JSON.stringify(relatedTools));

      const response = await fetch(
        `/api/content?category=${selectedCategory}&language=${selectedLanguage}`,
        {
          method,
          headers: {
            Authorization: `Bearer AZ-fc905a5a5ae08609ba38b046ecc8ef00`, // Add Authorization header
          },
          body: formData,
        }
      );
      console.log(response);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to post content: ${errorMessage}`);
      }

      // Handle success
      setError(null);
      setExistingContent(quillContent);
      setExistingImage(image ? URL.createObjectURL(image) : existingImage); // Set the existing image after upload
      toast.success("Content uploaded successfully!");
    } catch (error) {
      console.error("Error posting content:", error.message);
      setError(error.message);
    }
  }, [
    quillContent,
    selectedCategory,
    selectedLanguage,
    isEditing,
    title,
    description,
    image,
    faqs,
    relatedTools,
    existingImage,
  ]);

  const handleQuillChange = useCallback((newContent) => {
    setQuillContent(newContent);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const handleLanguageChange = useCallback((e) => {
    setSelectedLanguage(e.target.value);
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFaqChange = (index, key, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][key] = value;
    setFaqs(updatedFaqs);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const handleRelatedToolChange = (index, key, value) => {
    const updatedTools = [...relatedTools];
    if (key === "logo") {
      updatedTools[index][key] = value.target.files[0];
    } else {
      updatedTools[index][key] = value;
    }
    setRelatedTools(updatedTools);
  };

  const addRelatedTool = () => {
    setRelatedTools([...relatedTools, { name: "", link: "", logo: null }]);
  };

  const removeRelatedTool = (index) => {
    const updatedTools = relatedTools.filter((_, i) => i !== index);
    setRelatedTools(updatedTools);
  };

  const handleToolSelection = (tool) => {
    if (relatedTools.some((relatedTool) => relatedTool.name === tool.name)) {
      setRelatedTools(
        relatedTools.filter((relatedTool) => relatedTool.name !== tool.name)
      );
    } else {
      setRelatedTools([...relatedTools, tool]);
    }
  };

  const renderHeader = () => {
    switch (selectedCategory) {
      case "shoe-conversation":
        return "Shoe Conversation";
      case "women":
        return "Women Shoe Size Converter";
      case "men":
        return "Men Shoe Size Converter";
      case "kids":
        return "Kids Shoe Size Calculator";
      case "men-to-women":
        return "Men to Women Shoe Size Converter";
      case "european":
        return "European Shoe Size Converter";
      case "brazilian":
        return "Brazilian Shoe Size Converter";
      case "mexican":
        return "Mexican Shoe Size Converter";
      case "australian":
        return "Australian Shoe Size Converter";
      case "clarks":
        return "Clarks Shoe Size Converter";
      case "nike":
        return "Nike Shoe Size Converter";
      case "adidas":
        return "Adidas Shoe Size Converter";
      case "dr-martens":
        return "Dr. Martens Shoe Size Converter";
      case "puma":
        return "Puma Shoe Size Converter";
      case "timberland":
        return "Timberland Shoe Size Converter";
      case "ugg":
        return "Ugg Shoe Size Converter";
      case "italian":
        return "Italian Shoe Size Converter";
     
      case "korean":
        return "Korean Shoe Size Converter";
      case "japanese":
        return "Japanese Shoe Size Converter";
      case "spanish":
        return "Spanish Shoe Size Converter";
      case "indian":
        return "Indian Shoe Size Converter";
      case "asian":
        return "Asian Shoe Size Converter";
      case "france":
        return "France Shoe Size Converter";
      case "philippines":
        return "Philippines Shoe Size Converter";
      case "german":
        return "German Shoe Size Converter";
      case "chinese":
        return "Chinese Shoe Size Converter";
      case "alegria":
        return "Alegria Shoe Size Converter";
      case "asics":
        return "Asics Shoe Size Converter";
      case "asos":
        return "Asos Shoe Size Converter";
      case "merrell":
        return "Merrell Shoe Size Converter";
      case "shein":
        return "Shein Shoe Size Converter";
      case "shimano":
        return "Shimano Shoe Size Converter";
     
      default:
        return "Unknown Category";
    }
  };

  return (
    <Layout>
      <div className="container p-5">
        <h2>Content Add For {renderHeader()}</h2>
        <div className="mb-3 flex items-center">
          <label htmlFor="category" className="mr-2 text-sm font-medium">
            Select Category:
          </label>
          <div className="relative">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="shoe-conversation">Shoe Conversation</option>
              <option value="women">Women Shoe Size Converter</option>
              <option value="men">Men Shoe Size Converter</option>
              <option value="kids">Kids Shoe Size Calculator</option>
              <option value="men-to-women">
                Men to Women Shoe Size Converter
              </option>
              <option value="european">European Shoe Size Converter</option>
              <option value="brazilian">Brazilian Shoe Size Converter</option>
              <option value="mexican">Mexican Shoe Size Converter</option>
              <option value="australian">Australian Shoe Size Converter</option>
              <option value="clarks">Clarks Shoe Size Converter</option>
              <option value="nike">Nike Shoe Size Converter</option>
              <option value="adidas">Adidas Shoe Size Converter</option>
              <option value="dr-martens">
                Dr. Martens Shoe Size Converter
              </option>
              <option value="puma">Puma Shoe Size Converter</option>
              <option value="timberland">Timberland Shoe Size Converter</option>
              <option value="ugg">Ugg Shoe Size Converter</option>
              <option value="italian">Italian Shoe Size Converter</option>
              <option value="japanese">Japanese Shoe Size Converter</option>
              <option value="korean">Korean Shoe Size Converter</option>
              <option value="spanish">Spanish Shoe Size Converter</option>
              <option value="indian">Indian Shoe Size Converter</option>
              <option value="asian">Asian Shoe Size Converter</option>
              <option value="canadian">Canadian Shoe Size Converter</option>
              <option value="colombian">Colombian Shoe Size Converter</option>
              <option value="france">France Shoe Size Converter</option>
              <option value="philippines">Philippines Shoe Size Converter</option>
              <option value="german">German Shoe Size Converter</option>
              <option value="chinese">Chinese Shoe Size Converter</option>
              <option value="alegria">Alegria Shoe Size Converter</option>
              <option value="asics">Asics Shoe Size Converter</option>
              <option value="asos">Asos Shoe Size Converter</option>
              <option value="merrell">Merrell Shoe Size Converter</option>
              <option value="shein">Shein Shoe Size Converter</option>
              <option value="shimano">Shimano Shoe Size Converter</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L7 9.414V17a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-3 flex items-center">
          <label htmlFor="language" className="mr-2 text-sm font-medium">
            Select Language:
          </label>
          <div className="relative">
            <select
              id="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="nl">Nederlands</option>
              <option value="gu">ગુજરાતી</option>
              <option value="hi">हिंदी</option>
              <option value="it">Italiano</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="pl">Polski</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              {/* Add more languages as needed */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L7 9.414V17a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label htmlFor="title" className="block text-sm font-medium">
              Meta Title:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic">
              Recommended length: 60 characters
            </p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block text-sm font-medium">
            Meta Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          />
          <p className="text-gray-600 text-xs italic">
            Recommended length: 155-160 characters
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full text-gray-700"
          />
          {existingImage && (
            <div className="mt-2">
              <p className="text-gray-600 text-xs italic">Current Image:</p>
              <img
                src={existingImage}
                alt="Existing"
                className="w-32 h-32 object-cover mt-1"
              />
            </div>
          )}
          <p className="text-gray-600 text-xs italic">
            Recommended dimension: 1200 x 630
          </p>
        </div>
        {error && <div className="text-red-500">Error: {error}</div>}
        <QuillWrapper
          initialContent={quillContent}
          onChange={handleQuillChange}
        />

        <div className="faq-section mt-10">
          <h2>Manage FAQs</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="flex-1 border rounded py-2 px-3 mr-2"
                />
                <button
                  onClick={() => removeFaq(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) =>
                  handleFaqChange(index, "answer", e.target.value)
                }
                className="w-full border rounded py-2 px-3"
              />
            </div>
          ))}
          <button onClick={addFaq} className="btn btn-secondary p-2 mt-3">
            Add New FAQ
          </button>
        </div>

        <div className="related-tools-section mt-10">
          <h2>Manage Related Tools</h2>
          <div className="grid grid-cols-3 gap-4">
            {allTools.map((tool, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={relatedTools.some(
                    (relatedTool) => relatedTool.name === tool.name
                  )}
                  onChange={() => handleToolSelection(tool)}
                  className="mr-2"
                />
                <span>{tool.name}</span>
                <img
                  src={tool?.logo}
                  alt={`${tool.name} logo`}
                  className="ml-2 w-12 h-12"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-primary p-2 mt-3" onClick={handleSubmit}>
          Submit Content
        </button>
        <div className="existing-content-section mt-10">
          <h2>{renderHeader()} Content</h2>
          <div dangerouslySetInnerHTML={{ __html: existingContent }}></div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Content;
