/* house */
/*
export const house = {
    "id": any,
    "idNeighborhood": any,
    "address": any,
    "price": any,
    "image": any
    }
*/
export async  function getAll(){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const requestOptions = {
method: "GET",
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/house/all", requestOptions)
.then((response) => response.json());
return variable
}

export async  function getId(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
const requestOptions = {
method: "GET",
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/house/"+id, requestOptions)
.then((response) => response.json());
return variable

}

export async  function byNeighborhood(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    var variable = await  fetch("http://18.208.152.26:8085/house/byNeighborhood/"+id, requestOptions)
    .then((response) => response.json());
    return variable

    }


export async  function delet(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
const requestOptions = {
method: "DELETE",
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/house/"+id, requestOptions)
.then((response) => response.json());
return variable

}

export async  function save(objeto){
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "POST",
headers: myHeaders,
body: JSON.stringify(objeto),
redirect: "follow"
};

var variable = await  fetch("http://18.208.152.26:8085/house", requestOptions)
.then((response) => response.json());
return variable
}