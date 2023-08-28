const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config()
const cors = require("cors");
const {  verify, orders } = require('./Routes/paymentcontroller');


const router = require('./Routes/twillioRoute');


const app = express();
app.use(cors())
app.use(bodyParser.json());
 
app.post("/order", orders )
app.post("/verify", verify)

app.use("/", router)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
