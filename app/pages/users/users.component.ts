import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {User} from '../../models/user';
import {GithubUsers} from '../../providers/github-users/github-users';
import {UserDetailsPage} from '../user-details/user-details';

@Component({
  templateUrl: 'build/pages/users/users.html',
  providers: [GithubUsers]
})
export class UsersPage {
  users: User[];

  constructor(private nav: NavController, private githubUsers: GithubUsers) {
    githubUsers
      .load()
      .then(users => this.users = users);
  }

  goToDetails(event, login) {
    this.nav.push(UserDetailsPage, {
      login: login
    });
  }

  // Search for user's from github
  // Handle input event from search bar
  search(searchTerm) {
    let term = searchTerm.target.value;

    // We will only perform the search if we have 3 or more characters
    if (term.trim() == '' || term.trim().length < 3) {
      // Get github users and assign to local user's variable
      this
        .githubUsers
        .load()
        // Load original users in this case
        .then(users => this.users = users)
    } else {
      // Get the searched users from github
      this
        .githubUsers
        .searchUsers(term)
        .then(users => this.users = users)
    }
  }

}
