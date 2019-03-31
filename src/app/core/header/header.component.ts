import { Component, OnInit } from '@angular/core';

/**
 * Core header component
 *
 * @example
 * <app-header></app-header>
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * Locally scoped variables
   */
  navbarCollapsed = true;

  /**
   * Constructor
   */
  constructor() { }

  /**
   * OnInit Lifecycle Hook
   */
  ngOnInit() {
  }
}
