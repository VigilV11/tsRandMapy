import User from './User';
import Company from './Company';
import Map from './Map';

// DOM Nodes
const generateBtn = document.querySelector('.genBtn');
const infoText = document.querySelector('.info');

// Initial lat, lng values
const location = {
  lat: 51.5074,
  lng: 0.1278,
}; // London

const map = new Map();

map.loadMap(location);

generateBtn.addEventListener('click', () => {
  const newUser = new User();
  const newCompany = new Company();
  infoText.innerHTML = `<strong>${newUser.name}</strong> works for <em>${newCompany.name}</em>`;
  map.clearMarkers();

  map.addMarker(newUser);

  map.addMarker(newCompany);
});
