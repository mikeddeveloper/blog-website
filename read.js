const fs = require("fs")
const writer = fs.createWriteStream("./mikw/heer")
writer.write("mike",(chunk)=>{
    console.log(chunk)
})