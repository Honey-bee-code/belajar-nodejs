function cetakNama(nama) {
  return nama;
}
const PI = 3.14;
const mahasiswa = {
  nama: "Fahad Vanani",
  umur: 28,
  cetakMhs() {
    return `Halo, nama saya ${this.nama}, dan saya berumur ${this.umur} tahun`;
  },
};
class Orang {
  constructor() {
    console.log("Object orang telah dibuat!");
  }
}

// module.exports.cetakNama = cetakNama; // function
// module.exports.PI = PI; // variable
// module.exports.mahasiswa = mahasiswa; // object
// module.exports.Orang = Orang; // class

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// };

module.exports = { cetakNama, PI, mahasiswa, Orang };
