const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
console.log(keys.stripeSecretKey);

module.exports = (app) => {
  app.post("/api/stripe", async (req, res) => {
    // res.send(req.body.id);
    // const charge = await stripe.charges.create({
    //   amount: 500,
    //   currency: "usd",
    //   description: "$5 for 5 credits",
    //   source: req.body.id,
    // });
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "My First Test Charge (created for API docs)",
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
