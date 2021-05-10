// Core Module
const fs = require("fs");
const chalk = require("chalk");
const validator = require('validator')

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

// =================== CARA KEEMPAT ========================
// MENGGUNAKAN NPM YARGS
// TIDAK LAGI MENGGUNAKAN MODUL READ LINE/ rl

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts
}

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  // const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(fileBuffer);

  const contacts = loadContact()

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold("Kontak sudah terdaftar, gunakan nama lain!"));

    // agar tidak lanjut ke bawah
    return false;
  }

  // cek email
  if(email){
    if(!validator.isEmail(email)){
      console.log(chalk.red.inverse.bold("Email tidak valid!"));

      // agar tidak lanjut ke bawah
      return false;
    }
  }

  if(!validator.isMobilePhone(noHP, 'id-ID')){
    console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));

    // agar tidak lanjut ke bawah
    return false;
  }


  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold(`Terimakasih ${nama} karena telah memasukkan kontak anda.`));
};

const listContact = () => {
  const contacts = loadContact()
  console.log(chalk.cyan.inverse.bold('Daftar Kontak : '))
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.nama} - ${contact.noHP}`)
  });
}

const detailContact = (nama) => {
  const contacts = loadContact()
  console.log(chalk.cyan.inverse.bold('Detail Kontak : '))

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

  if(!contact){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`))
    return false
  }

  console.log('Nama : ' + contact.nama)
  if(contact.email){
    console.log('Email : ' + contact.email)
  }
  console.log('No HP : ' + contact.noHP)

}

const removeContact = (nama) => {
  const contacts = loadContact()

  // membuat array contacts baru
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

  if(contacts.length === newContacts.length){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`))
    return false
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))

  console.log(chalk.green.inverse.bold(`Data kontak ${nama} berhasil dihapus!`))

}

module.exports = { simpanContact, listContact, detailContact, removeContact };

// ============== CARA PERTAMA ==================
// rl.question("Siapa nama anda? ", (nama) => {
//   rl.question("Berapa Nomor HP anda? ", (nomor) => {
//     rl.question('Masukkan email anda : ', (email) => {
//       const contact = { nama, nomor, email };
//       const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
//       const contacts = JSON.parse(fileBuffer);
//       contacts.push(contact);
//       console.log(contact);
//       console.log(fileBuffer);
//       console.log(JSON.stringify(contacts));
//       fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//       console.log(`Terimakasih ${nama} telah memasukkan kontak anda.`);
//       rl.close();
//     })
//   });
// });

// ==================== CARA KEDUA ======================
// MEMBUAT PROMISE UNTUK ASYNC DAN AWAIT
// const pertanyaan1 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Masukkan nama anda : ", (nama) => {
//       resolve(nama);
//     });
//   });
// };

// const pertanyaan2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Masukkan email anda : ", (email) => {
//       resolve(email);
//     });
//   });
// };

// =================== CARA KETIGA ========================
// MELAKUKAN ABSTRAKSI PADA PERTANYAAN
// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (email) => {
//       resolve(email);
//     });
//   });
// };

// const simpanContact = (nama, email, noHP) => {
//   const contact = { nama, email, noHP };
//   const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
//   const contacts = JSON.parse(fileBuffer);

//   // cek duplikat
//   const duplikat = contacts.find((contact) => contact.nama === nama)
//   if(duplikat){
//     console.log('kontak sudah terdaftar, gunakan nama lain!')

//     // agar tidak lanjut ke bawah
//     return false
//   }

//   contacts.push(contact);

//   fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
//   console.log(`Terimakasih ${nama} karena telah memasukkan kontak anda.`);
//   rl.close();
// };

// module.exports = { tulisPertanyaan simpanContact };
