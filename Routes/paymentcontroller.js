const Razorpay = require("razorpay");
require("dotenv").config()
const crypto = require("crypto");


module.exports.orders = (req,res) => {
  let instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  let options = {
    amount: req.body.amount*100, 
    currency: "INR",
    
  };
  instance.orders.create(options, function (err, order) {
     if(err) {
        return res.send({code:500, message:"Error creating order"})
     }
      res.send({code:200, message:"orders created successfully", data:order})
  });
 
};
module.exports.verify = (req,res) => {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256',process.env.key_secret) .update(body.toString())
    .digest('hex');
    if (expectedSignature === req.body.response.razorpay_signature){
       res.send({ code: 200, message: 'Sign Valid' })
    }
    else{
        res.send({ code: 200, message: 'Sign Invalid' })
    }
    }
