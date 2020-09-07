const express = require("express")
const path = require("path")
const fs = require("fs")
const bodyParser = require("body-parser")

const app = express();


app.use(express.static("assets"))

app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "login.html"));
    
})

app.post("/register", (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;

    fs.readFile("db.json", (error, data) =>{
        let users = JSON.parse(data.toString());
            users.push(req.body)
        
            fs.writeFile("db.json", JSON.stringify(users), (error) =>{
                if(error){
                    console.log(error)
                }

                res.redirect("/");
            })
    })
})

app.post("/", (req, res) => {
    
    let email = req.body.email;
    let password = req.body.password;

    fs.readFile("db.json", (error, data) =>{
        let users = JSON.parse(data.toString());
          
            users= users.find((user) => {  return user.email == email})
             if( users && users.password === password )
                  {
                    res.redirect("/dasboard")
                   }else{
                       res.redirect("/")
                   }

            
    })
})

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "register.html"));
})

app.get("/dasboard", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "dasboard.html"));
})


app.get("/restablecer-contrasena", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "forgot-password.html"));
})
 
app.get("/nosotros", (req, res) => {
    fs.readFile("contador.txt", (error, data) => {
        if(error){
            console.log(error)
        }
      let visitas = data.toString()
      let arregloVisitas = visitas.split(":")
      visitas = Number(arregloVisitas[1])
      visitas++
    
        fs.writeFile("contador.txt", `visitas:${visitas}`, (error) =>{
        if (error) {
            console.log(error)
        }
         
         res.send("<h1>El número de visitas actualmente es: "+ visitas +"</h1>")
        });
    });
})






app.listen( 8000, () => {
    console.log("Iniciando el servidor en el puerto 8000")
})