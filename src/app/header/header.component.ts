import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
  trigger('showHeader', [
      state('shown', style({
        transform: 'translateY(0px)',
        opacity: 1,
        visibility: 'visible',
      })),
      state('hidden', style({
        transform: 'translateY(100px)',
        opacity: 0,
        visibility: 'hidden',
      })),
      transition('shown <=> hidden', animate(200)),
    ]),
  trigger('showHeader2', [
    state('shown', style({
      display: 'block'
    })),
    state('hidden', style({
      display: 'none'
    })),
    transition('shown => hidden', animate('0ms 200ms')),
    transition('hidden => shown', animate('0ms ease')),

  ]),
  trigger('burgerChild1', [
      state('shown', style({
        transform: 'rotate(45deg) translateY(6px) translateX(5px)',
        width: "30px"
      })),
      state('hidden', style({
        transform: 'rotate(0) translateY(0) translateX(0)',
        width: "26px"
      })),
      transition('shown <=> hidden', animate(200)),
    ]),
   trigger('burgerChild2', [
      state('shown', style({
        width: '0px',
      })),
      state('hidden', style({
        width: '26px',
      })),
      transition('shown <=> hidden', animate(200)),
    ]),
    trigger('burgerChild3', [
      state('shown', style({
        transform: 'rotate(-45deg) translateY(-6px) translateX(5px)',
        width: "30px"
      })),
      state('hidden', style({
        transform: 'rotate(0) translateY(0) translateX(0)',
        width: "26px"
      })),
      transition('shown <=> hidden', animate(200)),
    ])


  ]
})
export class HeaderComponent implements OnInit {
  accountIcon = faUser;
  gradesIcon = faGraduationCap;
  editIcon = faEdit;
  aboutIcon = faAddressCard;
  logOutIcon = faDoorOpen;

  displayHeader;
  showHeaderState;

  loggedIn = localStorage.getItem('userId');

  constructor(private router: Router) { }

  ngOnInit() {
    this.displayHeader = false;
    this.showHeaderState = 'hidden';
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

  onShowHeader() {
    this.displayHeader = !this.displayHeader;
    this.showHeaderState = this.showHeaderState === 'hidden' ? 'shown': 'hidden';
  }

}
