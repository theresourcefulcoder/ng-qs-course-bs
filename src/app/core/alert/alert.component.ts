import { Component, OnInit, OnDestroy } from '@angular/core';

import { IconDefinition, faCheckCircle, faInfoCircle, faExclamationCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AlertService } from '../../shared/services/alert.service';
import { Alert } from './alert.model';

/**
 * Global alert component for displaying
 * messages to the user
 *
 * @example
 * <app-alert></app-alert>
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  /**
   * Locally scoped Variables
   */
  alerts: Alert[] = [];
  alertsSub: Subscription;

  /**
   * Font Awesome Icon variables
   */
  faCheckCircle: IconDefinition = faCheckCircle;
  faInfoCircle: IconDefinition = faInfoCircle;
  faExclamationCircle: IconDefinition = faExclamationCircle;
  faTimesCircle: IconDefinition = faTimesCircle;

  /**
   * Constructor which injects AlertService
   */
  constructor(private alertService: AlertService) { }

  /**
   * OnInit LifeCycle Hook
   */
  ngOnInit(): void {
    // Subscribe to alerts
    this.alertsSub = this.alertService.alerts()
      .subscribe((alert: Alert) => {
        if (alert) {
          this.alerts = [...this.alerts, alert];
        }
    });
  }

  /**
   * OnDestroy LifeCycle Hook
   */
  ngOnDestroy(): void {
    this.alertsSub.unsubscribe();
  }

  /**
   * Function to remove alerts from the array
   *
   * @param alertToRemove - which alert to remove
   */
  removeAlert(alertToRemove: Alert): void {
    this.alerts = this.alerts.filter(alert => alert !== alertToRemove);
  }
}
