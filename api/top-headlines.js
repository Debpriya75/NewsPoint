import axios from "axios";

export default async function handler(req, res) {
  try {
    const { country = "in", category = "general", max = 30 } = req.query;

    const response = await axios.get(
      "https://gnews.io/api/v4/top-headlines",
      {
        params: { country, category, max },
        headers: {
          "X-Api-Key": process.env.GNEWS_KEY, // comes from Vercel
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
