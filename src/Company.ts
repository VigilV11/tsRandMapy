import faker from 'faker';
import { markerInterface } from './Map';

class Company implements markerInterface {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  markerClassName: string = 'marker-user';
  markerDisplayInfo: string;

  constructor() {
    this.name = faker.company.companyName();
    this.location = {
      lat: +faker.address.latitude(),
      lng: +faker.address.longitude(),
    };
    this.markerDisplayInfo = `<h3>Company: ${this.name}</h3>`;
  }
}

export default Company;
