import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GithubUsers } from '../../providers/github-users/github-users';
// Import User model
import { User } from '../../models/user';
// Import User Details page
import { UserDetailsPage } from '../user-details/user-details';

@Component({
  templateUrl: 'build/pages/users/users.html',
})
export class UsersPage {
  users: User[];

  constructor(public nav: NavController, private githubUsers: GithubUsers) {
  	githubUsers
  		.load()
  		.then((users) => {
  	  		this.users = users;
  		});


	  githubUsers
	  	.searchUsers('george')
	  	.then(users => console.log(users));
  }

  goToDetails(event, login) {
  	this.nav.push(UserDetailsPage, {
  		login: login
  	});
  }

  search(searchTerm) {
  	let term = searchTerm.target.value;
	// perform search if 3 or more characters
  	if (term.trim() == '' || term.trim().length < 3) {
  		this.githubUsers.load().then(users => this.users = users);
  	} else {
  		this.githubUsers.searchUsers(term)
  			.then(users => this.users = users)
  	}
  }
}
