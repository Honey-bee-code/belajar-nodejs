const contacts = require('./contacts')

// ==================== CARA BARU =================
// Mengambil argument dari command line

const yargs = require("yargs");

// console.log(process.argv[2])

// const command = process.argv[2]
// if(command === 'add'){
//   //
// } else if (command === 'remove'){
//   //
// } else if (command === 'list'){
//   //
// }

// ================= MENGGUNAKAN NPM YARGS ===========
// const yargs = require('yargs')
// console.log(yargs.argv)

// yargs.command('add', 'Menambahkan kontak baru', () => {}, (argv) => {
//   console.log(argv.nama)
// })

yargs.command({
  command: 'add',
  describe: 'Menambahkan kontak baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string',
    },
    noHP: {
      describe: 'Nomor handphone',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv){
    // const contact = {
    //   nama: argv.nama,
    //   email: argv.email,
    //   noHP: argv.noHP
    // }
    // console.log(contact)

    contacts.simpanContact(argv.nama, argv.email, argv.noHP)

  }
})
// agar command node app waji berisi (warning jika kosong)
.demandCommand()

// menampilkan daftar semua nama dan no hp kontak
yargs.command({
  command: 'list',
  describe: 'Menampilkan data kontak',
  handler(){
    contacts.listContact()
  }
})

// menampilkan detail sebuah kontak berdasarkan nama
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv){
    contacts.detailContact(argv.nama)
  }
})

// menghapus kontak berdasarkan nama
yargs.command({
  command: 'remove',
  describe: 'Menghapus kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv){
    contacts.removeContact(argv.nama)
  }
})

// memanggil yargs
yargs.parse()














// ====================== CARA LAMA ==========================

// // const {tulisPertanyaan, simpanContact} = require('./contacts')


// const main = async () => {
//   // const nama = await pertanyaan1();
//   // const email = await pertanyaan2();
//   const nama = await contacts.tulisPertanyaan("Masukkan nama anda : ");
//   const email = await contacts.tulisPertanyaan("Masukkkan email anda : ");
//   const noHP = await contacts.tulisPertanyaan("Masukkan no HP anda : ");

//   contacts.simpanContact(nama, email, noHP);
// };

// main();
