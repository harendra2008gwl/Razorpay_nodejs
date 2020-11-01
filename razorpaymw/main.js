const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const Razorpay = require("razorpay");

const keyId = "rzp_test_lAQjBGYqCzFRvu"
const keySecret = "rUEP6Hy2gojKWCGwq9VG1HKh"

const instance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});


app.listen(8000, () => {
    console.log("Server is listening at http://localhost:8000");
});



// Create order
app.get('/create-order', function(req, res)  {

  const amount =  req.query['amt']

    console.log(amount)
      try {
      const options = {
        amount: amount * 100, // amount == Rs 50
        currency: "INR",
        receipt: "app receipt#1",
        payment_capture: 0,
   // 1 for automatic capture // 0 for manual capture
      };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
    return res.status(200).json(order);
   });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
   }
  });
