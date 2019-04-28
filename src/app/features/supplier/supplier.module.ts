import { NgModule } from '@angular/core';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSupplierModalComponent } from './create-supplier-modal/create-supplier-modal.component';
import { ViewSupplierModalComponent } from './view-supplier-modal/view-supplier-modal.component';
import { UpdateSupplierModalComponent } from './update-supplier-modal/update-supplier-modal.component';
import { DeleteSupplierModalComponent } from './delete-supplier-modal/delete-supplier-modal.component';

@NgModule({
  declarations: [
    SupplierComponent,
    CreateSupplierModalComponent,
    ViewSupplierModalComponent,
    UpdateSupplierModalComponent,
    DeleteSupplierModalComponent
  ],
  imports: [
    SharedModule,
    SupplierRoutingModule
  ],
  exports: [
  ],
  entryComponents: [
    CreateSupplierModalComponent,
    ViewSupplierModalComponent,
    UpdateSupplierModalComponent,
    DeleteSupplierModalComponent
  ]
})
export class SupplierModule { }
