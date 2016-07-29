import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {User} from '../../models/user';
import {GithubUsers} from '../../providers/github-users/github-users';

@Component({
  templateUrl: 'build/pages/user-details/user-details.html',
  providers: [GithubUsers]
})
export class UserDetailsPage {
  login: string;
  user: User = new User;

  constructor(private nav: NavController, navParams: NavParams, githubUsers: GithubUsers) {
    // Retrieve the login from the navigation parameters
    this.login = navParams.get('login');


    // Get the user details and log
    githubUsers
      .loadDetails(this.login)
      .then(user => this.user = user)
  }

}
