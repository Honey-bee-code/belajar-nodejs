const http = require("http");
const fs = require("fs");
const port = 3000;

const renderHTML = (path, response) => {
  fs.readFile(path, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("Error: file not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/html",
  });


    const url = request.url;
    
    switch (url){
        case '/about':
            renderHTML('./about.html', response)
        break
        case '/contact':
            renderHTML('./contact.html', response)
        break
        default:
            renderHTML('./index.html', response)
        break
    }


//   if (url === "/about") {
//     renderHTML("./about.html", response);
//   } else {
//     renderHTML("./index.html", response);
//   }
});

server.listen(port, () => {
  // pesan ketika program dijalankan
  console.log(`Server is listening on port ${port}`);
});
