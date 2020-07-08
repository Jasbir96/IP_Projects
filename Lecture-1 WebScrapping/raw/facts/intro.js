// console.log("Hello All");
let varName;
// // types=> Number,String,boolean,undefined,null
// // dyanmically typed lang
// varName = "Hello";
// varName = true;
// varName = [1, 2, 3, 4, 5];
// varName = null;
// varName = 10;
// console.log(varName);
// /Js => Syntax  Java
let num = 24;
for (let div = 2; div * div <= num; div++) {
    if (num % div == 0) {
        console.log("Numbe is not prime");
        return;
    }
}
console.log("Number is prime");