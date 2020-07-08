let request = require("request");
let url = "https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup";
request(url, cb);
function cb(err, header, body) {
    if (err == null && header.statusCode == 200) {
        console.log(body);
    } else if (header.statusCode == 404) {
        console.log("url not found");
    } else {
        console.log(err);
        console.log(header);
    }
}