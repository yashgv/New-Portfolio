const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
// const projects = require("./init/data.js");
const db = require("./init/db.js");


app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"./public/")));
// app.use(express.static(__dirname+"./views/contents/Home"));

app.use(express.urlencoded({ extended: true }));

app.get("/",async (req,res) => {
    res.render("./contents/home.ejs");
})

app.get("/Home",async (req,res) => {
    res.render("./contents/home.ejs");
})
app.get("/Projects",async (req,res) => {
    const data = await db();
    const Projects = data.Projects;
    res.render("./contents/projects.ejs",{Projects});
})

app.get("/Achievements",async (req,res) => {
    const data = await db();
    const Achievements = data.Achievements;
    res.render("./contents/achievements.ejs",{Achievements});
})

app.get("/Contacts",async (req,res) => {
    res.render("./contents/contacts.ejs");
})

app.post("/Contacts",async (req,res) =>{
    const contact = req.body.cc;
    const data = await db();
    await data.CreateContact(contact.Name,contact.Email,contact.Message)
    res.redirect("/Contacts")
})





app.listen(8081,(req,res)=> {
    console.log("Yes Listening!");
})