import { useState } from 'react'

import './App.css'
import Mapa from './Mapa';
import * as functionsUsuario from './dbcalls/FunctionsUsuario';

function App() {
 
  const [pantalla, setPantalla] = useState(    
  <div id="formulario-login">
    <div id="seccion-usuario">
      <h3 id="titulo-usuario">Digite su usuario</h3>
      <input type="text" id="input-usuario" name="nombre" />
    </div>

    <div id="seccion-contrasena">
      <h3 id="titulo-contrasena">Digite su contraseña</h3>
      <input type="password" id="input-contrasena" name="contrasena" />
    </div>

    <button id="boton-ingresar" onClick={logear}>Ingresar</button>
    <button id="boton-registrar" onClick={registrar}>Registrar</button>

    <h1 id="mensajeregistro"></h1>
  </div>
  )
  var idusuario = null

  function logear( ){
    var nombre =  document.getElementById('input-usuario').value;
    var passord =  document.getElementById('input-contrasena').value;
    functionsUsuario.logear(nombre, passord)
      .then((result) => {
        if(result.id){
          setPantalla(<Mapa />)
          idusuario = result.id
          console.log(idusuario)
        }else{
          document.getElementById('mensajeregistro').textContent="NO REGISTRADO"
        }

      })
      .catch((error) => console.error(error));

    
  }

  function registrar( ){
  
    var nombre = document.getElementById('input-usuario').value;
    var passord = document.getElementById('input-contrasena').value;
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
