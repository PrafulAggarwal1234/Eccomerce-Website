const router = require("express").Router();
const crypto = require("crypto");
const Razorpay=require("razorpay");

router.post("/payment", (req, res) => {
    try{
        const instance = new Razorpay({
            key_id: process.env.RAZ_ID,
            key_secret: process.env.RAZ_KEY,
          });
        var options = {
            amount: req.body.amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
          };

          instance.orders.create(options, (err, order) => {
            if(err){
                console.log(err);
                res.status(500).json(err);
            }
            else{
                res.status(200).json(order);
            }
          });

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//payment verify
router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZ_KEY)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ code:"success",message: "Payment verified successfully" });
		} else {
			return res.status(400).json({code:"failed", message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;