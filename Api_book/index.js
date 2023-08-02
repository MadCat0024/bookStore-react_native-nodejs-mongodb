const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan =  require("morgan");
const dotenv = require("dotenv");
//
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
dotenv.config();
//CONNECT DATABASE 
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected successfully...');
  })
  .catch((err) => {
    console.log('Error connecting with error code:', err);
});

// parser dữ liệu dạng json
app.use(bodyParser.json({limit:"50mb"}));
// config cors
app.use(cors());
//
app.use(morgan("common"));
 
//Router
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);
//register and login
app.use("/v1/auth", authRoute);
//user
app.use("/v1/user", userRoute);


app.listen(8000, ()=>{
    console.log('server is running....')
})

//authentication

//authorization 