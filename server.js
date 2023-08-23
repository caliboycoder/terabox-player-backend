const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

const PORT = process.env.PUBLIC_PORT || 4000;
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static('views'));

app.get("/:url", async (req, res) => {
  try {
    const decodedUrl = decodeURIComponent(req.params.url);
    const response = await axios.head(decodedUrl);
    const downloadLink = response.request.res.responseUrl;
    res.render("player", { downloadLink });
  } catch (error) {
    res.status(400).json({
        success: false,
        msg: "Something went wrong"
    })
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
