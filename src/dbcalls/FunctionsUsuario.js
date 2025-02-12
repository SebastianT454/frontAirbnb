/* usuario */
/*
export const usuario = {
    "id": any,
    "nombre": any,
    "pass": any
    }
*/
export async function getAll(){
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const requestOptions = {
method: "GET",
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/usuario/all", requestOptions)
.then((response) => response.json());
return variable
}

export async function getId(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
const requestOptions = {
method: "GET",
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/usuario/"+id, requestOptions)
.then((response) => response.json());
return variable

}


export async function delet(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
const requestOptions = {
method: "DELETE",
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/usuario/"+id, requestOptions)
.then((response) => response.json());
return variable

}

export async function save(objeto){
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "POST",
headers: myHeaders,
body: JSON.stringify(objeto),
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/usuario", requestOptions)
.then((response) => response.json());
return variable
}


export async function logear(nombre, passord ){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
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
    var variable = await fetch("http://18.208.152.26:8085/usuario/login", requestOptions)
      .then((response) => response.json())
      .catch((response) => alert("usuario no registrado"));
    return variable
    
  }

export async function registrar(nombre, passord){
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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

    var variable = await fetch("http://18.208.152.26:8085/usuario", requestOptions)
      .then((response) => response.json())
      .then((result) => alert("usuario registrado"))
       .catch((error) => console.error(error));
    return variable
  }
