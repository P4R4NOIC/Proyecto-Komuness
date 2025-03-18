import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {LandingPage} from './landingPage' 
import {PerfilUsuario} from './perfilUsuario'

export const Rutas = () =>{
    return(
        <Router>
            <Routes>
                <Route path = "/" element= {<LandingPage/>}/>
                <Route path = "/landing" element= {<LandingPage/>}/>
                <Route path = "/perfilUsuario" element= {<PerfilUsuario/>}/>
            </Routes>
        </Router>
    )
}