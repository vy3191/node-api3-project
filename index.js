// code away!
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { logger } = require("./middleware/logger");

const userRouter = require("./users/userRouter");


const PORT = 8000;
const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(logger);
app.use(express.json());

app.use("/api/users", userRouter);


app.get("/", (req,res) => {
    res.status(200).json({
       Message: `app is up and running now.`
    })
})

app.use( (error, req,res,next) => {
    console.log(error);
    res.status(500).json({
        msg: `Something went wrong with server`
    })
})
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})
