/**
 * Supplier model
 */
export interface Supplier {
  id: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: number;
  zipCode: string;
  country: number;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  active: boolean;
}
