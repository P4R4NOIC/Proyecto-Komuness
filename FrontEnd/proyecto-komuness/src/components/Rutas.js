import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {LandingPage} from './landingPage' 
import {PerfilUsuario} from './perfilUsuario'
import {VacioPrueba} from './vacioPrueba'
export const Rutas = () =>{
    return(
        <Router>
            <Routes>
                <Route path = "/" element= {<LandingPage/>}/>
                <Route path = "/landing" element= {<LandingPage/>}/>
                <Route path = "/eventos" element = {<LandingPage/>}/>
                <Route path = "/publicaciones" element = {<LandingPage/>}/>
                <Route path = "/emprendimientos" element = {<LandingPage/>}/>
                <Route path = "/vacioPrueba" element = {<VacioPrueba/>}/>
                <Route path = "/perfilUsuario" element= {<PerfilUsuario/>}/>
                
            </Routes>
        </Router>
    )
}