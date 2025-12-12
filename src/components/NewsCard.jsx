import React from "react";

export const NewsCard = ({ article }) => {
  const { source, author, title, description, url, image, publishedAt } =
    article;

  const imgSrc = image || "/placeholder.jpg"; // fallback image

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 hover:scale-105 transition-all rounded-xl shadow-md overflow-hidden hover:shadow-lg duration-300">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover bg-gray-400"
      />

      <div className="p-4">
        {/* external news link */}
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 transition">
            {title}
          </h2>
        </a>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {description?.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex flex-col">
          <span>By {author || "Unknown"}</span>
          <span>
            {publishedAt
              ? new Date(publishedAt).toLocaleDateString()
              : "No date"}
          </span>
        </div>

        <div className="mt-1 text-xs text-blue-500 font-medium">
          Source: {source?.name || "N/A"}
        </div>
      </div>
    </div>
  );
};
