const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World!')

  // res.json({
  //   nama: 'Hanifi',
  //   email: 'hanifi@gmail.com',
  //   noHP: '087654455'
  // })

  res.sendFile('./index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
  // res.send('This is about page!')
  res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
  // res.send('This is contact page!')
  res.sendFile('./contact.html', {root: __dirname})
})

app.get('/product/:id/', (req, res) => {
  res.send(`Product ID :  ${req.params.id} <br> Category : ${req.query.category} `)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404: page not found!</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




















// const http = require("http");
// const fs = require("fs");
// const port = 3000;

// const renderHTML = (path, response) => {
//   fs.readFile(path, (error, data) => {
//     if (error) {
//       response.writeHead(404);
//       response.write("Error: file not found");
//     } else {
//       response.write(data);
//     }
//     response.end();
//   });
// };

// const server = http.createServer((request, response) => {
//   response.writeHead(200, {
//     "Content-Type": "text/html",
//   });


//     const url = request.url;
    
//     switch (url){
//         case '/about':
//             renderHTML('./about.html', response)
//         break
//         case '/contact':
//             renderHTML('./contact.html', response)
//         break
//         default:
//             renderHTML('./index.html', response)
//         break
//     }


// //   if (url === "/about") {
// //     renderHTML("./about.html", response);
// //   } else {
// //     renderHTML("./index.html", response);
// //   }
// });

// server.listen(port, () => {
//   // pesan ketika program dijalankan
//   console.log(`Server is listening on port ${port}`);
// });
