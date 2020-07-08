// fn def
function myfn(param) {
    param();
    // console.log("I am inside myfn");
    // return true;
}
// fn call
// console.log(myfn);

// console.log("```````````````````````");
// console.log(myfn());
// console.log(rVal);
// to run code of a fn you need to call it

let obj = { name: "Jasbir" };
myfn(obj);
// myfn(10);
myfn([10, 11, 12, 13]);
// fn are variables
myfn(function inner() {
    console.log(" I am Inner")
})