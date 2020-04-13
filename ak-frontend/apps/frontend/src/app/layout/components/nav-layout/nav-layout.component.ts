import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ak-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.scss']
})
export class NavLayoutComponent implements OnInit {
  isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}
}
