import express from "express";
import {rateLimit} from 'express-rate-limit'
import fs from 'fs';
const app = express();
let PORT = 5000;

// const limiter = rateLimit({
//     windowMs: 1000 * 60 * 5, 
//     max: 5, 
//     message: "Sorry, you have exhausted your plan.", // Custom error message
// });


// app.use(limiter);

app.use(express.json());

// global middleware
app.use((req,res,next) => {
  let logdata = `${new Date()} | ${req.method} | ${req.url} | ${req.ip} \n`;
  console.log(logdata);
  fs.appendFile("log.txt", logdata, (err) => {
    if(err) throw err;
  })
  next();
})
//middleware
app.use("/assets",express.static('public'))


app.get("/", (req, res) => {
  res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here.");
});

app.get("/about", (req, res) => {
  res.send(
    " We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products"
  );
});

app.get("/contact", (req, res) => {
  res.json({
    email: "care@glowderma.com",
    instagram: "http://instagram.com/glowderma",
    consultation: "http://glowderma.com/book-appointment",
  });
});
const product = [];

app.get("/products", (req, res) => {
  res.json(product);
});

app.post("/products", (req, res) => {
  const { id, name, price, qty } = req.body;
  const x = { id, name, price, qty };
  res.json({
    message: "Data Added",
    data: x,
  });
  product.push(x);
});



const orderlist = [
  { id: 1, product: "Anti-Aging Serum", quantity: 2 },
  { id: 2, product: "Vitamin C Moisturizer", quantity: 1 },
  { id: 3, product: "Hyaluronic Acid", quantity: 3 },
];
app.get("/order/:orderID", (req, res) => {
  const orderID = parseInt(req.params.orderID);

  if (isNaN(orderID)) {
    return res.status(400).json({ message: "Invalid order ID format" });
  }

  const order = orderlist.find((o) => o.id === orderID);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});


let products = [
    { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
    { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
    { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
    { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
  ]
  
  app.get('/product', (req,res)=>{
      const {name, maxPrice} = req.body;
      if(!name && !maxPrice ){
          return res.status(200).json(products);
      }
      let prod;
      if(name && !maxPrice){
          prod = products.filter(prod => prod.name === name);
          return res.status(200).json(prod);
      }
      if(!name && maxPrice){
          prod = products.filter(prod => prod.price <= maxPrice);
          return res.status(200).json(prod);
      }
      prod = products.filter(prod => prod.name === name && prod.price <= maxPrice);
      return res.status(200).json(product);
  })


let shoppingCart = [];

app.get("/cart", (req, res) => {
  res.json(shoppingCart);
});

app.post("/cart", (req, res) => {
  const { id, name, price, qty } = req.body;

  if (!id || !name || !price || !qty) {
    return res.status(400).json({
      error: "All the required fields are not provided",
    });
  }

  let x = { id, name, price, qty };

  shoppingCart.push(x);
  res.json({
    message: "Product added to cart",
    data: x,
  });
});

app.get("*", (req, res) => {
  res.send(`Your port is not available`);
});
//middleware 400 no route
app.use((req,res,next)=>{
  return res.status(400).json(`We don't have this page yet!`)
})
//middleware 500
  app.use((error, req, res)=>{
    res.status(500).json({
        "error": error.message
      })
    })
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
  });