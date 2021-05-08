// 1. Synchronous

// const getUserSync = (id) => {
//   // let nama = "";
//   // if (id === 1) {
//   //   nama = "Aulia";
//   // } else {
//   //   nama = "Hanifi";
//   // }
//   const nama = id === 1 ? "Aulia" : "Hanifi";
//   return nama;
// };

// const userSatu = getUserSync(1);
// console.log(userSatu);

// const userDua = getUserSync(2);
// console.log(userDua);

// const halo = "Hello World";
// console.log(halo);

// 2. Asynchronous
const getUser = (id, callback) => {
  const time = id === 1 ? 3000 : 2000;
  const nama = id === 1 ? "Aulia" : "Hanifi";
  setTimeout(() => {
    callback(nama);
  }, time);
};

const userSatu = getUser(1, (hasil) => {
  console.log(hasil);
});
const userDua = getUser(2, (hasil) => {
  console.log(hasil);
});
const halo = "Hello World";
console.log(halo);
