import L, { Marker } from 'leaflet';

import {
  mapAPIOpenStreetMap as mapAPI,
  mapAttributionOpenStreetMap as mapAttribution,
} from './constants';

class Map {
  private map: any = null;
  private mapZoomLevel = 1;
  private marker;
  private allMarkers = [];

  loadMap(lat: number, lng: number) {
    this.map = L.map('map').setView([lat, lng], this.mapZoomLevel); // second parameter is the map zoom level

    L.tileLayer(mapAPI, mapAttribution).addTo(this.map);
  }

  panToCoordinates(lat: number, lng: number) {
    if (!this.map) {
      console.error('You should load the map first (use "loadMap" method)!');
      return;
    }
    this.map.setView([lat, lng], this.mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  addMarker(lat: number, lng: number, type: string, data: string) {
    this.panToCoordinates(lat, lng);

    const hexColor1 = '12a451';
    const hexColor2 = 'f248a1';

    const myIcon = L.icon({
      iconUrl: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${
        type === 'user' ? hexColor1 : hexColor2
      }&chf=a,s,ee00FFFF`,
      // iconAnchor: pinAnchor;
    });

    this.marker = L.marker([lat, lng], { icon: myIcon }).addTo(this.map); // Add marker to map
    this.allMarkers.push(this.marker);

    // Customize tool tip
    const popupOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: type === 'user' ? 'user-popup' : 'company-popup',
    };

    this.marker
      .bindPopup(L.popup(popupOptions))
      .setPopupContent(data)
      .openPopup();
  }

  clearMarkers() {
    this.allMarkers.forEach((mark) => this.map.removeLayer(mark));
    this.allMarkers = [];
  }
}

export default Map;
