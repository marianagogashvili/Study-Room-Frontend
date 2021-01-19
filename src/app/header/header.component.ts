import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  accountIcon = faUser;
  gradesIcon = faGraduationCap;
  editIcon = faEdit;
  aboutIcon = faAddressCard;
  logOutIcon = faDoorOpen;

  loggedIn = localStorage.getItem('userId');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
    this.router.navigate(['/auth']);
  }

  logIn() {
    this.router.navigate(['/auth']);
  }

}
