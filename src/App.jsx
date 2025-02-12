import { useState } from 'react'

import './App.css'
import Mapa from './Mapa';
import * as functionsUsuario from './dbcalls/FunctionsUsuario';

function App() {
 
  const [pantalla, setPantalla] = useState(<div>
  

    <div>
    <h3>Digite su usuario</h3>
    <label htmlFor="nombre"></label>
    <input type="text" id="nombre" name="nombre"  />
    </div>
  
    <div>
    <h3>Digite su contraseña</h3>
    <label htmlFor="nombre"></label>
    <input type="text" id="nombre" name="nombre" />
    </div>
    <h1 id="mensajeregistro" ></h1>
    <button onClick={logear}>Ingresar</button>
    <button onClick={registrar}>Registrar</button>
  
  </div>
  )
  var idusuario = null

  function logear( ){
    var nombre =  document.getElementById('nombre').value;
    var passord =  document.getElementById('nombre').value;
    functionsUsuario.logear(nombre, passord)
      .then((result) => {
        if(result.id){
          setPantalla(Mapa())
          idusuario = result.id
          console.log(idusuario)
        }else{
          document.getElementById('mensajeregistro').textContent="NO REGISTRADO"
        }

      })
      .catch((error) => console.error(error));

    
  }

  function registrar( ){
  
    var nombre = document.getElementById('nombre').value;
    var passord = document.getElementById('nombre').value;
    functionsUsuario.registrar(nombre, passord)
    .catch((error) => console.error(error));
    document.getElementById('mensajeregistro').textContent=""
  }



  return (
    <>
      {pantalla}
      
    </>
  )
}

export default App
