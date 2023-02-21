const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const { rootRouter } = require("./routers");

dotenv.config();
const cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://huutinh:huutinh@cluster0.ilkhtrc.mongodb.net/restaurant-booking?retryWrites=true&w=majority");
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};


app.use(express.json());

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
app.use("/api/v1", rootRouter)
connect();
const port = 8069 || process.env.PORT;
app.listen(port, () => {
  console.log(`App run on http://localhost:${port}/api/v1`);
});
