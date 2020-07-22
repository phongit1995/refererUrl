require("dotenv").config();
let express = require("express");
let responseTime  = require("response-time");
let bodyParser  = require("body-parser");
let request = require("request");
let app = express();
let morgan = require("morgan");
app.use(bodyParser.urlencoded({extended: false}));
app.use(responseTime());
app.use(morgan("dev"));
app.get("/",(req,res)=>{
    
    let {url,referer} = req.query ;
    if(!url){
        return res.send("What Are You Doing?");
    }
    let options = {
        uri:url,
        headers:{
            referer:referer||"http://www.nettruyen.com/"
        }
    }
    request(options).pipe(res)
})
app.listen(process.env.PORT || 3000,()=>{
    console.log(process.env.PORT || 300)
})