import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { getAll } from './dbcalls/FunctionsCity';
import { byCity as getNeighborhoodsByCity } from './dbcalls/FunctionsNeighborhood';

const Mapa = () => {
  const [map, setMap] = useState(null);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);

  useEffect(() => {
    // Inicializar el mapa
    const mapInstance = L.map('map-container').setView([4.570868, -74.297333], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);
    setMap(mapInstance);

    // Obtener la lista de ciudades y establecerlas en el estado
    const fetchCities = async () => {
      const cityData = await getAll();
      setCities(cityData);
    };

    fetchCities();

    return () => {
      mapInstance.remove();
    };
  }, []);

  const handleCityChange = async (event) => {
    const cityId = parseInt(event.target.value);
    if (isNaN(cityId)) {
      // Si no se selecciona una ciudad válida, limpiar los barrios y restablecer la selección
      setSelectedCityId(null);
      setNeighborhoods([]);
      return;
    }

    setSelectedCityId(cityId);

    // Obtener los barrios de la ciudad seleccionada
    const neighborhoodsData = await getNeighborhoodsByCity(cityId);
    setNeighborhoods(neighborhoodsData);

    // Opcional: Centrar el mapa en la ciudad seleccionada
    const selectedCity = cities.find(city => city.id === cityId);
    if (selectedCity && map) {
      const [lng, lat] = JSON.parse(selectedCity.coords);
      map.setView([lat, lng], 12);
    }
  };

  const handleNeighborhoodChange = (event) => {
    const neighborhoodId = parseInt(event.target.value);
    const selectedNeighborhood = neighborhoods.find(neighborhood => neighborhood.id === neighborhoodId);

    if (selectedNeighborhood && map) {
      const [lng, lat] = JSON.parse(selectedNeighborhood.coords);
      map.setView([lat, lng], 14); // Ajusta el zoom según sea necesario
    }
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

            <div className="property-card">
              <img src="" alt="Imagen de la propiedad" className="property-image" />
              <div className="property-info">
                <h3 className="property-title">Apartamento Moderno en Medellín</h3>
                <p className="property-address">Calle 10 #5-30, Medellín</p>
                <p className="property-price">$100 por noche</p>
              </div>
            </div>
          </section>

          <section id="map-container"></section>
        </div>
      </div>
    </>
  );
}

export default Mapa;

