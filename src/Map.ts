import L, { Marker } from 'leaflet';

import {
  mapAPIOpenStreetMap as mapAPI,
  mapAttributionOpenStreetMap as mapAttribution,
} from './constants';

export interface markerInterface {
  location: { lat: number; lng: number };
  markerClassName: string;
  markerDisplayInfo: string;
}

class Map {
  private map: L.Map = null;
  //   private map: any = null;
  private mapZoomLevel = 1;
  private marker: L.Marker<any>;
  private allMarkers: L.Marker<any>[] = [];

  loadMap({ lat, lng }: { lat: number; lng: number }) {
    this.map = L.map('map').setView([lat, lng], 10); // second parameter is the map zoom level

    L.tileLayer(mapAPI, mapAttribution).addTo(this.map);
  }

  private panToCoordinates({ lat, lng }: { lat: number; lng: number }) {
    if (!this.map) {
      console.error('You should load the map first (use "loadMap" method)!');
      return;
    }
    this.map.setView([lat, lng], this.mapZoomLevel, {
      animate: true,
      duration: 1,

      //   pan: {
      //     duration: 3,
      //   },
    });
  }

  addMarker(markerObj: markerInterface) {
    this.panToCoordinates(markerObj.location);

    // If you want to add a custom marker pin use this format
    // this.marker = L.marker([lat, lng], { icon: myIcon }).addTo(this.map); // Add marker to map

    this.marker = L.marker([
      markerObj.location.lat,
      markerObj.location.lng,
    ]).addTo(this.map); // Add marker to map
    this.allMarkers.push(this.marker);

    // Customize tool tip
    const popupOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: markerObj.markerClassName,
    };

    this.marker
      .bindPopup(L.popup(popupOptions))
      .setPopupContent(markerObj.markerDisplayInfo)
      .openPopup();
  }

  clearMarkers() {
    this.allMarkers.forEach((mark) => this.map.removeLayer(mark));
    this.allMarkers = [];
  }

  // For future use - if you want to add a custom icon based on the type of pin
  // private for now
  private marMarkerIcon(hexColor: string = '12a451') {
    const myIcon = L.icon({
      iconUrl: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${hexColor}&chf=a,s,ee00FFFF`,
    });
  }
}

export default Map;
