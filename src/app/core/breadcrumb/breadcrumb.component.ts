import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { Subscription } from 'rxjs';

import { Breadcrumb } from './breadcrumb.model';

/**
 * Component that renders a breadcrumb path on the screen
 *
 * @example
 * <app-breadcrumb></app-breadcrumb>
 */
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped variables
   */
  breadcrumbs: Breadcrumb[];
  routerSub: Subscription;

  /**
   * Constructor
   */
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * OnInit Lifecycle Hook
   */
  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(event => {
      // Only process NavigationEnd events
      if (event instanceof NavigationEnd) {
        const activatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.buildBreadcrumbs(activatedRoute);
      }
    });
  }

  /**
   * OnDestroy Lifecycle Hook
   */
  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }


  /**
   * Function to build out the breadcrumbs array
   *
   * @param activatedRoute - ActivatedRoute to build from
   * @param route - the route to build out
   * @param breadcrumbs - the breadcrumbs array to add to
   */
  private buildBreadcrumbs(activatedRoute: ActivatedRoute, route: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // get any child routes
    const childRoutes: ActivatedRoute[] = activatedRoute.children;

    // return if there are no more child routes
    if (childRoutes.length === 0) {
      return breadcrumbs;
    }

    // iterate over each child route
    for (const child of childRoutes) {
      // verify this is the primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // ensure the data property "breadcrumb" is defined on the route
      if (!child.snapshot.data.hasOwnProperty('breadcrumb')) {
        return this.buildBreadcrumbs(child, route, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // append route URL to URL
      route += `/${routeURL}`;

      // add breadcrumb
      const breadcrumb: Breadcrumb = {
        title: child.snapshot.data.breadcrumb,
        queryParams: child.snapshot.params,
        routerLink: route
      };

      // Add the new breadcrumb to the array
      breadcrumbs = [...breadcrumbs, breadcrumb];

      // recursively call self until all child routes are iterated
      return this.buildBreadcrumbs(child, route, breadcrumbs);
    }
  }
}
