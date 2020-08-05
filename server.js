require("dotenv").config();
let express = require("express");
let responseTime  = require("response-time");
let bodyParser  = require("body-parser");
let request = require("request");
let app = express();
let morgan = require("morgan");
let fs = require("fs");
let path = require("path");
app.use(bodyParser.urlencoded({extended: false}));
app.use(responseTime());
app.use(morgan("dev"));
const listUserAgent = JSON.parse(fs.readFileSync(path.join(__dirname,"./userAgent.json"),'utf-8'));
console.log(listUserAgent.length);
app.get("/",(req,res)=>{
    let {url,referer} = req.query ;
    if(!url){
        return res.send("What Are You Doing?");
    }
    let options = {
        url:url,
        headers:{
            Referer:referer||"http://www.nettruyen.com/",
            'User-Agent': listUserAgent[Math.floor(Math.random()*listUserAgent.length)]
        }
    }
    request(options).pipe(res)
})
app.listen(process.env.PORT || 3000,()=>{
    console.log(process.env.PORT || 3000)
})