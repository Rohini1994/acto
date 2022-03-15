const express = require("express");
const app = express();
const Employee = require('./employee.json');
var bodyParser = require('body-parser');
var fs = require('fs');
const path = require("path");
const editJsonFile = require("edit-json-file");
app.use(bodyParser.urlencoded({ extended: false }))



app.use(express.json());
app.get("/getEmployeeAll", async (req, res) => {
    try {
        res.status(200).send(Employee);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get("/getEmployeeById/:id", (req, res) => {
    try {
        const _id = req.params.id;
        Employee.forEach(e => {
            if (e._id == _id) {
                res.status(200).json(e);
            }
        })
    } catch (e) {
        res.status(400).send(e);
    }
})

app.post("/postEmployee", (req, res) => {
    let obj = {
        _id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        role: req.body.role,
        gender: req.body.gender,
    }
    try {
      Employee.push(obj);
      fs.writeFileSync(path.resolve(__dirname, './employee.json'), JSON.stringify(Employee));   
      console.log("employee",Employee);
        res.status(200).json(Employee);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.post("/deleteEmployeeById/:id", (req, res) => {
    try {
        let id = req.params.id;
        for (var i = 0; i < Employee.length; i++) {
            if (Employee[i]._id == id) {
                Employee.splice(i, 1);
                break;
            }
        }
        fs.writeFileSync(path.resolve(__dirname, './employee.json'), JSON.stringify(Employee));  
        res.status(200).json(Employee);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.listen(3001, function () {
    console.log('Listening to port 3001')
})