import { Router } from "express";
import jwt from "jsonwebtoken";
import "node-fetch";
import Swal from "sweetalert2";


const dash = Router();

dash.get("/", (req, res) => {
    if (req.cookies.ckeon) {
        try {
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                )
                res.render("dashboard.ejs", {
                    "nombre": token.nombre,
                    "correo": token.correo,
                    "foto": token.foto,
                    "title": "Inicio",
                    "men": 1
                })
        } catch (error) {
            res.redirect("/")
        }


    } else {
        res.redirect("/")
    }
    
})



dash.get("/products",async(req, res) =>{
    if (req.cookies.ckeon) {
        try {
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                )
                let info= "";
                let url = "http://localhost:5000/api/product"
                await fetch(url, {method:"GET"})
                .then(res=>res.json())
                .then(data=>{
                    info = data
                })
                if(!req.cookies.mTipo){
                res.render("dashboard.ejs", {
                    "nombre": token.nombre,
                    "correo": token.correo,
                    "foto": token.foto,
                    "title": "Productos",
                    "productos": info,
                    "men": 2,
                    "mTipo": ""
                })
                } else {
                    let mTipo = req.cookies.mTipo;
                    res.clearCookie("mTipo");
                    res.render("dashboard.ejs",{
                        "nombre": token.nombre,
                        "correo": token.correo,
                        "foto": token.foto,
                        "title": "Productos",
                        "productos": info,
                        "men": 2,
                        "mTipo": mTipo
                    })
                }
        } catch (error) {
            res.redirect("/")
        }


    } else {
        res.redirect("/")
    }
})

dash.get("/users",(req, res) =>{
    if (req.cookies.ckeon) {
        try {
            const token = jwt.verify(
                req.cookies.ckeon, 
                process.env.TOKEN_SECRET
                )
                res.render("dashboard.ejs", {
                    "nombre": token.nombre,
                    "correo": token.correo,
                    "foto": token.foto,
                    "title": "Usuarios",
                    "men": 3
                })
        } catch (error) {
            res.redirect("/")
        }


    } else {
        res.redirect("/")
    }
})



dash.get("/salir", (req, res)=>{
    res.clearCookie("ckeon")
    res.redirect("/")
})

dash.post("/save-product", (req, res)=>{
    // res.json(req.body);
    if(req.body.descripcion){
        if(req.body.precio > 0){
            const producto = req.body.producto;
            const imagen = req.body.imagen;
            const descripcion = req.body.descripcion;
            const precio = req.body.precio;
            const estado = req.body.estado;

            const datos = {
                "producto": producto,
                "imagen": imagen,
                "descripcion": descripcion,
                "precio": precio,
                "estado": estado                                                 
            }

            let ruta = "http://localhost:5000/api/product"
            const respo = fetch(ruta, {
                "method":"post",
                "body": JSON.stringify(datos),
                "headers":{
                    "Content-type":"application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(data => {
                res.cookie("mTipo","Guardar");
            })
            .catch(err=>console.error(err))

            res.redirect("/v1/products")
            // location.reload()
        }
    }
})



export default dash;