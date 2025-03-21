import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import {LandingPage} from './landingPage' 
import {PerfilUsuario} from './perfilUsuario'
import {VacioPrueba} from './vacioPrueba'
import {PublicacionDetalle} from './publicacionDetalle'
import {Navbar} from './navbar'
export const Rutas = () =>{
    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path = "/" element= {<LandingPage/>}/>
                <Route path = "/landing" element= {<LandingPage/>}/>
                <Route path = "/eventos" element = {<LandingPage/>}/>
                <Route path = "/publicaciones" element = {<LandingPage/>}/>
                <Route path = "/publicaciones/:id" element = {<PublicacionDetalle/>}/>
                <Route path = "/emprendimientos" element = {<LandingPage/>}/>
                <Route path = "/vacioPrueba" element = {<VacioPrueba/>}/>
                <Route path = "/perfilUsuario" element= {<PerfilUsuario/>}/>
                
                <Route path="*" element={<Navigate to="/landing" />} />
            </Routes>
        </Router>
    )
}