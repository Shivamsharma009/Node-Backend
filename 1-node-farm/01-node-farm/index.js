const fs = require('fs');

//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn); 

//const textOut = 'This is what we know about the avacado: '+textIn +'.\n Created on  ' +Date.now();
//fs.writeFileSync('./txt/output.txt',textOut);
//console.log('File Written!');

//non-blocking synchronous way
fs.readFile('./txt/start.txt','utf-8',()=> {
    fs.readFile('./txt/read-this.txt','utf-8',(err,data2)=> {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8' ,(err,data3) => {
        console.log(data3);

        fs.writeFile('./txt/final.txt', data2 +'\n'+ data3 ,'utf-8', err => {
            console.log('Your File has been Written 😁😁')
        })
        });
    });
});
console.log("Will read this!");

