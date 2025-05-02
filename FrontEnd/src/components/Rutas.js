import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import {LandingPage} from './landingPage' 
import {PerfilUsuario} from './perfilUsuario'
import {VacioPrueba} from './vacioPrueba'
import {PublicacionDetalle} from './publicacionDetalle'
import {Navbar} from './navbar'
import {Biblioteca} from './biblioteca'
import FormularioPublicacion from "../pages/formulario";
export const Rutas = () =>{
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path = "/" element= {<Navigate to="/publicaciones" />}/>
                <Route path = "/eventos" element = {<LandingPage/>}/>
                <Route path = "/publicaciones" element = {<LandingPage/>}/>
                <Route path = "/publicaciones/:id" element = {<PublicacionDetalle/>}/>
                <Route path = "/emprendimientos" element = {<LandingPage/>}/>
                <Route path = "/biblioteca" element = {<Biblioteca/>}/>
                <Route path = "/perfilUsuario" element= {<PerfilUsuario/>}/>
                <Route path = "/formulario" element= {<FormularioPublicacion/>}/>
                
                <Route path="*" element={<Navigate to="/publicaciones" />} />
            </Routes>
        </Router>
    )
}