// code away!
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = 8000;
const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({
       Message: `app is up and running now.`
    })
})

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})
