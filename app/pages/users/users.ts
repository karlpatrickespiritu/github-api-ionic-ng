import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {User} from '../../models/user';
import {GithubUsers} from '../../providers/github-users/github-users';

/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/users/users.html',
  providers: [GithubUsers]
})
export class UsersPage {
  users: User[];

  constructor(private nav: NavController, githubUsers: GithubUsers) {
    githubUsers
      .load()
      .then(users => this.users = users);
  }

}
