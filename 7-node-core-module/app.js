// Core Module
const fs = require("fs");
// console.log(fs);

// menuliskan string ke file (synchronous)
// try {
//   fs.writeFileSync("data/test.txt", "Hello World secara Synchronous!");
// } catch (err) {
//   console.log(err);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile("data/test.txt", "Hello World secara Asynchronous!", (err) => {
//   console.log(err);
// });

// membaca file secara synchronous
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// membaca file secara asynchronous
// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Siapa nama anda? ", (nama) => {
  rl.question("Berapa Nomor HP anda? ", (nomor) => {
    const contact = { nama, nomor };
    const fileBuffer = fs.readFileSync("data/contact.json", "utf-8");
    const contacts = JSON.parse(fileBuffer);
    contacts.push(contact);
    console.log(contact);
    console.log(fileBuffer);
    console.log(JSON.stringify(contacts));
    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
    console.log(`Terimakasih ${nama} telah memasukkan kontak anda.`);
    rl.close();
  });
});
