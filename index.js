const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////file server/////////////////////////////////

//Blocking Synchronous way
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);

//Non-blocking Synchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
//   });
// console.log('Will read file!');


///////////////////////////HTTTP server /////////////////////////////

    const templateOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
    const templateCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
    const templateProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

    const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
    const dataObj = JSON.parse(data)
    const server = http.createServer((req, res) => { 
      //using es6
    const { query,pathname } = url.parse(req.url, true);

    //Overview page
    if(pathname === '/' || pathname === '/overview'){      /// in this type of making the url in nodejs
          res.writeHead(200, ({'Content-type': 'text/html'}));
          const cardHTml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
          const output = templateOverview.replace(`{%PRODUCT_CARD%}`, cardHTml);
          res.end(output);

      //Product page
     }else if(pathname === '/product'){
       res.writeHead(200, ({'Content-type': 'text/html'}));
       const product = dataObj[query.id];
       const output = replaceTemplate(templateProduct, product);
        res.end(output);

     //API
    }else if(pathname === '/API'){
       res.writeHead(200, ({'Content-type': 'application/json'}));
        res.end(data);

      //NOt found
    }else{
       res.end("Page not found end")
    }
});

server.listen(3000, function(){
    console.log("Server is running")
})