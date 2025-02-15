import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useRef } from 'react';
import { getAll as getAllCities } from './dbcalls/FunctionsCity';
import { byCity as getNeighborhoodsByCity } from './dbcalls/FunctionsNeighborhood';
import { byNeighborhood, reverseGeocode } from './dbcalls/FunctionsHouse';

const Mapa = () => {
  const [map, setMap] = useState(null);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [houses, setHouses] = useState([]); // Estado para almacenar las houses con dirección formateada
  const markersLayerRef = useRef(null);

  useEffect(() => {
    // Inicializar el mapa
    const mapInstance = L.map('map-container').setView([4.570868, -74.297333], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);
    setMap(mapInstance);

    // Crear un LayerGroup para los markers y añadirlo al mapa
    markersLayerRef.current = L.layerGroup().addTo(mapInstance);

    // Obtener la lista de ciudades y establecerlas en el estado
    const fetchCities = async () => {
      const cityData = await getAllCities();
      setCities(cityData);
    };
    fetchCities();

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Función para actualizar los markers en el mapa y la lista de houses
  const updateMarkers = async (housesArray) => {
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();
    }
    // Para cada house, agregamos un marker y convertimos las coordenadas a dirección legible
    const housesWithAddress = await Promise.all(
      housesArray.map(async (house) => {
        // Se asume que house.address es una cadena de texto en formato "[lng, lat]"
        const [lng, lat] = JSON.parse(house.address);
        const displayAddress = await reverseGeocode(lat, lng);
        // Crear el marker para la house
        const marker = L.marker([lat, lng]);
        marker.bindPopup(`<b>${displayAddress}</b><br>Precio: ${house.price}`);
        marker.addTo(markersLayerRef.current);
        return { ...house, displayAddress };
      })
    );
    setHouses(housesWithAddress);
  };

  // Función para obtener todas las houses de los barrios de una ciudad
  const getHousesForCity = async (neighborhoodsArray) => {
    let allHouses = [];
    for (const neighborhood of neighborhoodsArray) {
      const housesInNeighborhood = await byNeighborhood(neighborhood.id);
      allHouses = allHouses.concat(housesInNeighborhood);
    }
    return allHouses;
  };

  // Al cambiar la ciudad, se actualizan los barrios y se muestran todas las houses de la ciudad
  const handleCityChange = async (event) => {
    const cityId = parseInt(event.target.value, 10);
    if (isNaN(cityId)) {
      // Si no se selecciona una ciudad válida, limpiar barrios, markers y houses
      setSelectedCityId(null);
      setNeighborhoods([]);
      updateMarkers([]);
      return;
    }
    setSelectedCityId(cityId);

    // Obtener los barrios de la ciudad seleccionada
    const neighborhoodsData = await getNeighborhoodsByCity(cityId);
    setNeighborhoods(neighborhoodsData);

    // Centrar el mapa en la ciudad seleccionada
    const selectedCity = cities.find(city => city.id === cityId);
    if (selectedCity && map) {
      const [lng, lat] = JSON.parse(selectedCity.coords);
      map.setView([lat, lng], 12);
    }

    // Obtener y mostrar todas las houses de todos los barrios de la ciudad
    const housesData = await getHousesForCity(neighborhoodsData);
    updateMarkers(housesData);
  };

  // Al cambiar el barrio, se muestran solo las houses de ese barrio
  const handleNeighborhoodChange = async (event) => {
    const neighborhoodId = parseInt(event.target.value, 10);
    if (isNaN(neighborhoodId)) {
      // Si no se selecciona un barrio, mostrar todas las houses de la ciudad
      const housesData = await getHousesForCity(neighborhoods);
      updateMarkers(housesData);
      return;
    }
    // Centrar el mapa en el barrio seleccionado
    const selectedNeighborhood = neighborhoods.find(nb => nb.id === neighborhoodId);
    if (selectedNeighborhood && map) {
      const [lng, lat] = JSON.parse(selectedNeighborhood.coords);
      map.setView([lat, lng], 14);
    }
    // Obtener y mostrar las houses del barrio seleccionado
    const housesData = await byNeighborhood(neighborhoodId);
    updateMarkers(housesData);
  };

  return (
    <>
      <div>
      <header>
        <nav id="navbar">
          <div id="logo">Hogar temporal</div>
          <div id="filters">
            <select id="search-city" onChange={handleCityChange}>
              <option value="">Seleccione una ciudad...</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>

            <select id="neighborhoods" onChange={handleNeighborhoodChange} disabled={!selectedCityId}>
              <option value="">Seleccione un barrio...</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
              ))}
            </select>
          </div>
        </nav>
      </header>

      <div id="main-container">
          <section id="property-list">
            <h2>Casas en el Área</h2>
            {houses.length === 0 ? (
              <p>No hay casas para mostrar.</p>
            ) : (
              houses.map(house => (
                <div className="property-card" key={house.id}>
                  <img
                    src={house.image || 'https://via.placeholder.com/150'} 
                    alt="Imagen de la propiedad"
                    className="property-image"
                  />
                  <div className="property-info">
                    <p className="property-address">{house.displayAddress}</p>
                    <p className="property-price">${house.price} por noche</p>
                  </div>
                </div>
              ))
            )}
          </section>

          <section id="map-container"></section>
        </div>
      </div>
    </>
  );
}

export default Mapa;

