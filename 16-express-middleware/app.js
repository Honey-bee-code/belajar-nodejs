const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// Built-in middleware
app.use(express.static("public"));

// Application level middleware
app.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Yusron Vanani",
      email: "yusron@email.com",
    },
    {
      nama: "Khairul Imam",
      email: "imam@email.com",
    },
    {
      nama: "Hardi Pratama",
      email: "hardi@email.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Yusron",
    title: "Homepage",
    mahasiswa,
  });
});

app.get("/about", (req, res, next) => {
  res.render("about", { layout: "layouts/main-layout", title: "About Page" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "layouts/main-layout", title: "Contact Page" });
});

app.get("/product/:id/", (req, res) => {
  res.send(`Product ID :  ${req.params.id} <br> Category : ${req.query.category} `);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404: page not found!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
