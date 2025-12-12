import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { News } from "./pages/News";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [articles, setArticles] = useState([]);
  const { theme } = useContext(ThemeContext);

  const fetchDefaultNews = async () => {
    try {
      const res = await axios.get(
        `/api/top-headlines?country=in&category=general&max=30`
      );
      setArticles(res.data.articles || []);
    } catch (error) {
      console.error("Default news error:", error);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Navbar setArticles={setArticles} fetchDefaultNews={fetchDefaultNews} />

      <Routes>
        <Route
          path="/"
          element={
            <News
              country="in"
              category="general"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/business"
          element={
            <News
              country="in"
              category="business"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <News
              country="in"
              category="entertainment"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/general"
          element={
            <News
              country="in"
              category="general"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/health"
          element={
            <News
              country="in"
              category="health"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/science"
          element={
            <News
              country="in"
              category="science"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/sports"
          element={
            <News
              country="in"
              category="sports"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route
          path="/technology"
          element={
            <News
              country="in"
              category="technology"
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
