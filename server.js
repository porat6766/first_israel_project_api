const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const fak_url = "https://fakestoreapi.com";

app.use(express.json());
// Route to get data
app.get("/data", async (req, res) => {
  try {
    res.send("HELLO FROM THE SERVER");
  } catch (err) {
    console.error("error: ", err);
    res.status(500).send("Server Error");
  }
});

app.get("/api/product/get/:id", (req, res) => {
  const { id } = req.params;
  try {
    axios
      .get(`${fak_url}/products/${id}`)
      .then((response) => {
        if (!response.data) {
          res.status(400).send("id not exist");
          return;
        }
        res.json(response.data);
      })
      .catch((err) => {
        console.error("error fatching api:", err);
      });
  } catch (err) {
    console.error("error: ", err);
    res.status(500).send("Server Error");
  }
});

app.post("/api/product/add", (req, res) => {
  const { title, price, description, image, category } = req.body;
  try {
    const data = {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    };
    axios
      .post(`${fak_url}/products`, data)
      .then((response) => {
        if (!title || !price || !description || !image || !category) {
          res.status(400).send("probably you miss field");
          return;
        }
        res.json(response.data);
      })
      .catch((err) => {
        console.error("error fatching api:", err);
      });
  } catch (err) {
    console.error("error: ", err);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
