import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Supplier } from '../supplier.model';

@Component({
  selector: 'app-view-supplier-modal',
  templateUrl: './view-supplier-modal.component.html',
  styleUrls: ['./view-supplier-modal.component.css']
})
export class ViewSupplierModalComponent implements OnInit {
  /**
   * Input properties
   */
  @Input() supplier: Supplier;

  /**
   * Constructor which injects services
   */
  constructor(public activeModal: NgbActiveModal) { }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
  }
}
