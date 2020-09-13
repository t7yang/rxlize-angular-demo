import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  readonly readUser = (id: number) => this.http.get<IUser>(`https://jsonplaceholder.typicode.com/users?id=${id}`);
}
