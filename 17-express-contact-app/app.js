const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContacts, findContact, addContact } = require("./utilities/contacts");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded()); // untuk paring req.body

app.get("/", (req, res) => {
  res.render("index", { layout: "layouts/main-layout", title: "Homepage" });
});

app.get("/about", (req, res, next) => {
  res.render("about", { layout: "layouts/main-layout", title: "About Page" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContacts();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact Page",
    contacts,
  });
});

app.get("/contact/add", (req, res) => {
  res.render("contact-add", {
    layout: "layouts/main-layout",
    title: "Add Contact",
  });
});

app.post("/contact", (req, res) => {
  addContact(req.body);
  res.redirect("/contact");
});

app.get("/contact/:id", (req, res) => {
  const id = req.params.id;
  const contact = findContact(id);
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Contact Detail",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404: page not found!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
