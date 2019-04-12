import { MenuLink } from './menu-link.model';

/**
 * Navbar menu model
 */
export interface NavbarMenu {
  title: string;
  id: string;
  links: MenuLink[];
  disabled: boolean;
}
