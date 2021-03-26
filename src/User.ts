import faker from 'faker';
import { markerInterface } from './Map';

class User implements markerInterface {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  markerClassName: string = 'marker-user';
  markerDisplayInfo: string;

  constructor() {
    this.name = faker.name.firstName() + ' ' + faker.name.lastName();
    this.location = {
      lat: +faker.address.latitude(),
      lng: +faker.address.longitude(),
    };
    this.markerDisplayInfo = `Employee: ${this.name}`;
  }
}

export default User;
