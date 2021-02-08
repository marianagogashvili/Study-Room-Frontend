import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    let element = document.getElementById("main");
    element.style.marginLeft= "250px";
    element.style.webkitTransitionDuration = "0.5s";
    element.style.webkitTransitionTimingFunction = "ease-out";

  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    let element = document.getElementById("main");
    element.style.marginLeft= "0";
    element.style.webkitTransitionDuration = "0.3s";
    element.style.webkitTransitionTimingFunction = "ease-out";

  }
}
