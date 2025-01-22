import express from "express";

const app = express();
let PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to GlowDerma - Your Skincare Journey Begins Here.")
})

app.get("/about", (req, res) => {
    res.send(" We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products")
})

app.get("/contact", (req, res) => {
    res.json({
        "email": "care@glowderma.com",
        "instagram": "http://instagram.com/glowderma",
        "consultation": "http://glowderma.com/book-appointment"
    })
})

app.get("/products", (req, res) => {
    res.json([
        {
            "name": "Hydrating Serum",
            "price": "$25",
            "description": "A lightweight serum that deeply hydrates and plumps the skin."
          },
          {
            "name": "Vitamin C Cream",
            "price": "$30",
            "description": "Brightens skin tone and reduces the appearance of dark spots."
          }
    ])
})

app.get("*", (req, res) => {
    res.send(`Your port is not available`)
})


app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
})