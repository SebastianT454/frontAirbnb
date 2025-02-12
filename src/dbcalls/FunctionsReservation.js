/* reservation */
/*
export const reservation = {
    "id": any,
    "idHouse": any,
    "idUsuario": any,
    "startDate": any,
    "endDate": any
    }
*/
export async function getAll(){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const requestOptions = {
method: "GET",
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/reservation/all", requestOptions)
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

var variable = await  fetch("http://18.208.152.26:8085/reservation/"+id, requestOptions)
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

var variable = await  fetch("http://18.208.152.26:8085/reservation/"+id, requestOptions)
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

var variable = await  fetch("http://18.208.152.26:8085/reservation", requestOptions)
.then((response) => response.json());
return variable
}