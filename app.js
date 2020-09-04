const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express();


app.use(express.static("assets"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "login.html"));
})

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "assets", "register.html"));
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