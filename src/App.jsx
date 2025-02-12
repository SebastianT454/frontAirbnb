import { useState } from 'react'

import './App.css'
import Mapa from './Mapa';

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

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var idusuario = null

  function logear( ){
    var nombre =  document.getElementById('nombre').value;
    var passord =  document.getElementById('nombre').value;
    const raw = JSON.stringify({
      "nombre": nombre,
      "pass": passord
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("http://18.208.152.26:8085/usuario/login", requestOptions)
      .then((response) => response.json())
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
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "nombre": document.getElementById('nombre').value,
      "pass": document.getElementById('nombre').value
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://18.208.152.26:8085/usuario", requestOptions)
      .then((response) => response.text())
      .then((result) => alert("usuario registrado"))
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
