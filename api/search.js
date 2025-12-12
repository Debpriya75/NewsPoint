import axios from "axios";

export default async function handler(req, res) {
  try {
    const { q = "", max = 20, lang = "en" } = req.query;

    if (!q) {
      return res.status(200).json({ articles: [] });
    }

    const response = await axios.get(
      "https://gnews.io/api/v4/search",
      {
        params: { q, max, lang },
        headers: {
          "X-Api-Key": process.env.GNEWS_KEY,
        },
      }
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(response.data);

  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: error.message });
  }
}
