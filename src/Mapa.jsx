import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

const Mapa = () => {
  const mapRef = useRef(null); // Referencia al mapa

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map-container').setView([40.7128, -74.006], 12); // NYC

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Agregar un marcador inicial
      const marker = L.marker([40.7128, -74.006]).addTo(mapRef.current);
      marker.bindPopup('Ubicación inicial').openPopup();

      // Función para cambiar la vista del usuario
      const cambiarVista = (lat, lng) => {
        mapRef.current.setView([lat, lng], 12);
      };

      // Simulación de cambio de vista después de 5 segundos
      setTimeout(() => {
        cambiarVista(37.7749, -122.4194); // San Francisco
      }, 5000);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div>
        <header>
          <nav id="navbar">
            <div id="logo">Hogar temporal</div>
            <div id="filters">
              <select id="search-city">
                <option value="">Seleccione una ciudad...</option>
                <option value="medellin">Medellín</option>
                <option value="bogota">Bogotá</option>
                <option value="cali">Cali</option>
                <option value="cartagena">Cartagena</option>
                <option value="barranquilla">Barranquilla</option>
              </select>

              <select id="property-type">
                <option value="">Tipo de Propiedad</option>
                <option value="apartment">Apartamento</option>
                <option value="house">Casa</option>
                <option value="cabin">Cabaña</option>
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

