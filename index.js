// code away!
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { logger } = require("./middleware/logger");

const PORT = 8000;
const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(logger);
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({
       Message: `app is up and running now.`
    })
})

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})
