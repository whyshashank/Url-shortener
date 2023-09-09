const express = require("express")
const {handleGenerateNewUrlShort,handleGetAnalytics}= require("../controllers/url.js")
const router= express.Router();

router.post("/",handleGenerateNewUrlShort)
router.get("/analytics/:id",handleGetAnalytics)

module.exports=router