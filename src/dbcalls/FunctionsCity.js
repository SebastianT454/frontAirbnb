/* city */
/*
export const city = {
    "id": any,
    "name": any,
    "coords": any
  }
*/



export async function getAll(){
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
    var variable = await fetch("http://18.208.152.26:8085/city/all", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error));
    return variable
}

export async  function getId(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "GET",
        redirect: "follow"
        };
        
        var variable = await  fetch("http://18.208.152.26:8085/city/"+id, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result));
        return variable
    
}


export async  function delet(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };
        
      var variable = await  fetch("http://18.208.152.26:8085/city/"+id, requestOptions)
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

    var variable = await  fetch("http://18.208.152.26:8085/city", requestOptions)
    .then((response) => response.json());
    return variable
}