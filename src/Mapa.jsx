 import { useState } from 'react'


function Mapa() {

  
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

    fetch("http://127.0.0.1:8085/usuario", requestOptions)
      .then((response) => response.text())
      .then((result) => alert("usuario registrado"))
       .catch((error) => console.error(error));
    document.getElementById('mensajeregistro').textContent=""
  }



  return (
    <>



    </>
  )

}

export default Mapa
