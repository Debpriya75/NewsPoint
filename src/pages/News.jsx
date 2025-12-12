import React, { useEffect, useState } from "react";
import axios from "axios";
import { NewsCard } from "../components/NewsCard";
import { Loader2 } from "lucide-react";

export const News = ({ country, category, articles, setArticles }) => {
  const [loading, setLoading] = useState(false);

  const fetchAllNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&max=30&apikey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setArticles(res.data.articles || []);
      console.log(res.data.articles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, [category, country]);

  return (
    <>
      {loading ? (
        <div className="bg-gray-200 dark:bg-gray-800 h-screen flex flex-col gap-3 items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin dark:text-gray-200" />
          <h1 className="text-gray-800 text-xl font-semibold dark:text-gray-200">
            Loading...
          </h1>
        </div>
      ) : (
        <div className="min-h-screen dark:text-white bg-gray-200 dark:bg-gray-800 py-24 px-4 md:px-0">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-7">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
