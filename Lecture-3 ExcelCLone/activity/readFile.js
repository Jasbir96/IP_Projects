const fs = require("fs");
// let frP = fs.promises.readFile("f1.txt");
// frP.then(function(data){
// console.log("Data "+data);
// })
(async function () {
    let frP = fs.promises.readFile("f1.txt");
    let data = await frP;

   
    console.log("Data "+data);
    
})()