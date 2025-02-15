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

// Función para hacer reverse geocoding usando Nominatim
export async function reverseGeocode(lat, lng) {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
      const response = await fetch(url, {});
      const data = await response.json();
      if (data && data.address) {
        const { house_number, road, city, town, village, neighbourhood, suburb } = data.address;
        const location = city || town || village || '';
        const barrio = neighbourhood || suburb || '';
        let address = '';
        if (house_number) address += house_number + ' ';
        if (road) address += road;
        if (barrio) address += `, ${barrio}`;
        if (location) address += `, ${location}`;
        return address || data.display_name || 'Dirección no encontrada';
      }
      return data.display_name || 'Dirección no encontrada';
    } catch (error) {
      console.error('Error en reverseGeocode:', error);
      return 'Dirección no disponible';
    }
  }