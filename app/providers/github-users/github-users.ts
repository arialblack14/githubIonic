import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import user model
import {User} from '../../models/user';

@Injectable()
export class GithubUsers {
  githubUsers: any = null;

  constructor(public http: Http) {

  }

  load() {
    if (this.githubUsers) {
      // already loaded githubUsers
      return Promise.resolve(this.githubUsers);
    }

    // don't have the githubUsers yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the githubUsers,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the githubUsers and resolve the promise with the new githubUsers.
      this.http.get('https://api.github.com/users')
        .map(res => <Array<User>>(res.json()))
        .subscribe(users => {
          // we've got back the raw githubUsers, now generate the core schedule githubUsers
          // and save the githubUsers for later reference
          this.githubUsers = users;
          resolve(this.githubUsers);
        });
    });
  }

  loadDetails(login: string) {
    // returns a promise of type User, hence new Promise<User>()
    return new Promise<User>(resolve => {
      this.http.get(`https://api.github.com/users/${login}`)
        // Cast response to User object
        .map(res => <User>(res.json()))
        .subscribe(user => {
          resolve(user);
        })
    });
  }

  searchUsers(searchParam: string) {
    return new Promise<Array<User>>(resolve => {
      this.http.get(`https://api.github.com/search/users?q=${searchParam}`)
        .map(res => <Array<User>>(res.json().items))
        .subscribe(users => {
          resolve(users);
        });
    });
  }
}

