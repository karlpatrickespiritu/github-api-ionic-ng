import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Import the user model
import {User} from '../../models/user'

/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubUsers {
  githubUsers: any = null;

  constructor(private http: Http) {
    this.githubUsers = null;
  }

  load() {
    if (this.githubUsers) {
      // already loaded data
      return Promise.resolve(this.githubUsers);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('https://api.github.com/users')
        .map(res => <Array<User>>(res.json()))
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.githubUsers = data;
          resolve(this.githubUsers);
        });
    });
  }

  loadDetails(login: string) {
    // get the data from the api and return it as a promise
    return new Promise<User>(resolve => {
      // Change the url to match https://api.github.com/users/{username}
      this.http.get(`https://api.github.com/users/${login}`)
        .map(res => <User>(res.json()))
        .subscribe(user => {
          resolve(user);
        });
    });
  }
}
