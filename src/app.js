const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

//Require connection
require("./db/conn");
const Register = require("./models/registers");
const async = require("hbs/lib/async");

const port = process.env.PORT || 3000;

//Setting paths
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path)

app.get("/", async (req, res) => {
    try {

        const docs = await Register.find().sort({ date: -1 });
        res.render("index", { docs: docs })

    } catch (error) {
        console.log(error);
    }
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/about", (req, res) => {
    res.render("about");
})

//Register new student
app.post("/register", async (req, res) => {
    try {

        const registerStudent = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            studentId: req.body.studentId,
            age: req.body.age,
            nationality: req.body.nationality,
            degree: req.body.degree,
            date: new Date()
        })

        const registered = await registerStudent.save();
        res.status(201).render("register");

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
})

//Update Student
app.post("/update", async (req, res)=>{
    try {
        await Register.findByIdAndUpdate(req.body.id,{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            studentId: req.body.studentId,
            age: req.body.age,
            nationality: req.body.nationality,
            degree: req.body.degree,
        });
        res.redirect("/");
        console.log(req.body.id);

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
})

//Delete student
app.get('/deleteStudent/:id', async (req, res) => {
    try {
        await Register.findByIdAndDelete(req.params.id);
        res.redirect("/");
        console.log(req.params.id);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//Pass data to updateStudent
app.get('/:id', async (req, res) => {
    try {
        const doc = await Register.findById(req.params.id);
        res.render("updateStudent", { doc: doc, id: req.params.id });
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})


