import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { AlertComponent } from './core/alert/alert.component';
import { LoginModule } from './features/login/login.module';
import { CustomErrorHandler } from './shared/errors/custom-error-handler';
import { PageNotFoundModule } from './features/page-not-found/page-not-found.module';
import { BreadcrumbComponent } from './core/breadcrumb/breadcrumb.component';

/**
 * Root module for the application
 */
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    LoginModule,
    PageNotFoundModule // Must be last due to the wildcard route
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
