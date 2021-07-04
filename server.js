const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAILSERVICEHOST,
  port: process.env.EMAILSERVICEPORT,
  auth: {
    user: process.env.EMAILSERVICEAUTHUSER,
    pass: process.env.EMAILSERVICEAUTHPASS,
  },
});

app.post("/submit-order", async (req, res) => {
  const body = req.body;
  try {
    const info = await transporter.sendMail({
      from: "bessim <bessim@example.com>",
      to: "bissoooobecim@gmail.com",
      subject: "shoes-commande",
      html: `<div>
      <p>Buyer: </p>
      <p>name : ${body.person.name} ${body.person.lastName}</p>
      <p>mail : ${body.person.email}</p>
      <p>Adress: ${body.person.address}</p>
      <p>city: ${body.person.city}</p>
      <p>zip: ${body.person.zip}</p>
      <p>phone: ${body.person.phoneNumber}</p>
      <br/>
      <p>Product: </p>
      <p>product_id: ${body.cart.cart[0].id}</p>
      <p>product_name: ${body.cart.cart[0].name}</p>
      <p>product_price: ${body.cart.cart[0].price}</p>
      <p>product_size: ${body.cart.cart[0].size}</p>
      <p>product_color: ${body.cart.cart[0].color}</p>
      <p>product_quantity: ${body.cart.cart[0].quantity}</p>
      <p>product_total: ${body.cart.total}</p>
      </div>`,
    });
    res.send(JSON.stringify(info));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("server running on port " + port);
});
