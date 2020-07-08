// install => npm install request
// import
let request = require("request");
let url = "https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup";
let fs=require("fs");
let 
function cb(err, header, body) {
    // request is successfully processed
    if (err == null && header.statusCode == 200) {
        // console.log(body);
        console.log("Html recieved");
        // fs=> file system
        fs.writeFileSync("page.html",body);
    } else if (header.statusCode == 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(header);
    }

}
request(url, cb);
