const express = require("express");
const urlRoute = require("./router/url.js");
const { connectToMongo } = require("./connect.js");
const URL= require("./models/url.js")
const app = express();

PORT = 5000;

app.use(express.json());

connectToMongo("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("mongo connected");
});



app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
  
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
