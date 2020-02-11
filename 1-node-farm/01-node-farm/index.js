const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////
//FILES

//blocking synchronous way
//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn); 

//const textOut = 'This is what we know about the avacado: '+textIn +'.\n Created on  ' +Date.now();
//fs.writeFileSync('./txt/output.txt',textOut);
//console.log('File Written!');

//non-blocking synchronous way
//fs.readFile('./txt/start.txt','utf-8',()=> {
//  fs.readFile('./txt/read-this.txt','utf-8',(err,data2)=> {
//    console.log(data2);
//  fs.readFile('./txt/append.txt', 'utf-8' ,(err,data3) => {
//console.log(data3);

//fs.writeFile('./txt/final.txt', data2 +'\n'+ data3 ,'utf-8', err => {
//  console.log('Your File has been Written 😁😁')
// })
//});
//});
//});
//console.log("Will read this!");

////////////////////////////////////////
//////SERVER

const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;

}




const tempOverview = fs.readFileSync('./templates/template-overview.html','utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html','utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html','utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const dataobj = JSON.parse(data);

const server = http.createServer((req, res) => {

    const { query,pathname } = url.parse(req.url,true); 
    //const pathname = req.url;


    //Overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type':'text'});

        const cardsHTML = dataobj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHTML);
        res.end(output);





    //Product
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type':'text/html'});
        const product = dataobj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);




    //API
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text\html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not Found!</h1>');

    }
    // res.end('Hello from the Server!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on the port 8000');
});