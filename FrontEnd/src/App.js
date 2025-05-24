import React from 'react'
import { Toaster } from 'react-hot-toast';

import {Rutas} from './components/Rutas'
function App() {
  return (
    <div>
    <Toaster position='top-center' reverseOrder={false}/>
    <Rutas />         
         
    </div>
  );
}

export default App;
