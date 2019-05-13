import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../product/product.model';
import { Supplier } from '../../supplier/supplier.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  /**
   * Input properties
   */
  @Input() product: Product;
  @Input() suppliers: Supplier[];

  /**
   * Basic Constructor
   */
  constructor() { }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
  }

  /**
   * Function to return the name of a supplier
   *
   * @param id - ID of the supplier
   */
  getSupplierName(id: number): string {
    let tempSupplier: Supplier;

    if (this.suppliers.length > 0) {
      tempSupplier = this.suppliers.find(supplier => supplier.id === id);
    }

    return tempSupplier ? tempSupplier.name : '';
  }
}
