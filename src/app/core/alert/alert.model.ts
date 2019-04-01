import { AlertType } from './alert-type.enum';

/**
 * Alert model
 */
export class Alert {
  type: AlertType;
  message: string;
  keepAfterRouteChange?: boolean;
}
