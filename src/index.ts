import User from './User';
import Company from './Company';
import Map from './Map';

// DOM Nodes
const generateBtn = document.querySelector('.genBtn');
const infoText = document.querySelector('.info');

// Initial lat, lng values
const [lat, lng] = [51.5074, 0.1278]; // London

const map = new Map();

map.loadMap(lat, lng);

generateBtn.addEventListener('click', () => {
  const newUser = new User();
  const newCompany = new Company();
  infoText.innerHTML = `<strong>${newUser.name}</strong> works for <em>${newCompany.name}</em>`;
  map.clearMarkers();
  // prettier-ignore
  map.addMarker(newUser.location.lat, newUser.location.lng, 'user', `Employee: ${newUser.name}`);
  // prettier-ignore
  map.addMarker(newCompany.location.lat, newCompany.location.lng, 'company', `Company: ${newCompany.name}`
  );
});
