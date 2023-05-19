import { Router } from "express";

const home = Router();


home.get("/", (req, res)=>{
    res.render("home", 
    {
        "title":"Inicio",
        "nombre":"JOHN TORO"
    })
})

home.get("/contact", (req, res)=>{
    res.render("contact", {
        "title": "Contacto",
    })
})



home.get("/comoFunciona", (req, res)=>{
    res.render("comoFunciona", {
        "title": "Como Funciona",
    })
})

home.get("/sobreNosotros", (req, res)=>{
    res.render("sobreNosotros", {
        "title": "Sobre Nosotros",
    })
})


home.get("/admin", (req, res)=>{
    res.render("admin", {
        "title": "Admin",
    })
})

home.get("/blog", (req, res)=>{
    res.render("blog", {
        "title": "Blog",
    })
})

home.get("/compra", (req, res)=>{
    res.render("compra", {
        "title": "Compra",
    })
})

home.get("/menulogin", (req, res)=>{
    res.render("menulogin", {
        
    })
})




export default home;
