const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContacts, findContact, addContact, cekDuplikat } = require("./utilities/contacts");
const { body, check, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // untuk paring req.body

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash("msg"),
  });
});

app.get("/contact/add", (req, res) => {
  const id = "";
  const nohp = "";
  const email = "";
  const nama = "";

  res.render("contact-add", {
    layout: "layouts/main-layout",
    title: "Add Contact",
    id,
    nohp,
    email,
    nama,
  });
});

app.post(
  "/contact",

  // validator
  check("id", "<i class='bi bi-person-badge'></i>   ID harus terisi !").notEmpty(),
  body("id").custom((value) => {
    const duplikat = cekDuplikat(value);
    if (duplikat) {
      throw new Error("<i class='bi bi-person-badge'></i>    ID sudah terpakai, silahkan gunakan ID yang lain !");
    }
    return true;
  }),
  check("nama", "<i class='bi bi-person-check-fill'></i>   Nama harus terisi !").notEmpty(),
  check("nohp", "<i class='bi bi-telephone-plus'></i>   No HP harus terisi !").notEmpty(),
  check("nohp", "<i class='bi bi-telephone-plus'></i>   Format No HP salah !").isMobilePhone("id-ID"),
  check("email", "<i class='bi bi-envelope'></i>    Format Email salah !").isEmail(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // res.send(errors.array());

      const id = req.body.id;
      const nohp = req.body.nohp;
      const email = req.body.email;
      const nama = req.body.nama;
      res.render("contact-add", {
        layout: "layouts/main-layout",
        title: "Add Contact",
        errors: errors.array(),
        id,
        nohp,
        email,
        nama,
      });
      return false;
    }

    addContact(req.body);
    // kirimkan flash message
    req.flash("msg", "Contact was successfully added !");
    res.redirect("/contact");
  }
);

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
