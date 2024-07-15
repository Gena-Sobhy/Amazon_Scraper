const express = require("express");
const request = require("request-promise");

require("dotenv").config();

const baseUrl = `http://api.scraperapi.com?api_key=${process.env.API_KEY}&autoparse=true`;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Get Product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/dp/${productId}`
    );
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
// Get Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/product-reviews/${productId}`
    );
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
// Get Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
// Get Search Results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  try {
    const response = await request(
      `${baseUrl}&url=http://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on Port:${PORT}`));
