const express = require('express');

// express app
const app = express();
const port = 3000;
// listen for requests
app.listen(port);
app.set("view engine", "ejs")
app.set("views", "view")

app.get("/", (req, res) => {
  const blogs = [
   
  ]
  res.render("index",{title:"home",blogs});
})
app.get("/about", (req, res) => {
  res.render("about",{title:"about"})
})
app.get("/blogs/create",(req,res) =>{
  res.render("create",{title: "create"})
})
app.use((req, res) => {
  res.status(404).render("404")
})
