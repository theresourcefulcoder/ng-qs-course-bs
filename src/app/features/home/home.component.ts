import { Component, OnInit } from '@angular/core';

/**
 * Home component which is only ever routed to so
 * the selector has been removed
 */
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   * Locally scoped variables
   */

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
